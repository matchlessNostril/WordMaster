import React from "react";
// Hook
import { useState, useEffect } from "react";
// Router
import { useNavigate } from "react-router-dom";
// firebase Auth
import { onAuthStateChanged } from "firebase/auth";
import { wordMasterAuth } from "../firebase";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // AuthProvider가 마운트될 때 관찰자 등록
  // onAuthStateChanged : 사용자 인증 상태의 변화를 감지하여, 변화 할 때마다 콜백함수 실행
  useEffect(() => {
    onAuthStateChanged(wordMasterAuth, (currentUser) => {
      setUser(currentUser);

      // 로그인 된 거면 Main으로
      if (currentUser) {
        navigate("/Main");
        return;
      }
      // 로그아웃 된 거면 root로
      navigate("/");
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
