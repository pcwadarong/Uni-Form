import { useSelectedSurveyStore } from "@/store/survey";
import type { Form } from "@/types";

export const openDetailModal = (item: Form) => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(item);
  document.body.style.overflow = "hidden";
};

export const closeModal = () => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(null);
  document.body.style.overflow = "auto";
};

export const handleEnterKeyPress = (item: Form) => (event: React.KeyboardEvent<HTMLLIElement>) => {
  if (event.key === "Enter") {
    openDetailModal(item);
  }
};
