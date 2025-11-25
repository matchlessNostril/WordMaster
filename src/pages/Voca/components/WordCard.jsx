import React, { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  ListItem,
  Card,
  CardContent,
  Typography,
  alpha,
  Divider,
} from "@mui/material";
import {
  WordField,
  ShowAnswerButton,
  HideAnswerButton,
} from "./WordCard/index";

const WordCard = ({ index, word, sortingBy, onHideAnswer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hasPronunciation = word.hasOwnProperty("pronunciation");
  const hasExplain = word.hasOwnProperty("explain");
  const hasExample = word.hasOwnProperty("example");
  const [visibleAnswer, setVisibleAnswer] = useState(false);

  return (
    <ListItem sx={{ padding: "0", marginBottom: "16px" }}>
      <Card
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "transparent",
          backgroundImage: `linear-gradient(to bottom right, ${
            theme.palette.slate[800]
          }, ${alpha(theme.palette.slate[800], 0.7)})`,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          borderRadius: "12px",
          border: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "24px",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: alpha(theme.palette.cyan[500], 0.3),
          },
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            padding: 0,
            "&.MuiCardContent-root:last-child": { p: 0 },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              width: "100%",
              flexDirection: isMobile ? "row" : "row",
            }}
          >
            <div
              style={{
                minWidth: isMobile ? "32px" : "40px",
                minHeight: isMobile ? "32px" : "40px",
                width: "fit-content",
                height: "fit-content",
                borderRadius: "8px",
                backgroundColor: theme.palette.slate[700],
                border: `1px solid ${theme.palette.slate[600]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.textColors.slate300,
                fontWeight: "bold",
                flexShrink: 0,
                marginRight: isMobile ? "16px" : "20px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: isMobile ? "0.875rem" : "1.25rem",
                }}
              >
                {index + 1}
              </Typography>
            </div>
            <div
              style={{
                flex: isMobile ? "1" : "4.5",
                display: "flex",
                flexDirection: isMobile ? "column" : "column",
              }}
            >
              {isMobile ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <WordField
                      label={sortingBy === "word" ? "単語" : "意味"}
                      value={sortingBy === "word" ? word.word : word.mean}
                    />
                  </div>
                  <Divider
                    sx={{
                      borderColor: theme.palette.slate[600],
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                    orientation="horizontal"
                  />
                  <div style={{ position: "relative" }}>
                    {onHideAnswer && visibleAnswer && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          zIndex: 1,
                        }}
                      >
                        <HideAnswerButton
                          onClick={() => setVisibleAnswer((prev) => !prev)}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        display:
                          onHideAnswer && !visibleAnswer ? "none" : "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <WordField
                          label={sortingBy === "word" ? "意味" : "単語"}
                          value={sortingBy === "word" ? word.mean : word.word}
                        />
                      </div>
                      {[
                        {
                          propName: "pronunciation",
                          label: "発音",
                          has: hasPronunciation,
                        },
                        { propName: "explain", label: "説明", has: hasExplain },
                        { propName: "example", label: "例文", has: hasExample },
                      ].map(
                        ({ propName, label, has }, index) =>
                          has && (
                            <div
                              key={propName + index}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <WordField label={label} value={word[propName]} />
                            </div>
                          )
                      )}
                    </div>
                    {onHideAnswer && !visibleAnswer && (
                      <ShowAnswerButton
                        onClick={() => setVisibleAnswer((prev) => !prev)}
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <WordField
                    label={sortingBy === "word" ? "単語" : "意味"}
                    value={sortingBy === "word" ? word.word : word.mean}
                  />
                </>
              )}
            </div>
            {!isMobile && (
              <>
                <Divider
                  sx={{
                    borderColor: theme.palette.slate[600],
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                  orientation="vertical"
                  flexItem
                />
                <div
                  style={{
                    flex: "4.5",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {onHideAnswer && visibleAnswer && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 1,
                      }}
                    >
                      <HideAnswerButton
                        onClick={() => setVisibleAnswer((prev) => !prev)}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      display: onHideAnswer && !visibleAnswer ? "none" : "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <WordField
                        label={sortingBy === "word" ? "意味" : "単語"}
                        value={sortingBy === "word" ? word.mean : word.word}
                      />
                    </div>
                    {[
                      {
                        propName: "pronunciation",
                        label: "発音",
                        has: hasPronunciation,
                      },
                      { propName: "explain", label: "説明", has: hasExplain },
                      { propName: "example", label: "例文", has: hasExample },
                    ].map(
                      ({ propName, label, has }, index) =>
                        has && (
                          <div
                            key={propName + index}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <WordField label={label} value={word[propName]} />
                          </div>
                        )
                    )}
                  </div>
                  {onHideAnswer && !visibleAnswer && (
                    <ShowAnswerButton
                      onClick={() => setVisibleAnswer((prev) => !prev)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default WordCard;
