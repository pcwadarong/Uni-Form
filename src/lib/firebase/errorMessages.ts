export const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  // 이메일/비밀번호 관련
  "auth/email-already-in-use": "이미 가입된 이메일입니다.",
  "auth/invalid-email": "유효하지 않은 이메일 형식입니다.",
  "auth/user-not-found": "존재하지 않는 계정입니다.",
  "auth/wrong-password": "비밀번호가 올바르지 않습니다.",
  "auth/invalid-credential": "이메일 또는 비밀번호가 올바르지 않습니다.",
  "auth/weak-password": "비밀번호가 너무 약합니다.",
  "auth/missing-password": "비밀번호를 입력해주세요.",

  // 인증 흐름 제어 관련
  "auth/operation-not-allowed": "이메일 또는 Google 로그인이 현재 허용되지 않습니다.",
  "auth/network-request-failed": "네트워크 오류가 발생했습니다.",
  "auth/user-disabled": "비활성화된 계정입니다.",
  "auth/internal-error": "서버 오류가 발생했습니다.",

  // 소셜 로그인 관련
  "auth/popup-blocked": "팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.",
  "auth/popup-closed-by-user": "로그인 창이 닫혔습니다.",
  "auth/cancelled-popup-request": "이미 로그인 창이 열려 있습니다. 창을 닫고 다시 시도해주세요.",
  "auth/account-exists-with-different-credential":
    "다른 방식으로 이미 가입된 계정입니다. 기존 로그인 방식으로 시도해주세요.",
  "auth/credential-already-in-use": "이미 사용 중인 인증 정보입니다.",
};

export const getFirebaseErrorMessage = (code: string): string => {
  return FIREBASE_ERROR_MESSAGES[code] ?? `Firebase 오류: ${code}`;
};
