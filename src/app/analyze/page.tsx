'use client';

import { decrypt } from '@/utils/crypotoUtils';
import { usePathname } from 'next/navigation';
//import SurveyInfo from '@/components/create/surveyInfo';
//import { useSuspenseQuery } from '@tanstack/react-query';
//import { fetchDetail } from '@/firebase/fetchDatas';
//import { useSurveyStore } from '@/store/survey';
//import { useEffect } from 'react';
//import Questions from '@/components/create/questions';

const AnalyzePage = () => {
  const pathname = usePathname();
  const encryptedId = pathname.replace('/analyze/', '');
  const itemId = encryptedId ? decrypt(encryptedId) : '';
  return <div>Analyze Page for Item ID: {itemId}</div>;
};

export default AnalyzePage;
