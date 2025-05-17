import { useSelectedSurveyStore } from "@/store/survey";
import type { Recruit, Survey } from "@/types";

export const openDetailModal = (item: Survey | Recruit) => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(item);
  document.body.style.overflow = "hidden";
};

export const closeModal = () => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(null);
  document.body.style.overflow = "auto";
};

export const handleEnterKeyPress =
  (item: Survey | Recruit) => (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Enter") {
      openDetailModal(item);
    }
  };
