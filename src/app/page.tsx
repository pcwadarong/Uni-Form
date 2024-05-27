import React from 'react';
import SpecialSurveys from '@/components/main/SpecialSurvey';
import LatestComments from '@/components/main/LatestComments';
import RecentPopularSurveys from '@/components/main/RecentPopularSurveys';
import ClosingRecruits from '@/components/main/ClosingRecruits';

const Home: React.FC = () => {
  return (
    <>
      <SpecialSurveys />
      <LatestComments />
      <RecentPopularSurveys />
      <ClosingRecruits />
    </>
  );
};

export default Home;
