// Router
import { useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../contexts/AuthContext";
// Hook
import { useContext, useEffect } from "react";
// Custom Hook
import useSaveListReducer from "../../hooks/useSaveListReducer";
import useLoading from "../../hooks/useLoading";
// MUI
import { Box, Typography, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Component
import Transition from "../../components/Transition";
import TestCard from "../../components/Test/TestList/TestCard";
import Loading from "../../components/Loading";
import NoFile from "../../components/NoFile";
import ScrollList from "../../layout/ScrollList";
// Layout
import RowSpaceBetween from "../../layout/RowSpaceBetween";
// API
import {
  autoFetchList,
  offAllDBEventListener,
} from "../../service/database/autoFetchList";
// Utils
import { isEmpty } from "lodash";

const TestList = () => {
  // 사용자 정보
  const { displayName } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  // 테스트 리스트 State와 Dispatch
  const { list, listDispatch } = useSaveListReducer();

  // 로딩 State와 Setter
  const [onLoading, setOnLoading] = useLoading();

  useEffect(() => {
    // testList 불러오기
    autoFetchList("Test/testList", listDispatch, setOnLoading);

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
        {onLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty(list) ? (
              <NoFile />
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
