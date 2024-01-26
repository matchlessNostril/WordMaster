// firebase
import { wordMasterAuth, wordMasterDB } from "../../firebase";
// firebase DB
import { ref, get, set, push, update, remove } from "firebase/database";
// utils
import printError from "../../utils/printError";

// 1. 데이터 get
export const getData = async (path) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    const data = (await get(pathRef)).val();
    return data;
  } catch (error) {
    printError(error);
  }
};

// 2. 데이터 set
export const setData = async (path, data) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    await set(pathRef, data);
  } catch (error) {
    printError(error);
  }
};

// 3. 데이터 push
export const pushData = async (path, data) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    await push(pathRef, data);
  } catch (error) {
    printError(error);
  }
};

// 4. 데이터 update
export const updateData = async (path, data) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    await update(pathRef, data);
  } catch (error) {
    printError(error);
  }
};

// 5. 데이터 remove
export const removeData = async (path) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    await remove(pathRef);
  } catch (error) {
    printError(error);
  }
};
