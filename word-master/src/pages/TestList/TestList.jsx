import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useSaveListReducer } from "../../hooks";
import { AuthContext } from "../../contexts/AuthContext";
import { Box, Typography, IconButton } from "@mui/material";
import {
  Transition,
  Loading,
  NoFile,
  ScrollList,
  RowSpaceBetween,
} from "../../components";
import TestCard from "../../components/Test/TestList/TestCard";
import {
  autoFetchList,
  offAllDBEventListener,
} from "../../service/database/autoFetchList";
import { isEmpty } from "lodash";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const TestList = () => {
  // 사용자 정보
  const { displayName } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  // 테스트 리스트 State와 Dispatch
  const { list, listDispatch } = useSaveListReducer();

  // 로딩 State와 Setter
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // testList 불러오기
    autoFetchList("Test/testList", listDispatch, setIsLoading);

    // clean-up 함수로 DB 이벤트 리스너 제거
    return () => {
      offAllDBEventListener("Test/testList");
    };
  }, []);

  return (
    <>
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <RowSpaceBetween>
          <Typography variant="h5" ml={2}>
            <strong>{displayName}</strong>님의 테스트
          </Typography>
          <IconButton onClick={() => navigate("/CreateTest")}>
            <AddCircleIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </RowSpaceBetween>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty(list) ? (
              <NoFile text="아직 생성된 테스트가 없습니다." />
            ) : (
              <ScrollList maxHeight="73vh">
                {Object.entries(list).map(([key, value]) => (
                  <TestCard key={key} itemKey={key} title={value} />
                ))}
              </ScrollList>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Transition(TestList);
