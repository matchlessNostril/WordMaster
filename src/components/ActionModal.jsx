import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ActionModal = ({ open, setOpen, content }) => {
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
            width: "fit-content",
            minWidth: "30vmax",
            bgcolor: "background.paper",
            border: "1px solid #535353",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Header title={content?.title} />
          {content?.children}
          {content?.textField && (
            <TextField
              label={`${content?.textField.label}`}
              variant="filled"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              autoComplete="off"
              helperText={
                "すでに存在する名前は作成できません。また、「 .  #  $  [  ] 」記号は入れられません。"
              }
              sx={{
                width: "100%",
                "& .MuiFormHelperText-root": { color: "#303030" },
              }}
            />
          )}
          {content?.btnName && (
            <Box position="relative" p={4}>
              <Button
                variant="contained"
                disabled={content?.textField && !value}
                onClick={() =>
                  content?.textField
                    ? content.handleClickBtn(value)
                    : content.handleClickBtn()
                }
                sx={{ position: "absolute", right: 0 }}
              >
                {content?.btnName}
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ActionModal;

const Header = React.memo(({ title }) => {
  return (
    <Typography variant="h6" mb={3} sx={{ fontWeight: 500 }}>
      {title}
    </Typography>
  );
});
