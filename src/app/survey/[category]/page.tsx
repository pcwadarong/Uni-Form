'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { CategorySelection } from '@/components/survey/categorySelection';
import { surveyData } from '@/firebase/db/surveyData';
import { SURVEY_CATEGORY } from '@/constants/category';
import filterAndSortSurveyData from '@/utils/filterAndSortData';
import { getSelectedItems } from '@/utils/getSelectedItems';
import SurveyItem from '@/components/survey/surveyItem';
import SurveySkeleton from '@/components/survey/surveySkeleton';
import TuneIcon from '@mui/icons-material/Tune';
import SortSelect from '@/components/common/sortSelect';
import parseDateString from '@/utils/parseDateString';
import { Survey } from '@/types';

const SurveyList = () => {
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
  const [finalData, setFinalData] = useState<Survey[]>(surveyData);

  const getFilteredSortedData = () => {
    const initialData = filterAndSortSurveyData(
      surveyData,
      (item) => selectedCategory === '전체보기' || item.category === selectedCategory,
      (a, b) => b.point - a.point,
    );

    if (isInProgressChecked) {
      const currentTime = new Date().getTime();
      const filteredInProgressData = initialData.filter((item) => {
        const endTime = new Date(item.duration.split(' ~ ')[1]).getTime();
        return endTime > currentTime;
      });
      return getSelectedItems(filteredInProgressData, sortParam);
    }

    return getSelectedItems(initialData, sortParam);
  };

  useEffect(() => {
    setFinalData(getFilteredSortedData());
  }, [sortParam, selectedCategory, isInProgressChecked]);

  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortType = e.target.value;
    const url = new URL(window.location.href);
    url.searchParams.set('sort', newSortType);
    window.history.pushState({}, '', url.toString());
  };

  const toggleInProgressFilter = () => {
    setIsInProgressChecked((prev) => !prev);
  };

  const toggleFilterDisplay = () => {
    setFilterDisplay((prev) => (prev === 'block' ? 'hidden' : 'block'));
  };

  const handleCategoryToggle = () => {
    toggleFilterDisplay();
  };

  const onFilterChange = ({ point, deadline }: { point: string; deadline: string }) => {
    const filteredData = surveyData.filter((item) => {
      const isPointMatch = point === 'all' || item.point >= parseInt(point);

      const endDate = parseDateString(item.duration.split(' ~ ')[1]);
      const currentDate = new Date();
      const diffTime = endDate.getTime() - currentDate.getTime();
      const date = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const isDeadlineMatch =
        deadline === 'all' ||
        (deadline !== '15' && date <= parseInt(deadline) && date >= 0) ||
        (deadline === '15' && date >= parseInt(deadline));
      return isPointMatch && isDeadlineMatch;
    });
    setFinalData(filteredData);
  };

  return (
    <section className="2xl:flex w-full 2xl:w-[1400px] gap-10 mt-20">
      <div className={filterDisplay}>
        <CategorySelection topic={'survey'} onFilterChange={onFilterChange} />
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
          <SortSelect onChangeSortType={onChangeSortType} defaultValue={sortParam} />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
            {finalData.map((item) => (
              <SurveyItem key={item.id} item={item} />
            ))}
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default SurveyList;
