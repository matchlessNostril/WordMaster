import React from "react";
// MUI
import { Popover, ButtonGroup, Button } from "@mui/material";

const BtnPopover = ({ anchor, setAnchor, buttons }) => {
  return (
    <>
      <Popover
        id="simple-popper"
        open={anchor ? true : false} // Anchor가 있다면 PopOver 열기
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        // PopOver 위치 하단 중앙으로
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ButtonGroup orientation="vertical" variant="text">
          {buttons.map((button, index) => (
            <Button key={index} onClick={button.onClickHandler}>
              {button.name}
            </Button>
          ))}
        </ButtonGroup>
      </Popover>
    </>
  );
};

export default React.memo(BtnPopover);
