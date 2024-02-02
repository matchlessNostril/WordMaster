// firebase Auth
import { wordMasterAuth, gProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// utils
import printError from "../utils/printError";

// 1. 회원 가입
export const Register = async (nickname, email, password) => {
  try {
    // 이메일, 비밀번호로 회원 가입
    const registerRes = await createUserWithEmailAndPassword(
      wordMasterAuth,
      email,
      password
    );

    // 자동 로그인 여부 로컬 스토리지에 저장
    if (registerRes) {
      localStorage.setItem("autoLogin", "on");
    }

    // 닉네임도 등록
    await updateProfile(wordMasterAuth.currentUser, {
      displayName: nickname,
    });
  } catch (error) {
    printError(error);
    if (error.code === "auth/email-already-in-use") {
      alert("이미 가입된 이메일입니다.");
    }
  }
};

// 2. 로그인
export const Login = async (email, password) => {
  try {
    // 이메일, 비밀번호로 로그인
    const loginRes = await signInWithEmailAndPassword(
      wordMasterAuth,
      email,
      password
    );

    if (loginRes) {
      localStorage.setItem("autoLogin", "on");
    }
  } catch (error) {
    printError(error);
    if (error.code === "auth/invalid-credential") {
      alert("일치하는 사용자가 없습니다.");
    }
  }
};

// 3. 구글
export const googleAuth = async () => {
  // 정보 제공 범위 설정
  // profile, email 정보 요청
  gProvider.addScope("profile");
  gProvider.addScope("email");

  try {
    const googleAuthRes = await signInWithPopup(wordMasterAuth, gProvider);

    if (googleAuthRes) {
      localStorage.setItem("autoLogin", "on");
    }
  } catch (error) {
    printError(error);
  }
};

// 4. 로그아웃
export const logout = async () => {
  try {
    await signOut(wordMasterAuth);

    localStorage.removeItem("autoLogin");
  } catch (error) {
    printError(error);
  }
};
