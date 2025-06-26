import { wordMasterAuth, gProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import printError from "../utils/printError";

export const Register = async (nickname, email, password) => {
  try {
    const registerRes = await createUserWithEmailAndPassword(
      wordMasterAuth,
      email,
      password
    );

    // 자동 로그인 여부 로컬 스토리지에 저장
    if (registerRes) {
      localStorage.setItem("isLoginUser", "yes");
    }

    await updateProfile(wordMasterAuth.currentUser, {
      displayName: nickname,
    });
  } catch (error) {
    printError(error);
    if (error.code === "auth/email-already-in-use") {
      alert("このメールアドレスはすでに登録されています。");
    }
  }
};

export const Login = async (email, password) => {
  try {
    const loginRes = await signInWithEmailAndPassword(
      wordMasterAuth,
      email,
      password
    );

    if (loginRes) {
      localStorage.setItem("isLoginUser", "yes");
    }
  } catch (error) {
    printError(error);
    if (error.code === "auth/invalid-credential") {
      alert("一致するユーザーが見つかりません。");
    }
  }
};

export const googleAuth = async () => {
  // 정보 제공 범위 설정: profile, email 정보 요청
  gProvider.addScope("profile");
  gProvider.addScope("email");

  try {
    const googleAuthRes = await signInWithPopup(wordMasterAuth, gProvider);

    if (googleAuthRes) {
      localStorage.setItem("isLoginUser", "yes");
    }
  } catch (error) {
    printError(error);
  }
};

export const logout = async () => {
  try {
    await signOut(wordMasterAuth);

    // 자동 로그인 여부 로컬 스토리지에서 삭제
    localStorage.removeItem("isLoginUser");
  } catch (error) {
    printError(error);
  }
};
