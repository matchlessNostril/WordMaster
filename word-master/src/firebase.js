import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const wordMasterApp = initializeApp({
});

export const wordMasterAuth = getAuth(wordMasterApp);
export const gProvider = new GoogleAuthProvider();
export const wordMasterDB = getDatabase(wordMasterApp);
