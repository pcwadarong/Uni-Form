'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSurveysOrRecruitsList } from '@/firebase/fetchDatas';
import { useSelectedSurveyStore } from '@/store/survey';
import { Survey, Recruit } from '@/types';
import RecruitItem from '../recruit/recruitItem';
import { CategorySelection } from '@/components/survey/categorySelection';
import {
  filterInProgressData,
  getSelectedItems,
  onChangeSortType,
} from '@/utils/filterAndSortData';
import { calculateDeadlineMatch } from '@/utils/calculateDeadlineMatch';
import ToggleInProgressFilter from './toggleInProgressFilter';
import SurveyItem from '@/components/survey/surveyItem';
import SurveySkeleton from '@/components/survey/surveySkeleton';
import SortSelect from '@/components/list/sortSelect';
import SortSelectMini from './sortSelectMini';
import DetailModal from '@/components/detailModal/detailModal';
import { closeModal } from '@/utils/handleModal';
import RecruitSkeleton from '../recruit/recruitSkeleton';
import FilterIcon from '../svg/filter';
import NoContent from './noContent';

interface Props {
  topic: 'survey' | 'recruit';
  category: string | string[];
}

const CommonList: React.FC<Props> = ({ topic, category }) => {
  const { selectedItem } = useSelectedSurveyStore();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get('sort') || 'random';
  const [isInProgressChecked, setIsInProgressChecked] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState<'hidden' | 'block'>('hidden');
  const [originalData, setOriginalData] = useState<Survey[] | Recruit[]>([]);
  const [filteredData, setFilteredData] = useState<Survey[] | Recruit[]>([]);
  const [dataList, setDataList] = useState<Survey[] | Recruit[]>([]);

  const { data: initialData } = useSuspenseQuery({
    queryKey: ['list', topic],
    queryFn: () => fetchSurveysOrRecruitsList(topic, 'public'),
  });

  const categorizeData = useCallback(() => {
    const categorizedData = initialData.filter((item) => {
      return category === 'all' || item.category === category;
    });
    const sortedData = getSelectedItems(categorizedData, sortParam);
    setOriginalData(sortedData);
    setFilteredData(sortedData);
  }, [category, sortParam, initialData]);

  useEffect(() => {
    categorizeData();
  }, [categorizeData]);

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
      const itemPoint = (item as Survey).point;
      const isPointMatch =
        itemPoint !== undefined ? point === 'all' || itemPoint >= parseInt(point, 10) : true;
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

  const closeModalAndResetFilters = () => {
    setIsInProgressChecked(false);
    setFilterDisplay('hidden');
    closeModal();
  };

  return (
    <>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <DetailModal item={selectedItem} />
          <div
            className="fixed top-0 left-0 w-full h-full bg-dark/70 z-40"
            aria-hidden="true"
            onClick={closeModalAndResetFilters}
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
                className="bg-font flex items-center gap-[2.5px] text-white p-2 rounded-md"
                onClick={handleCategoryToggle}
              >
                <FilterIcon width={20} height={20} aria-label="filter icon" />
                <span>필터</span>
                <span className="hidden md:inline">
                  {filterDisplay === 'block' ? '닫기' : '열기'}
                </span>
              </button>
              <ToggleInProgressFilter
                checked={isInProgressChecked}
                onChange={toggleInProgressFilter}
              />
            </div>
            {topic === 'survey' ? (
              <SortSelect onChangeSortType={onChangeSortType} defaultValue={sortParam} />
            ) : (
              <SortSelectMini onChangeSortType={onChangeSortType} />
            )}
          </div>
          {dataList.length === 0 ? (
            <NoContent />
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <Suspense
                fallback={
                  topic === 'survey' ? (
                    <>
                      <SurveySkeleton />
                      <SurveySkeleton />
                      <SurveySkeleton />
                      <SurveySkeleton />
                    </>
                  ) : (
                    <>
                      <RecruitSkeleton />
                      <RecruitSkeleton />
                      <RecruitSkeleton />
                      <RecruitSkeleton />
                    </>
                  )
                }
              >
                {dataList.map((item) =>
                  topic === 'survey' ? (
                    <SurveyItem key={item.id} item={item as Survey} />
                  ) : (
                    <RecruitItem key={item.id} item={item as Recruit} />
                  ),
                )}
              </Suspense>
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default CommonList;
