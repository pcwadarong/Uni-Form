'use client';

import { useState } from 'react';
import { Survey } from '@/types';
import SpecialSurveys from '@/components/main/SpecialSurvey';
import LatestComments from '@/components/main/LatestComments';
import RecentPopularSurveys from '@/components/main/RecentPopularSurveys';
import ClosingRecruits from '@/components/main/ClosingRecruits';
import DetailModal from '@/components/detailModal/detailModal';

const Home: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Survey | null>(null);

  const openDetailModal = (item: Survey) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };
  return (
    <>
      {selectedItem && (
        <div className='className="fixed inset-0 flex items-center justify-center"'>
          <DetailModal item={selectedItem} closeModal={closeModal} />
          <div
            className="fixed top-0 left-0 w-full h-full bg-dark/70 z-40"
            aria-hidden="true"
            onClick={closeModal}
          ></div>
        </div>
      )}
      <SpecialSurveys openDetailModal={openDetailModal} />
      <LatestComments openDetailModal={openDetailModal} />
      <RecentPopularSurveys openDetailModal={openDetailModal} />
      <ClosingRecruits openDetailModal={openDetailModal} />
    </>
  );
};

export default Home;
