import { useSelectedSurveyStore } from "@/features/survey/create/store/survey";

export const closeModal = () => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(null);
  document.body.style.overflow = "auto";
};
