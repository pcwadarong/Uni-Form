import { Survey } from '@/types';
import parseDateString from './parseDateString';

export function filterAndSortSurveyData(
  data: Survey[],
  filterFunc: (item: Survey) => boolean,
  sortFunc: (a: Survey, b: Survey) => number,
): Survey[] {
  return data.filter(filterFunc).sort(sortFunc);
}

function parseId(id: string) {
  const parts = id.split('-');
  const dateStr = `${parts[0]}-${parts[1]}-${parts[2]}`;
  const date = new Date(dateStr);
  const num = parseInt(parts[3], 10);
  return { date, num };
}

export const getSelectedItems = (items: Survey[], sortType: string) => {
  return [...items].sort((a, b) => {
    if (sortType === 'random') {
      return Math.random() - 0.5;
    } else if (sortType === 'point-asc') {
      return b.point - a.point;
    } else if (sortType === 'popular-asc') {
      if (b.response !== a.response) {
        return b.response - a.response;
      } else if (b.comments.length !== a.comments.length) {
        return b.comments.length - a.comments.length;
      } else {
        const parsedA = parseId(a.id);
        const parsedB = parseId(b.id);
        // 날짜를 비교
        if (parsedA.date > parsedB.date) return -1;
        if (parsedA.date < parsedB.date) return 1;
        // 날짜가 같으면 숫자를 비교
        if (parsedA.num > parsedB.num) return -1;
        if (parsedA.num < parsedB.num) return 1;
        return 0;
      }
    } else if (sortType === 'date-desc') {
      const parsedA = parseId(a.id);
      const parsedB = parseId(b.id);
      // 날짜를 비교하여 최신 순으로 정렬
      if (parsedA.date > parsedB.date) return -1;
      if (parsedA.date < parsedB.date) return 1;
      // 날짜가 같으면 숫자를 비교하여 최신 순으로 정렬
      if (parsedA.num > parsedB.num) return -1;
      if (parsedA.num < parsedB.num) return 1;
      return 0;
    } else {
      return 0;
    }
  });
};

export const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newSortType = e.target.value;
  const url = new URL(window.location.href);
  url.searchParams.set('sort', newSortType);
  window.history.pushState({}, '', url.toString());
};

export const filterInProgressData = (data: Survey[]) => {
  const currentTime = new Date().getTime();
  return data.filter((item) => {
    const endTime = parseDateString(item.duration.split(' ~ ')[1]).getTime();
    return endTime > currentTime;
  });
};