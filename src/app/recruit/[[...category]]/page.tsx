'use client';

import { useParams } from 'next/navigation';
import { RECRUIT_CATEGORY } from '@/constants/category';
import CommonList from '@/components/list/commonList';

const RecruitList = () => {
  const params = useParams();
  const paramCategory = params.category || 'all';
  const selectedCategory =
    Object.keys(RECRUIT_CATEGORY).find(
      (key) => RECRUIT_CATEGORY[key].split('/').pop() === paramCategory,
    ) || '전체보기';

  return <CommonList topic={'recruit'} category={selectedCategory} />;
};

export default RecruitList;
