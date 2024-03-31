import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
    case "CHANGE":
      return {
        ...state,
        [action.key]: action.value.name,
      };
    case "REMOVE":
      // 구조 분해 할당에서 특정 동적 속성명(계산된 속성명)을 사용할 때, 그 속성 값을 저장할 변수를 지정해줘야 함
      // [propName]: dynamicValue
      // 만약 그 값을 사용할 일이 없다면, 변수명을 _로 함으로써 이 변수를 사용하지 않을 것임을 명시해도 됨
      const { [action.key]: _, ...rest } = state;
      return rest;
    case "RESET":
      return {};
  }
};

const usePathListReducer = () => {
  const [pathList, pathListDispatch] = useReducer(reducer, {});

  return { pathList, pathListDispatch };
};

export default usePathListReducer;
