export const validateSignInput = (type: string, value: string) => {
  let isValid = false;
  switch (type) {
    case 'nickname':
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,6}$/;
      isValid = nicknameRegex.test(value);
      break;
    case 'password':
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;
      isValid = passwordRegex.test(value);
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      break;
    default:
      break;
  }
  return isValid;
};
