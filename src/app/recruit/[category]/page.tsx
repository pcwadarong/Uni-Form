'use client';

import { useParams } from 'next/navigation';
import CommonList from '@/components/list/commonList';

const RecruitList = () => {
  const params = useParams();
  const paramCategory = params.category || 'all';
  return <CommonList topic={'recruit'} category={paramCategory} />;
};

export default RecruitList;
