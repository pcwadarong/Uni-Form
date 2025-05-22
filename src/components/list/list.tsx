"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CategorySelection } from "@/components/form/categorySelection";
import FormCardItem from "@/components/form/formCardItem";
import NoContent from "@/components/list/noContent";
import SortSelect from "@/components/list/sortSelect";
import ToggleInProgressFilter from "@/components/list/toggleInProgressFilter";

import { calculateDeadlineMatch } from "@/lib/utils/calculateDeadlineMatch";
import { getSelectedItems } from "@/lib/utils/filterAndSortData";
import type { Form } from "@/types";
import FilterIcon from "../svg/filter";

interface Props {
  initialData: Form[];
  topic: "survey" | "recruit";
  category: string;
  sort: string;
}

const List = ({ initialData, topic, category, sort }: Props) => {
  const [isInProgressChecked, setIsInProgressChecked] = useState(false);
  const [filterDisplay, setFilterDisplay] = useState<"hidden" | "block">("hidden");
  const [filteredData, setFilteredData] = useState<Form[]>([]);
  const [finalData, setFinalData] = useState<Form[]>([]);

  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || sort;

  const applyCategoryAndSort = useCallback(() => {
    const filtered = initialData.filter((item) => category === "all" || item.category === category);
    const sorted = getSelectedItems(filtered, currentSort);
    setFilteredData(sorted);
  }, [category, initialData, currentSort]);

  useEffect(() => {
    applyCategoryAndSort();
  }, [applyCategoryAndSort]);

  useEffect(() => {
    const updatedData = isInProgressChecked
      ? filteredData.filter((item) => item.endDate >= Date.now())
      : filteredData;
    setFinalData(updatedData);
  }, [isInProgressChecked, filteredData]);

  const onFilterChange = ({
    point = "all",
    deadline,
  }: {
    point?: string;
    deadline: string;
  }) => {
    const filtered = filteredData.filter((item) => {
      const pointMatch =
        item.point !== undefined ? point === "all" || item.point >= Number(point) : true;
      const deadlineMatch = calculateDeadlineMatch(item.endDate, deadline);
      return pointMatch && deadlineMatch;
    });

    const updated = isInProgressChecked
      ? filtered.filter((item) => item.endDate >= Date.now())
      : filtered;

    setFinalData(updated);
  };

  const handleCategoryToggle = () => {
    setFilterDisplay((prev) => (prev === "block" ? "hidden" : "block"));
  };

  const toggleInProgressFilter = () => {
    setIsInProgressChecked((prev) => !prev);
  };

  return (
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
          {topic === "survey" ? <SortSelect defaultValue="popular-asc" /> : <SortSelect variant="mini" />}
        </div>
        {finalData.length === 0 ? (
          <NoContent />
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {finalData.map((item) => (
              <FormCardItem type={topic} key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default List;
