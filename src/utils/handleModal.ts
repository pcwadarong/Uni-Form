import { useSelectedSurveyStore } from '@/store';
import { Survey } from '@/types';

export const openDetailModal = (item: Survey) => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(item);
  document.body.style.overflow = 'hidden';
};

export const closeModal = () => {
  const setSelectedItem = useSelectedSurveyStore.getState().setSelectedItem;
  setSelectedItem(null);
  document.body.style.overflow = 'auto';
};
