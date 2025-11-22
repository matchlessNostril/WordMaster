import { wordMasterAuth, wordMasterDB } from "../../firebase";
import { ref, get, set, push, update, remove } from "firebase/database";
import printError from "../../utils/printError";

export const operateData = async (type, path, data = null) => {
  try {
    const uid = wordMasterAuth.currentUser.uid;
    const pathRef = ref(wordMasterDB, `${uid}/${path}`);

    switch (type) {
      case "GET":
        return (await get(pathRef)).val();
      case "SET":
        await set(pathRef, data);
        break;
      case "PUSH":
        const pushedData = await push(pathRef, data);
        return pushedData;
        break;
      case "UPDATE":
        await update(pathRef, data);
        break;
      case "REMOVE":
        await remove(pathRef);
    }
  } catch (error) {
    printError(error);
  }
};

export default operateData;
