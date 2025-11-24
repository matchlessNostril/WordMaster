export const isValidNickname = (value) => {
  if (value.length >= 2 && value.length <= 8) {
    return { valid: true, helperText: "" };
  }
  return {
    valid: false,
    helperText: "2〜8文字で入力してください。",
  };
};

export const isValidEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = emailPattern.test(value);
  return {
    valid,
    helperText: valid ? "" : "メールアドレスの形式で入力してください。",
  };
};

export const isValidPassword = (value) => {
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  const valid = passwordPattern.test(value);
  return {
    valid,
    helperText: valid ? "" : `英数字と記号で、8〜15文字で入力してください。`,
  };
};
