import React from "react";
// Hook
import { useState, useEffect } from "react";
// MUI
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ActionModal = ({ open, setOpen, content }) => {
  // TextField 입력 State
  const [value, setValue] = useState("");

  useEffect(() => setValue(""), [open]);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30vmax",
            bgcolor: "background.paper",
            border: "1px solid #535353",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={3} sx={{ fontWeight: 500 }}>
            {content?.title}
          </Typography>
          {content?.textField && (
            <TextField
              label={`${content?.textField.label}`}
              variant="filled"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              helperText={
                "이미 존재하는 이름은 불가능하며, '.', '#', '$', '[', ']' 기호는 들어갈 수 없습니다."
              }
              sx={{
                width: "100%",
                "& .MuiFormHelperText-root": { color: "#303030" },
              }}
            />
          )}
          <Box position="relative" p={4}>
            <Button
              variant="contained"
              disabled={content?.textField && !value}
              onClick={() =>
                content?.textField
                  ? content.btnClickHandler(value)
                  : content.btnClickHandler()
              }
              sx={{ position: "absolute", right: 0 }}
            >
              {content?.btnName}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(ActionModal);
