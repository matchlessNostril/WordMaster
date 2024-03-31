import { wordMasterAuth, wordMasterDB } from "../../firebase";
import {
  ref,
  get,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  off,
} from "firebase/database";
import printError from "../../utils/printError";

// 1. DB 특정 위치의 데이터 리스트 불러오기 + 이벤트 리스너 등록
export const autoFetchList = async (path, listDispatch, setOnLoading) => {
  try {
    setOnLoading(true);

    // 같은 route에서 쿼리스트링만 바뀐 경우 : 다시 마운트 되지 않기 때문에 리스트 초기화 필요
    listDispatch({ type: "RESET" });

    // DB 위치 참조
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);

    // 참조된 위치에 리스트(목록) 데이터 이벤트 리스너 등록
    // (1) onChildAdded: 초기 리스트 데이터 불러오기 및 리스트에 새로운 데이터가 추가됐을 때 콜백 함수 호출
    // (2) onChildChanged: 리스트에 데이터가 수정됐을 때 호출
    // (3) onChildRemoved: 리스트에 데이터가 삭제됐을 때 호출

    // 이벤트 핸들러 함수
    const onChlidEventHandler = async (actionType, data) => {
      setOnLoading(true);

      if (actionType === "REMOVE") {
        await listDispatch({ type: actionType, key: data.key });
      } else {
        await listDispatch({
          type: actionType,
          key: data.key,
          value: data.val(),
        });
      }

      setOnLoading(false);
    };

    // 초기 리스트 데이터 불러오기, 이후 새로운 데이터 추가 시 호출
    onChildAdded(pathRef, (data) => onChlidEventHandler("ADD", data));
    // 데이터 이름(name 속성 값) 변경 시 호출
    onChildChanged(pathRef, (data) => onChlidEventHandler("CHANGE", data));
    // 데이터 삭제 시 호출
    onChildRemoved(pathRef, (data) => onChlidEventHandler("REMOVE", data));

    // 만약 참조된 위치에 데이터가 하나도 없을 경우에는,
    // onChildAdded에 등록된 이벤트 리스너 함수가 실행되지 않기 때문에 로딩이 off 되지 않음.
    // 따라서 이러한 경우를 판별해 따로 로딩 off 해야 함.
    const snapshot = await get(pathRef);
    if (!snapshot.exists()) setOnLoading(false);
  } catch (error) {
    printError(error);
  }
};

// 2. DB 특정 위치에 등록된 이벤트 리스너 모두 제거 (화면 이동 후, 적용되지 않도록)
export const offAllDBEventListener = (path) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    off(pathRef);
  } catch (error) {
    printError(error);
  }
};
