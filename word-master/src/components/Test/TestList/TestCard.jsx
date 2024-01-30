import React from "react";
// Hook
import { useState, useEffect } from "react";
// API
import { getData } from "../../../service/database/dataOperation";

const TestCard = ({ itemKey, title }) => {
  const [info, setInfo] = useState();

  useEffect(() => {
    getData(`Test/${title}/info`).then((info) => {
      console.log(info);
      setInfo(info);
    });
  }, []);

  return <></>;
};

export default React.memo(TestCard);
