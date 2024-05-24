import { Survey } from '@/types';

export const getSelectedItems = (items: Survey[], sortType: string) => {
  return [...items].sort((a, b) => {
    if (sortType === '랜덤 순') {
      return Math.random() - 0.5;
    } else if (sortType === '리워드 높은 순') {
      return a.point - b.point;
    } else if (sortType === '인기 순') {
      if (b.response !== a.response) {
        return b.response - a.response;
      } else if (b.comments.length !== a.comments.length) {
        return b.comments.length - a.comments.length;
      } else {
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      }
    } else if (sortType === '최신 순') {
      return new Date(b.id).getTime() - new Date(a.id).getTime();
    } else {
      return 0;
    }
  });
};
