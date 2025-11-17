import { wordMasterAuth, wordMasterDB } from "../../firebase";
import { ref, get } from "firebase/database";
import printError from "../../utils/printError";

export const getList = async (path, propName = "") => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    const listObject = (await get(pathRef)).val();
    console.log(listObject);
    const list = [];

    if (propName) {
      for (const key in listObject) {
        list.push(listObject[key][propName]);
      }
    } else {
      for (const key in listObject) {
        list.push(listObject[key]);
      }
    }

    return list;
  } catch (error) {
    printError(error);
  }
};

export const getAddressList = async (path) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);
    const listObject = (await get(pathRef)).val();
    return Object.keys(listObject);
  } catch (error) {
    printError(error);
  }
};
