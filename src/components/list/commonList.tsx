'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelectedSurveyStore } from '@/store';
import { surveyData } from '@/firebase/db/surveyData';
import { Survey } from '@/types';
import RecruitItem from '../recruit/recruitItem';
import Image from 'next/image';

import { CategorySelection } from '@/components/survey/categorySelection';
import {
  filterInProgressData,
  getSelectedItems,
  onChangeSortType,
} from '@/utils/filterAndSortData';
import calculateDeadlineMatch from '@/utils/calculateDeadlineMatch';

import ToggleInProgressFilter from './toggleInProgressFilter';
import SurveyItem from '@/components/survey/surveyItem';
import SurveySkeleton from '@/components/survey/surveySkeleton';
import TuneIcon from '@mui/icons-material/Tune';
import SortSelect from '@/components/list/sortSelect';
import DetailModal from '@/components/detailModal/detailModal';
import { closeModal } from '@/utils/handleModal';
import RecruitSkeleton from '../recruit/recruitSkeleton';

interface Props {
  topic: string;
  category: string;
}

const CommonList = ({ topic, category }: Props) => {
  const { selectedItem } = useSelectedSurveyStore();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get('sort') || 'point-asc';
  const [isInProgressChecked, setIsInProgressChecked] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState('hidden');
  const [originalData, setOriginalData] = useState<Survey[]>([]);
  const [filteredData, setFilteredData] = useState<Survey[]>([]);
  const [dataList, setDataList] = useState<Survey[]>([]);

  const initializeData = useCallback(() => {
    const initialData = surveyData.filter(
      (item) => category === '전체보기' || item.category === category,
    );
    const sortedData = getSelectedItems(initialData, sortParam);
    setOriginalData(sortedData);
    setFilteredData(sortedData);
  }, [category, sortParam]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    const applyFilters = () => {
      let updatedData = [...filteredData];
      if (isInProgressChecked) {
        updatedData = filterInProgressData(updatedData);
      }
      setDataList(updatedData);
    };

    applyFilters();
  }, [isInProgressChecked, filteredData]);

  const onFilterChange = ({ point = 'all', deadline }: { point?: string; deadline: string }) => {
    const newFilteredData = originalData.filter((item) => {
      const isPointMatch = point === 'all' || item.point >= parseInt(point);
      const isDeadlineMatch = calculateDeadlineMatch(item, deadline);
      return isPointMatch && isDeadlineMatch;
    });

    setFilteredData(newFilteredData);
    setDataList(isInProgressChecked ? filterInProgressData(newFilteredData) : newFilteredData);
  };
  const handleCategoryToggle = () => {
    setFilterDisplay((prev) => (prev === 'block' ? 'hidden' : 'block'));
  };

  const toggleInProgressFilter = () => {
    setIsInProgressChecked((prev) => !prev);
  };

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
      <section className="2xl:flex w-full 2xl:w-[1400px] gap-10 my-20 px-4 2xl:px-0">
        <div className={filterDisplay}>
          <CategorySelection topic={topic} onFilterChange={onFilterChange} />
        </div>
        <div className="grow">
          <div className="flex justify-between items-center px-3 pb-6 2xl:pt-0">
            <div className="flex gap-6">
              <button
                className="bg-font text-white py-2 px-3 rounded-md"
                onClick={handleCategoryToggle}
              >
                <TuneIcon /> {filterDisplay === 'block' ? '필터 닫기' : '필터 열기'}
              </button>
              <ToggleInProgressFilter
                checked={isInProgressChecked}
                onChange={toggleInProgressFilter}
              />
            </div>
            <SortSelect onChangeSortType={onChangeSortType} defaultValue={sortParam} />
          </div>
          {dataList.length === 0 && (
            <div className="flex flex-col items-center text-gray-500 mt-10">
              <Image src={'./bubble-chat.svg'} alt="no comments" width="80" height="78" />
              <p>해당하는 설문이 없습니다. 다른 조건으로 검색해보세요.</p>
            </div>
          )}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {topic === 'survey' ? (
              <Suspense
                fallback={
                  <>
                    <SurveySkeleton />
                    <SurveySkeleton />
                    <SurveySkeleton />
                    <SurveySkeleton />
                  </>
                }
              >
                {dataList.map((item) => (
                  <SurveyItem key={item.id} item={item} />
                ))}
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <>
                    <RecruitSkeleton />
                    <RecruitSkeleton />
                    <RecruitSkeleton />
                    <RecruitSkeleton />
                  </>
                }
              >
                {dataList.map((item) => (
                  <RecruitItem key={item.id} item={item} />
                ))}
              </Suspense>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default CommonList;
