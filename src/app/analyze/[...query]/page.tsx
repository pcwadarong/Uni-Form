'use client';

import { decrypt } from '@/lib/utils/crypotoUtils';
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
  return (
    <>
      <div>분석페이지 for Item ID: {itemId}</div>
      <p>분석 예정입니다.</p>
      <p>작업중!</p>
      <div>
        <p>댓글 목록</p>
        <div>
          <input type="text" name="" id="" />
          <button type="button">댓글 달기</button>
        </div>
      </div>
    </>
  );
};

export default AnalyzePage;
