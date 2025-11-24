import { useState, useEffect } from "react";
import { usePathListReducer } from "../../hooks";
import {
  Transition,
  LargeLoading,
  NoFile,
  ScrollList,
  ResponsiveBox,
} from "../../components";
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
    <ResponsiveBox>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <LargeLoading />
        </div>
      ) : (
        <>
          <Header />
          {isEmpty(testList) ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <NoFile text="まだ作成されたテストがありません。" />
            </div>
          ) : (
            <ScrollList maxHeight="73vh">
              {Object.entries(testList).map(([key, value]) => (
                <ListItemCard key={key} itemKey={key} title={value} />
              ))}
            </ScrollList>
          )}
        </>
      )}
    </ResponsiveBox>
  );
};

export default Transition(TestList);
