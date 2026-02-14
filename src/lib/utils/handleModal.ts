import { useSelectedSurveyStore } from "@/features/survey/create/store/survey";

/**
 * 모달 닫기 함수
 * 선택된 항목 초기화 및 body 스크롤 복원
 */
export const closeModal = () => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(null);
  // Remove inline style so SSR/CSR don't fight over <body style="...">.
  document.body.style.overflow = "";
};
