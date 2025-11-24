import { Transition, LargeLoading } from "../components";

const Start = () => {
  // 자동 로그인 사용자인지 확인
  const isLoginUser = localStorage.getItem("isLoginUser");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        gap: "3rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Logo */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            <span
              style={{
                display: "inline-block",
                backgroundImage:
                  "linear-gradient(to bottom right, #cbd5e1, #e2e8f0, #94a3b8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(148, 163, 184, 0.3))",
              }}
            >
              WORD
            </span>
            <br />
            <span
              style={{
                display: "inline-block",
                backgroundImage:
                  "linear-gradient(to bottom right, #cbd5e1, #e2e8f0, #94a3b8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(148, 163, 184, 0.3))",
              }}
            >
              MASTER
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
            color: "#94a3b8",
            fontWeight: 500,
            margin: 0,
          }}
        >
          自分だけの単語帳、自分だけのテスト
        </p>
      </div>
      {isLoginUser === "yes" && <LargeLoading />}
    </div>
  );
};

export default Transition(Start);
