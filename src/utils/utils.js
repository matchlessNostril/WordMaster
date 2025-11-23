import operateData from "../service/database/operateData";
import { getList, getAddressList } from "../service/database/getList";

export const saveWordInTest = async (
  testName,
  selectedVocaPaths,
  testType = "word"
) => {
  // wordAddressList 리스트 불러오기
  const wordAddressList = await Promise.all(
    selectedVocaPaths.map(async (path) => ({
      path,
      addressList: (
        await getAddressList(path)
      ).filter((value) => value.startsWith("-O")),
    }))
  );

  const wordTestPromises = wordAddressList.map((wordAddress) =>
    operateData(
      "PUSH",
      `Test/${testName}/wordList/${testType}Test/waiting`,
      wordAddress
    )
  );
  await Promise.all(wordTestPromises);
};

export const updateTestListInVoca = async (
  type,
  vocaPaths,
  testName,
  newTestName = null
) => {
  let promises = [];
  vocaPaths.forEach((path) => {
    promises.push(operateData("GET", `${path}/testList`));
  });
  const prevTestListAll = await Promise.all(promises);
  promises = [];

  switch (type) {
    case "ADD":
      prevTestListAll.forEach((testList, index) => {
        if (testList) {
          promises.push(
            operateData("SET", `${vocaPaths[index]}/testList`, [
              ...testList,
              testName,
            ])
          );
        } else {
          promises.push(
            operateData("SET", `${vocaPaths[index]}/testList`, [testName])
          );
        }
      });
      break;
    case "REMOVE":
      prevTestListAll.forEach((testList, index) => {
        const newTestList = testList.filter((test) => test !== testName);
        if (newTestList.length === 0) {
          promises.push(operateData("REMOVE", `${vocaPaths[index]}/testList`));
        } else {
          promises.push(
            operateData("SET", `${vocaPaths[index]}/testList`, newTestList)
          );
        }
      });
      break;
    case "UPDATE":
      prevTestListAll.forEach((testList, index) => {
        const newTestList = [...testList];
        const testIndex = newTestList.indexOf(testName);
        newTestList[testIndex] = newTestName;
        promises.push(
          operateData("SET", `${vocaPaths[index]}/testList`, newTestList)
        );
      });
      break;
    default:
      break;
  }
  await Promise.all(promises);
};

// 공통
export const getAllTestNamesContainingVoca = async (vocaPath) => {
  const _allTestNames = await operateData("GET", `Test/testList`);
  if (_allTestNames === null) return null;

  const allTestNames = Object.values(_allTestNames).map((test) => test.name);

  let promises = [];
  allTestNames.forEach((testName) =>
    promises.push(operateData("GET", `Test/${testName}/paths`))
  );
  let vocaPathsList = await Promise.all(promises);
  promises = [];

  vocaPathsList = vocaPathsList.map((vocaPaths, index) => {
    return {
      testName: allTestNames[index],
      vocaPaths: Object.values(vocaPaths).map((path) => `Voca/root/${path}`),
    };
  });

  const filteredTestNames = vocaPathsList
    .filter(({ vocaPaths }) => {
      return vocaPaths.includes(vocaPath);
    })
    .map(({ testName }) => testName);

  return filteredTestNames;
};

// word 변경 반영
export const removeWordInVoca = async (vocaPath, wordAddress) => {
  const _prevVoca = await getList(vocaPath);
  const prevVoca = _prevVoca.filter((value) => value.hasOwnProperty("word"));
  if (prevVoca.length === 1) {
    // 마지막 단어였다면, 삭제 불가능
    return "fail:lastWord";
  } else {
    await operateData("REMOVE", `${vocaPath}/${wordAddress}`);
  }
};

