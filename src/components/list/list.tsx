"use client";

import { CategorySelection } from "@/components/form/categorySelection";
import FormCardItem from "@/components/form/formCardItem";
import FormCardSkeleton from "@/components/form/formCardSkeleton";
import NoContent from "@/components/list/noContent";
import SortSelect from "@/components/list/sortSelect";
import SortSelectMini from "@/components/list/sortSelectMini";
import ToggleInProgressFilter from "@/components/list/toggleInProgressFilter";

import { fetchSurveysOrRecruitsList } from "@/lib/firebase/fetchDatas";
import { calculateDeadlineMatch } from "@/lib/utils/calculateDeadlineMatch";
import {
  filterInProgressData,
  getSelectedItems,
  onChangeSortType,
} from "@/lib/utils/filterAndSortData";

import type { Form } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

import FilterIcon from "../svg/filter";

interface Props {
  topic: "survey" | "recruit";
  category: string | string[];
}

const List: React.FC<Props> = ({ topic, category }) => {
  const searchParams = useSearchParams();

  const sortParam = searchParams.get("sort") || "random";
  const [isInProgressChecked, setIsInProgressChecked] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState<"hidden" | "block">("hidden");
  const [originalData, setOriginalData] = useState<Form[]>([]);
  const [filteredData, setFilteredData] = useState<Form[]>([]);
  const [dataList, setDataList] = useState<Form[]>([]);

  const { data: initialData } = useSuspenseQuery({
    queryKey: ["list", topic],
    queryFn: () => fetchSurveysOrRecruitsList(topic, "public"),
  });

  const categorizeData = useCallback(() => {
    const categorizedData = initialData.filter((item) => {
      return category === "all" || item.category === category;
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

  const onFilterChange = ({
    point = "all",
    deadline,
  }: {
    point?: string;
    deadline: string;
  }) => {
    const newFilteredData = originalData.filter((item) => {
      const itemPoint = item.point;
      const isPointMatch =
        itemPoint !== undefined ? point === "all" || itemPoint >= Number.parseInt(point, 10) : true;
      const isDeadlineMatch = calculateDeadlineMatch(item, deadline);

      return isPointMatch && isDeadlineMatch;
    });

    setFilteredData(newFilteredData);
    setDataList(isInProgressChecked ? filterInProgressData(newFilteredData) : newFilteredData);
  };

  const handleCategoryToggle = () => {
    setFilterDisplay((prev) => (prev === "block" ? "hidden" : "block"));
  };

  const toggleInProgressFilter = () => {
    setIsInProgressChecked((prev) => !prev);
  };


  return (
    <>
      <section className="2xl:flex w-full 2xl:w-[1400px] gap-10 my-20 px-4 2xl:px-0">
        <div className={filterDisplay}>
          <CategorySelection topic={topic} onFilterChange={onFilterChange} />
        </div>
        <div className="grow">
          <div className="flex justify-between items-center px-3 pb-6 2xl:pt-0">
            <div className="flex gap-6">
              <button
                type="button"
                className="bg-green-500 flex items-center gap-[2.5px] text-white p-2 rounded-md"
                onClick={handleCategoryToggle}
              >
                <FilterIcon width={20} height={20} aria-label="filter icon" />
                <span>필터</span>
                <span className="hidden md:inline">
                  {filterDisplay === "block" ? "닫기" : "열기"}
                </span>
              </button>
              <ToggleInProgressFilter
                checked={isInProgressChecked}
                onChange={toggleInProgressFilter}
              />
            </div>
            {topic === "survey" ? (
              <SortSelect onChangeSortType={onChangeSortType} defaultValue={sortParam} />
            ) : (
              <SortSelectMini onChangeSortType={onChangeSortType} />
            )}
          </div>
          {dataList.length === 0 ? (
            <NoContent />
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <Suspense fallback={<FormCardSkeleton type={topic} />}>
                {dataList.map((item) => (
                  <FormCardItem type={topic} key={item.id} item={item} />
                ))}
              </Suspense>
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default List;
