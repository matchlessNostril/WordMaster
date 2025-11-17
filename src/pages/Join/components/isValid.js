export const isValidNickname = (value) => {
  if (value.length >= 2 && value.length <= 8) {
    return { valid: true, helperText: "" };
  }
  return { valid: false, helperText: "2 ~ 8文字" };
};

export const isValidEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = emailPattern.test(value);
  return {
    valid,
    helperText: valid ? "" : "メールアドレス形式に従って入力してください。",
  };
};

export const isValidPassword = (value) => {
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  const valid = passwordPattern.test(value);
  return { valid, helperText: valid ? "" : "数字/英字/記号 8 ~ 16文字" };
};
