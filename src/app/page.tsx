'use client';

import { useSurveyStore } from '@/store';
import { closeModal } from '@/utils/handleModal';
import SpecialSurveys from '@/components/main/SpecialSurvey';
import LatestComments from '@/components/main/LatestComments';
import RecentPopularSurveys from '@/components/main/RecentPopularSurveys';
import ClosingRecruits from '@/components/main/ClosingRecruits';
import DetailModal from '@/components/detailModal/detailModal';

const Home: React.FC = () => {
  const { selectedItem } = useSurveyStore();

  return (
    <>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <DetailModal item={selectedItem} />
          <div
            className="fixed top-0 left-0 w-full h-full bg-dark/70 z-40"
            aria-hidden="true"
            onClick={closeModal}
          ></div>
        </div>
      )}
      <SpecialSurveys />
      <LatestComments />
      <RecentPopularSurveys />
      <ClosingRecruits />
    </>
  );
};

export default Home;
