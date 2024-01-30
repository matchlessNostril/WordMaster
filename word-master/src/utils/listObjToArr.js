const listObjToArr = (currentTree, listType) => {
  const newList = [];
  for (const key in currentTree?.[listType]) {
    newList.push(currentTree?.[listType][key].name);
  }
  return newList;
};

export default listObjToArr;
