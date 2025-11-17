import React, { useState, useCallback, useEffect } from "react";
import operateData from "../service/database/operateData";
import listObjToArr from "../utils/listObjToArr";
import { isEmpty } from "lodash";

export const VocaPathContext = React.createContext(null);

export const VocaPathProvider = ({ children }) => {
  const [vocaTree, setVocaTree] = useState("Waiting");
  const [allVocaPaths, setAllVocaPaths] = useState([]);
  const [selectedVocaPaths, setSelectedVocaPaths] = useState([]);

  const findAllVocaPaths = useCallback((currentTree, currentPath) => {
    listObjToArr(currentTree, "vocaList").forEach((value) => {
      setAllVocaPaths((prev) => [...prev, `${currentPath}/${value}`]);
    });
    const currentDirList = listObjToArr(currentTree, "dirList");
    if (currentDirList.length === 0) return;
    currentDirList.forEach((value) => {
      // 디렉토리 생성만 하고 안에 파일이 없는 경우 패스
      if (currentTree.hasOwnProperty(value)) {
        // 재귀
        return findAllVocaPaths(currentTree[value], `${currentPath}/${value}`);
      }
    });
  }, []);

  // 마운트 시, 사용자의 Voca Json Tree를 불러와
  // findAllVocaPaths 재귀함수로 모든 단어장 Path 리스트 추출해 allVocaPaths State에 저장
  useEffect(() => {
    operateData("GET", "Voca/root").then((rootVocaTree) => {
      if (rootVocaTree === null || isEmpty(rootVocaTree)) {
        setVocaTree("NoFile");
        return;
      }
      setVocaTree(rootVocaTree);
      findAllVocaPaths(rootVocaTree, "Voca/root");
    });
  }, []);

  return (
    <VocaPathContext.Provider
      value={{
        vocaTree,
        allVocaPaths,
        selectedVocaPaths,
        setSelectedVocaPaths,
      }}
    >
      {children}
    </VocaPathContext.Provider>
  );
};
