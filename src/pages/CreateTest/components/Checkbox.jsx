import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { VocaPathContext } from "../../../contexts/VocaPathContext";
import { Stack, Checkbox as MuiCheckbox, Button } from "@mui/material";
import listObjToArr from "../../../utils/listObjToArr";

// 디렉토리 or 단어장 체크 박스 컴포넌트
const Checkbox = ({ index, isDir = false, name, path, currentTree }) => {
  // VocaPathContext에서 모든 단어장 Path 배열, 선택된 단어장 Path 배열 State와 Setter 함수 불러오기
  const { allVocaPaths, selectedVocaPaths, setSelectedVocaPaths } =
    useContext(VocaPathContext);

  const [openDir, setOpenDir] = useState(false);
  const [checked, setChecked] = useState(false);
  // 일부만 체크된 체크박스 State
  const [indeterminate, setIndeterminate] = useState(false);

  // Memoized 현재 Path 디렉토리 리스트, 단어장 리스트
  const dirList = useMemo(
    () => listObjToArr(currentTree, "dirList"),
    [currentTree]
  );
  const vocaList = useMemo(
    () => listObjToArr(currentTree, "vocaList"),
    [currentTree]
  );
  // Memoized 하위 단어장 Path
  const allSubVocaPaths = useMemo(
    () => allVocaPaths.filter((value) => value.includes(`${path}/${name}/`)),
    [allVocaPaths]
  );

  // selectedVocaPaths 바뀔 때마다 체크박스 체크, 일부 체크 State 초기화
  useEffect(() => {
    if (!isDir) {
      setChecked(selectedVocaPaths.includes(`${path}/${name}`));
      return;
    }

    if (allSubVocaPaths.length === 0) return;

    // selectedVocaPaths 중에 allSubVocaPaths에 해당하는 것이 몇 개 있는 지
    const numOfSelectedSub = allSubVocaPaths.filter((value) =>
      selectedVocaPaths.includes(value)
    ).length;

    // 0개라면 미체크 (= 전체 미선택)
    if (numOfSelectedSub === 0) {
      setChecked(false);
      setIndeterminate(false);
      return;
    }

    // allSubVocaPaths의 길이와 같다면 체크 (= 전체 선택)
    if (numOfSelectedSub === allSubVocaPaths.length) {
      setChecked(true);
      setIndeterminate(false);
      return;
    }

    // 그 사이라면 반체크 (= 일부 선택)
    setChecked(true);
    setIndeterminate(true);
  }, [selectedVocaPaths, allSubVocaPaths]);

  // 단어장 체크박스 체크 함수: 해당 path만 추가, 제거
  const handleCheckVoca = useCallback(() => {
    setChecked((prev) => !prev);
    setSelectedVocaPaths((prev) => {
      if (prev.includes(`${path}/${name}`)) {
        return [...prev.filter((value) => value !== `${path}/${name}`)];
      } else {
        return [...prev, `${path}/${name}`];
      }
    });
  }, []);

  // 디렉토리 체크박스 체크 함수: 하위 path 모두 추가, 제거
  const handleCheckDir = useCallback((checked) => {
    if (allSubVocaPaths.length === 0) return;
    setChecked((prev) => !prev);

    if (!checked) {
      // 추가
      setSelectedVocaPaths((prev) => [
        ...new Set([...prev, ...allSubVocaPaths]),
      ]);
    } else {
      // 제거
      setSelectedVocaPaths((prev) => [
        ...prev.filter((value) => !allSubVocaPaths.includes(value)),
      ]);
    }
  }, []);

  return (
    <>
      <Stack direction="row" sx={{ ml: index * 4 }}>
        <MuiCheckbox
          checked={checked}
          indeterminate={indeterminate}
          disabled={isDir && allSubVocaPaths.length === 0}
          onChange={isDir ? () => handleCheckDir(checked) : handleCheckVoca}
        />
        <Button
          onClick={isDir ? () => setOpenDir((prev) => !prev) : handleCheckVoca}
          startIcon={
            <img
              src={
                !isDir
                  ? require("../../../assets/icons/document.png")
                  : openDir
                  ? require("../../../assets/icons/folder_opened.png")
                  : require("../../../assets/icons/folder_closed.png")
              }
              style={{
                width: "20px",
                height: "20px",
              }}
            />
          }
          // minWidth를 unset로 해야 startIcon과 내부 Text를 모두 감쌀 수 있음
          sx={{
            whiteSpace: "nowrap",
            minWidth: "unset",
            textTransform: "none",
          }}
        >
          {name}
        </Button>
      </Stack>
      {isDir && openDir && (
        <>
          {dirList &&
            dirList.map((value, key) => (
              <ChildCheckbox
                key={key}
                index={index + 1}
                isDir
                name={value}
                path={`${path}/${name}`}
                currentTree={currentTree[value]}
              />
            ))}
          {vocaList &&
            vocaList.map((value, key) => (
              <ChildCheckbox
                key={key}
                index={index + 1}
                name={value}
                path={`${path}/${name}`}
              />
            ))}
        </>
      )}
    </>
  );
};

export default React.memo(Checkbox);

const ChildCheckbox = React.memo(
  ({ index, isDir = false, name, path, currentTree = null }) => {
    return <Checkbox {...{ index, isDir, name, path, currentTree }} />;
  }
);
