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
    await createUserWithEmailAndPassword(wordMasterAuth, email, password);

    // 닉네임도 등록
    await updateProfile(wordMasterAuth.currentUser, {
      displayName: nickname,
    });
  } catch (error) {
    printError(error);
  }
};

// 2. 로그인
export const Login = async (email, password) => {
  try {
    // 이메일, 비밀번호로 로그인
    await signInWithEmailAndPassword(wordMasterAuth, email, password);
  } catch (error) {
    printError(error);
  }
};

// 3. 구글
export const googleAuth = async () => {
  // 정보 제공 범위 설정
  // profile, email 정보 요청
  gProvider.addScope("profile");
  gProvider.addScope("email");

  try {
    await signInWithPopup(wordMasterAuth, gProvider);
  } catch (error) {
    printError(error);
  }
};

// 4. 로그아웃
export const logout = async () => {
  try {
    await signOut(wordMasterAuth);
  } catch (error) {
    printError(error);
  }
};
