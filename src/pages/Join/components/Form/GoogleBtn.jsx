import React from "react";

const GoogleBtn = ({ method, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "12px 16px",
        backgroundColor: "white",
        color: "#374151",
        fontWeight: 500,
        borderRadius: "8px",
        transition: "all 0.3s ease",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
        border: "none",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#e5e7eb";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "white";
      }}
    >
      <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span>Googleアカウントで{method}</span>
    </button>
  );
};

// method, onClickGoogleAuth는 각각 string, function으로 원시 타입이기 때문에,
// 얕은 비교만 하면 되기 때문에 React.memo의 두 번째 매개변수를 비워도 됨.
export default React.memo(GoogleBtn);
