'use client';

import DetailModal from '@/components/detailModal/detailModal';
import ClosingRecruits from '@/components/main/ClosingRecruits';
import LatestComments from '@/components/main/LatestComments';
import RecentPopularSurveys from '@/components/main/RecentPopularSurveys';
import SpecialSurveys from '@/components/main/SpecialSurvey';
import { closeModal } from '@/lib/utils/handleModal';
import { useSelectedSurveyStore } from '@/store/survey';

const Home: React.FC = () => {
  const { selectedItem } = useSelectedSurveyStore();

  return (
    <>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <DetailModal item={selectedItem} />
          <div
            className="fixed top-0 left-0 w-full h-full bg-dark/70 z-40"
            aria-hidden="true"
            onClick={closeModal}
            onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal
            }
          }}
          />
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