export const removeWordInTest = async (vocaPath, wordAddress, type = "one") => {
  // 1. 해당 vocaPath가 포함된 test 리스트 찾기
  const filteredTestNames = await getAllTestNamesContainingVoca(vocaPath);
  if (filteredTestNames === null) return;

  // 2. Test의 waiting address list에서 삭제
  let promises = [];
  // TODO: 망했다 (testWordPathKey 필요한데, 단어 하나 삭제하겠다고 이걸 다 조회하는 건 말이 안돼. 근데 방법이 없어 일단 해봐... 테스트 계정 구색용, 실제로 내가 쓸 땐 너무 느리면 사용 X)
  for (const testName of filteredTestNames) {
    promises.push(
      operateData("GET", `Test/${testName}/wordList/wordTest/waiting`)
    );
    promises.push(
      operateData("GET", `Test/${testName}/wordList/wordTest/passed`)
    );
    promises.push(
      operateData("GET", `Test/${testName}/wordList/meanTest/waiting`)
    );
    promises.push(
      operateData("GET", `Test/${testName}/wordList/meanTest/passed`)
    );
  }
  const allTestWordList = await Promise.all(promises);
  promises = [];

  let findInWordTest = false;
  let findInMeanTest = false;
  for (let i = 0; i < allTestWordList.length; i++) {
    const wordListPathIndex = i % 4;
    const wordListPath = [
      "wordTest/waiting",
      "wordTest/passed",
      "meanTest/waiting",
      "meanTest/passed",
    ][wordListPathIndex];

    if (type === "one") {
      if (wordListPathIndex === 0) {
        // 4개씩 묶어서 처리하므로, 4개씩 묶음 초기화
        findInWordTest = false;
        findInMeanTest = false;
      } else if (wordListPath === "wordTest/passed") {
        // wordTest/passed일 때, 만약 wordTest/waiting에서 이미 발견했다면 패스
        if (findInWordTest) continue;
      } else if (wordListPath === "meanTest/passed") {
        // meanTest/passed일 때, 만약 meanTest/waiting에서 이미 발견했다면 패스
        if (findInMeanTest) continue;
      }
    }

    const testWordList = allTestWordList[i]
      ? Object.entries(allTestWordList[i])
      : null;
    if (!testWordList) continue;

    const testNameIndex = Math.floor(i / 4);
    const currentTestName = filteredTestNames[testNameIndex];

    const targetAddressList = type === "one" ? [wordAddress] : wordAddress;
    for (const [key, value] of testWordList) {
      if (!value) continue;

      const { path, addressList } = value;
      if (path !== vocaPath) continue;

      // 삭제 이후 남은 address list
      const newAddressList = addressList.filter(
        (address) => !targetAddressList.includes(address)
      );

      if (newAddressList.length === addressList.length) continue;
      else {
        // 삭제될 게 있음
        promises.push(
          operateData(
            "SET",
            `Test/${currentTestName}/wordList/${wordListPath}/${key}/addressList`,
            newAddressList
          )
        );

        if (type === "one") {
          if (wordListPath.includes("wordTest")) {
            findInWordTest = true;
          } else {
            findInMeanTest = true;
          }
        }
      }
    }
  }
  await Promise.all(promises);

  return "success";
};

export const removeWordInDB = async (vocaPath, wordAddress) => {
  await removeWordInVoca(vocaPath, wordAddress);
  await removeWordInTest(vocaPath, wordAddress);
};

// 해당 voca가 포함된 test에서 waiting word 추가
export const addWordInTest = async (vocaPath, wordAddress) => {
  const filteredTestNames = await getAllTestNamesContainingVoca(vocaPath);
  if (filteredTestNames === null) return;

  let promises = [];
  for (const testName of filteredTestNames) {
    promises.push(
      operateData("GET", `Test/${testName}/wordList/wordTest/waiting`)
    );
    promises.push(
      operateData("GET", `Test/${testName}/wordList/meanTest/waiting`)
    );
  }
  const allTestWordList = await Promise.all(promises);
  promises = [];

  for (let i = 0; i < allTestWordList.length; i++) {
    const wordListPathIndex = i % 2;
    const wordListPath = ["wordTest/waiting", "meanTest/waiting"][
      wordListPathIndex
    ];

    const testWordList = allTestWordList[i]
      ? Object.entries(allTestWordList[i])
      : null;

    const testNameIndex = Math.floor(i / 2);
    const currentTestName = filteredTestNames[testNameIndex];

    for (const [key, value] of testWordList) {
      if (!value) continue;

      const { path, addressList } = value;
      if (path !== vocaPath) continue;

      const newAddressList = addressList.concat(wordAddress);
      promises.push(
        operateData(
          "SET",
          `Test/${currentTestName}/wordList/${wordListPath}/${key}/addressList`,
          newAddressList
        )
      );
    }
  }
  await Promise.all(promises);

  return "success";
};

