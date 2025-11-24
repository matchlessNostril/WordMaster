import { useTheme } from "@mui/material";

const MethodToggle = ({ method, setMethod }) => {
  const theme = useTheme();

  const tabs = ["ログイン", "会員登録"];

  const handleClick = (value) => {
    // 이미 선택된 버튼을 누르면 아무것도 하지 않음
    if (method === value) return;
    setMethod(value);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "2rem",
        backgroundColor: `${theme.palette.slate[900]}80`,
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      {tabs.map((tab) => {
        const isSelected = method === tab;
        return (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: "6px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              outline: "none",
              ...(isSelected
                ? {
                    backgroundImage: `linear-gradient(to right, ${theme.palette.cyan[500]}, ${theme.palette.blue[500]})`,
                    color: "white",
                    boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 10px 15px -3px ${theme.palette.cyan[500]}33, 0 4px 6px -2px ${theme.palette.cyan[500]}33`,
                  }
                : {
                    color: theme.palette.textColors.slate400,
                    backgroundColor: "transparent",
                    backgroundImage: "none",
                    boxShadow: "none",
                  }),
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.target.style.color = theme.palette.textColors.slate200;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.target.style.color = theme.palette.textColors.slate400;
              }
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default MethodToggle;
