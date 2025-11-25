import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { VocaPathContext } from "../../../contexts/VocaPathContext";
import {
  Stack,
  Checkbox as MuiCheckbox,
  Button,
  useTheme,
} from "@mui/material";
import listObjToArr from "../../../utils/listObjToArr";
import { Box, alpha } from "@mui/material";
import FolderSharpIcon from "@mui/icons-material/FolderSharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";

// 디렉토리 or 단어장 체크 박스 컴포넌트
const Checkbox = ({ index, isDir = false, name, path, currentTree }) => {
  const theme = useTheme();

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
          disableRipple
          icon={
            <Box
              className="custom-checkbox-icon"
              sx={{
                width: 20,
                height: 20,
                borderRadius: "6px",
                border: `2px solid ${theme.palette.slate[600]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                backgroundColor: "transparent",
              }}
            />
          }
          checkedIcon={
            <Box
              className="custom-checkbox-icon"
              sx={{
                width: 20,
                height: 20,
                borderRadius: "6px",
                border: `2px solid ${theme.palette.cyan[400]}`,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.cyan[500]}, ${theme.palette.blue[500]})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </Box>
          }
          indeterminateIcon={
            <Box
              className="custom-checkbox-icon"
              sx={{
                width: 20,
                height: 20,
                borderRadius: "6px",
                border: `2px solid ${theme.palette.cyan[400]}`,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.cyan[500]}, ${theme.palette.blue[500]})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 10,
                  height: 2,
                  borderRadius: 999,
                  backgroundColor: "white",
                }}
              />
            </Box>
          }
          sx={{
            p: 0,
            mr: 1.5,
            "&:hover .custom-checkbox-icon": {
              borderColor: theme.palette.slate[400],
            },
          }}
        />
        <Button
          onClick={isDir ? () => setOpenDir((prev) => !prev) : handleCheckVoca}
          startIcon={
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDir
                  ? alpha(theme.palette.amber[400], 0.2)
                  : alpha(theme.palette.slate[500], 0.2),
                color: isDir
                  ? theme.palette.amber[400]
                  : theme.palette.slate[400],
                flexShrink: 0,
              }}
            >
              {isDir ? (
                <FolderSharpIcon
                  sx={{
                    width: 24,
                    height: 24,
                    color: theme.palette.amber[250],
                  }}
                />
              ) : (
                <DescriptionSharpIcon
                  sx={{ width: 24, height: 24, color: theme.palette.blue[400] }}
                />
              )}
            </Box>
          }
          // minWidth를 unset로 해야 startIcon과 내부 Text를 모두 감쌀 수 있음
          sx={{
            whiteSpace: "nowrap",
            minWidth: "unset",
            textTransform: "none",
            fontSize: "0.875rem",
            color: theme.palette.textColors.slate200,
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