// vocaName 변겅/삭제 -> test 반영
export const updateVocaNameInTest = async (
  type,
  vocaPath,
  newVocaPath = null
) => {
  const filteredTestNames = await getAllTestNamesContainingVoca(vocaPath);
  if (filteredTestNames === null) return;

  let promises = [];
  let newFilteredTestNames = [...filteredTestNames];

  // 1. paths 변경
  for (const testName of filteredTestNames) {
    const prevPaths = await getList(`Test/${testName}/paths`);

    if (type === "REMOVE" && prevPaths.length === 1) {
      promises.push(operateData("REMOVE", `Test/${testName}`));

      const testList = await getList("Test/testList", "name");
      const newTestList = testList.filter((test) => test !== testName);
      await operateData("REMOVE", "Test/testList");
      newTestList.forEach((testName) =>
        promises.push(operateData("PUSH", "Test/testList", { name: testName }))
      );

      newFilteredTestNames = newFilteredTestNames.filter(
        (test) => test !== testName
      );

      await Promise.all(promises);
      continue;
    }

    let newPaths = [];
    if (type === "UPDATE") {
      const prevPathIndex = prevPaths.indexOf(vocaPath.split("Voca/root/")[1]);
      newPaths = [...prevPaths];
      newPaths[prevPathIndex] = newVocaPath.split("Voca/root/")[1];
    } else {
      newPaths = prevPaths.filter(
        (path) => path !== vocaPath.split("Voca/root/")[1]
      );
    }
    promises.push(operateData("SET", `Test/${testName}/paths`, newPaths));
  }
  await Promise.all(promises);
  promises = [];

  // 2. wordList 변경
  for (const testName of newFilteredTestNames) {
    promises.push(
      operateData("GET", `Test/${testName}/wordList/wordTest/waiting`)
    );
    promises.push(
      operateData("GET", `Test/${testName}/wordList/wordTest/passed`)
    );
    promises.push(
      operateData("GET", `Test/${testName}/wordList/meanTest/waiting`)
    );
    promises.push(
      operateData("GET", `Test/${testName}/wordList/meanTest/passed`)
    );
  }
  const allTestWordList = await Promise.all(promises);
  promises = [];

  for (let i = 0; i < allTestWordList.length; i++) {
    const wordListPathIndex = i % 4;
    const wordListPath = [
      "wordTest/waiting",
      "wordTest/passed",
      "meanTest/waiting",
      "meanTest/passed",
    ][wordListPathIndex];

    const testWordList = allTestWordList[i]
      ? Object.entries(allTestWordList[i])
      : null;
    if (!testWordList) continue;

    const testNameIndex = Math.floor(i / 4);
    const currentTestName = newFilteredTestNames[testNameIndex];

    for (const [key, value] of testWordList) {
      if (!value) continue;

      const { path, addressList } = value;
      if (path !== vocaPath) continue;
      if (type === "UPDATE") {
        promises.push(
          operateData(
            "SET",
            `Test/${currentTestName}/wordList/${wordListPath}/${key}/path`,
            newVocaPath
          )
        );
      } else if (type === "REMOVE") {
        promises.push(
          operateData(
            "REMOVE",
            `Test/${currentTestName}/wordList/${wordListPath}/${key}`
          )
        );
      }
    }
  }
  await Promise.all(promises);

  return "success";
};
