import type { Recruit, Survey } from '@/types';
import parseDateString from './parseDateString';

function parseId(id: string) {
  const parts = id.split('-');
  const type = parts[0];
  const dateStr = `${parts[1]}-${parts[2]}-${parts[3].substring(0, 2)}`;
  const date = new Date(dateStr);
  return { type, date };
}

export const getSelectedItems = (
  items: Survey[] | Recruit[],
  sortType: string,
) => {
  return [...items].sort((a, b) => {
    const parsedA = parseId(a.id);
    const parsedB = parseId(b.id);

    if (sortType === 'random') {
      return Math.random() - 0.5;
    } else if (
      sortType === 'point-asc' &&
      parsedA.type === 'survey' &&
      parsedB.type === 'survey'
    ) {
      const surveyA = a as Survey;
      const surveyB = b as Survey;
      const pointA = surveyA.point ?? 0;
      const pointB = surveyB.point ?? 0;
      return pointA - pointB;
    } else if (
      sortType === 'popular-asc' &&
      parsedA.type === 'survey' &&
      parsedB.type === 'survey'
    ) {
      const surveyA = a as Survey;
      const surveyB = b as Survey;
      const responsesA = surveyA.responses || [];
      const responsesB = surveyB.responses || [];
      const commentsA = surveyA.comments || [];
      const commentsB = surveyB.comments || [];

      if (responsesB.length !== responsesA.length) {
        return responsesB.length - responsesA.length;
      }
      if (commentsB.length !== commentsA.length) {
        return commentsB.length - commentsA.length;
      }
      if (parsedA.date > parsedB.date) return -1;
      if (parsedA.date < parsedB.date) return 1;

      return 0;
    } else if (sortType === 'date-desc') {
      if (parsedA.date > parsedB.date) return -1;
      if (parsedA.date < parsedB.date) return 1;
      return 0;
    } else {
      return 0;
    }
  });
};

export const onChangeSortType = (newType: string) => {
  const newSortType = newType;
  const url = new URL(window.location.href);
  url.searchParams.set('sort', newSortType);
  window.history.pushState({}, '', url.toString());
};

export const filterInProgressData = (data: Survey[] | Recruit[]) => {
  const currentTime = new Date().getTime();
  return data.filter((item) => {
    const endTime = parseDateString(item.id, item.endDate).getTime();
    return endTime > currentTime;
  });
};
