// firebase
import { wordMasterAuth, wordMasterDB } from "../../firebase";
// firebase DB
import { ref, get } from "firebase/database";
// utils
import printError from "../../utils/printError";

export const getList = async (path) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    const listObject = (await get(pathRef)).val();
    const list = [];
    for (const key in listObject) {
      list.push(listObject[key].name);
    }

    return list;
  } catch (error) {
    printError(error);
  }
};
