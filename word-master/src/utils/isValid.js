export const isValidNickname = (value) => {
  if (value.length >= 2 && value.length <= 8) {
    return { valid: true, helperText: "" };
  }
  return { valid: false, helperText: "2 ~ 8자" };
};

export const isValidEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = emailPattern.test(value);
  return { valid, helperText: valid ? "" : "이메일 형식에 맞게 입력해주세요." };
};

export const isValidPassword = (value) => {
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  const valid = passwordPattern.test(value);
  return { valid, helperText: valid ? "" : "숫자/영어/특수문자 포함 8 ~ 16자" };
};
