import React from "react";
import { Box, Typography } from "@mui/material";

const AnswerTable = ({ type, questionWord }) => {
  const answerValue = type === "word" ? questionWord?.mean : questionWord?.word;

  const detailRows = [
    { key: "pronunciation", label: "発音", value: questionWord?.pronunciation },
    { key: "explain", label: "説明", value: questionWord?.explain },
    { key: "example", label: "例文", value: questionWord?.example },
  ].filter(
    ({ value }) => value !== undefined && value !== null && value !== ""
  );

  const totalDetailRatio =
    detailRows.length === 0 ? 0 : detailRows.length === 1 ? 0.5 : 0.6;
  const answerRatio =
    detailRows.length === 0 ? 1 : detailRows.length === 1 ? 0.5 : 0.4;

  const explainRow = detailRows.find(({ key }) => key === "explain");
  const otherDetailRows = detailRows.filter(({ key }) => key !== "explain");

  let explainRatio = 0;
  let otherRatioPer = 0;

  if (detailRows.length === 1) {
    if (explainRow) {
      explainRatio = totalDetailRatio;
    } else {
      otherRatioPer = totalDetailRatio;
    }
  } else if (detailRows.length > 1) {
    if (explainRow) {
      explainRatio = Math.min(totalDetailRatio / 2, totalDetailRatio);
      const remaining = totalDetailRatio - explainRatio;
      otherRatioPer = otherDetailRows.length
        ? remaining / otherDetailRows.length
        : 0;
    } else {
      otherRatioPer = totalDetailRatio / detailRows.length;
    }
  }

  const tableRows = [
    { key: "answer", label: "答え", value: answerValue, ratio: answerRatio },
    ...detailRows.map((row) => ({
      ...row,
      ratio:
        row.key === "explain"
          ? explainRatio || totalDetailRatio
          : otherRatioPer || totalDetailRatio,
    })),
  ];

  const tableBorderColor = "rgba(0, 0, 0, 0.12)";

  const getValueTypographySx = (value, isAnswer) => {
    const length = value ? value.toString().length : 0;
    let fontSize = isAnswer ? 18 : 14;

    if (length > 200) {
      fontSize = isAnswer ? 15 : 11;
    } else if (length > 120) {
      fontSize = isAnswer ? 16 : 12;
    }

    return {
      color: "#535353",
      whiteSpace: "pre-wrap",
      fontSize,
      lineHeight: 1.4,
      width: "100%",
    };
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "max-content 1fr",
        gridTemplateRows: tableRows
          .map((row) => `${((row.ratio || 0) * 100).toFixed(2)}%`)
          .join(" "),
        alignItems: "stretch",
        textAlign: "left",
      }}
    >
      {tableRows.map(({ key, label, value }, index) => (
        <React.Fragment key={`${key}-${label}`}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              py: 1,
              borderTop: index === 0 ? "none" : `1px solid ${tableBorderColor}`,
              borderRight: `1px solid ${tableBorderColor}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#535353", fontWeight: 600 }}
            >
              {label}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 0,
              py: 1,
              borderTop: index === 0 ? "none" : `1px solid ${tableBorderColor}`,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                px: 1,
                display: "flex",
                alignItems: "center",
                scrollbarWidth: "thin",
                scrollbarColor: "#bdbdbd transparent",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#bdbdbd",
                  borderRadius: "3px",
                },
              }}
            >
              <Typography sx={getValueTypographySx(value, key === "answer")}>
                {value || "-"}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default AnswerTable;

