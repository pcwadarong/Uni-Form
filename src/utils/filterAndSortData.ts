import { Survey } from '@/types';

export default function filterAndSortSurveyData(
  data: Survey[],
  filterFunc: (item: Survey) => boolean,
  sortFunc: (a: Survey, b: Survey) => number,
): Survey[] {
  return data.filter(filterFunc).sort(sortFunc);
}
