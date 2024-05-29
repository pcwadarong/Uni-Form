'use client';

import { useParams } from 'next/navigation';
import { SURVEY_CATEGORY } from '@/constants/category';
import CommonList from '@/components/list/commonList';

const SurveyList = () => {
  const params = useParams();
  const paramCategory = params.category || 'all';
  const selectedCategory =
    Object.keys(SURVEY_CATEGORY).find(
      (key) => SURVEY_CATEGORY[key].split('/').pop() === paramCategory,
    ) || '전체보기';

  return <CommonList topic={'survey'} category={selectedCategory} />;
};

export default SurveyList;
