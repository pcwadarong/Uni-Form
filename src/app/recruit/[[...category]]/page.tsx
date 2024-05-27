'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useParams } from 'next/navigation';

import { surveyData } from '@/firebase/db/surveyData';
import { Survey } from '@/types';
import { SURVEY_CATEGORY } from '@/constants/category';

import { CategorySelection } from '@/components/survey/categorySelection';
import {
  filterInProgressData,
  getSelectedItems,
  onChangeSortType,
} from '@/utils/filterAndSortData';
import calculateDeadlineMatch from '@/utils/calculateDeadlineMatch';

import RecruitItem from '@/components/recruit/recruitItem';
import RecruitSkeleton from '@/components/recruit/recruitSkeleton';
import TuneIcon from '@mui/icons-material/Tune';
import SortSelectMini from '@/components/common/sortSelectMini';

const RecruitList = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const paramCategory = params.category || 'all';
  const selectedCategory =
    Object.keys(SURVEY_CATEGORY).find(
      (key) => SURVEY_CATEGORY[key].split('/').pop() === paramCategory,
    ) || '전체보기';

  const sortParam = searchParams.get('sort') || 'point-asc';
  const [isInProgressChecked, setIsInProgressChecked] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState('hidden');
  const [originalData, setOriginalData] = useState<Survey[]>([]);
  const [filteredData, setFilteredData] = useState<Survey[]>([]);
  const [dataList, setDataList] = useState<Survey[]>([]);

  const initializeData = useCallback(() => {
    const initialData = surveyData.filter(
      (item) => selectedCategory === '전체보기' || item.category === selectedCategory,
    );
    const sortedData = getSelectedItems(initialData, sortParam);
    setOriginalData(sortedData);
    setFilteredData(sortedData);
  }, [selectedCategory, sortParam]);

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

  const onFilterChange = ({ deadline }: { deadline: string }) => {
    const newFilteredData = originalData.filter((item) => {
      const isDeadlineMatch = calculateDeadlineMatch(item, deadline);
      return isDeadlineMatch;
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
    <section className="2xl:flex w-full 2xl:w-[1400px] gap-10 my-20 px-4 2xl:px-0">
      <div className={filterDisplay}>
        <CategorySelection topic={'recruit'} onFilterChange={onFilterChange} />
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
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="inProgress"
                id="inProgress"
                checked={isInProgressChecked}
                onChange={toggleInProgressFilter}
              />
              <label htmlFor="inProgress">진행 중인 설문만 보기</label>
            </div>
          </div>
          <SortSelectMini onChangeSortType={onChangeSortType} defaultValue={sortParam} />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
        </ul>
      </div>
    </section>
  );
};

export default RecruitList;
