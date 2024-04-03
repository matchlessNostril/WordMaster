import { useState, useEffect } from "react";
import { usePathListReducer } from "../../hooks";
import { Box } from "@mui/material";
import { Transition, Loading, NoFile, ScrollList } from "../../components";
import { Header, ListItemCard } from "./components";
import {
  autoFetchList,
  offAllDBEventListener,
} from "../../service/database/autoFetchList";
import { isEmpty } from "lodash";

const TestList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pathList: testList, pathListDispatch: testListDispatch } =
    usePathListReducer();

  useEffect(() => {
    autoFetchList("Test/testList", testListDispatch, setIsLoading);
    return () => {
      offAllDBEventListener("Test/testList");
    };
  }, []);

  return (
    <>
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty(testList) ? (
              <NoFile text="아직 생성된 테스트가 없습니다." />
            ) : (
              <ScrollList maxHeight="73vh">
                {Object.entries(testList).map(([key, value]) => (
                  <ListItemCard key={key} itemKey={key} title={value} />
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
