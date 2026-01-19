import { useCallback, useEffect, useState } from "react";

interface Props {
  topic: string;
  onFilterChange: (filter: { point?: string; deadline: string }) => void;
}

export const CategorySelection: React.FC<Props> = ({ topic, onFilterChange }) => {
  const [selectedPoint, setSelectedPoint] = useState<string>("all");
  const [selectedDeadline, setSelectedDeadline] = useState<string>("all");

  const updateLabelClass = useCallback((type: string, value: string) => {
    const labels = document.querySelectorAll(`label[for^=${type}]`);
    for (const label of labels) {
      const htmlFor = (label as HTMLLabelElement).htmlFor;
      if (htmlFor === `${type}-${value}`) {
        label.classList.add("text-green-400");
      } else {
        label.classList.remove("text-green-400");
      }
    }
  }, []);

  useEffect(() => {
    updateLabelClass("point", selectedPoint);
    updateLabelClass("deadline", selectedDeadline);

    onFilterChange({ point: selectedPoint, deadline: selectedDeadline });
  }, [selectedPoint, selectedDeadline, onFilterChange, updateLabelClass]);

  const handleRadioSelect = (type: string, value: string) => {
    if (type === "point") {
      setSelectedPoint(value);
    } else if (type === "deadline") {
      setSelectedDeadline(value);
    }
  };

  return (
    <div className="mb-10 w-full flex-none text-nowrap rounded-3xl border border-gray-2 bg-content px-10 py-6 2xl:w-64 2xl:px-6">
      {topic === "survey" && (
        <div className="mb-6 flex items-center gap-10 2xl:flex-col 2xl:items-start 2xl:gap-4">
          <p className="w-12 flex-none font-bold">포인트</p>
          <form className="subtitle flex w-full flex-wrap text-gray-4 2xl:grid 2xl:grid-cols-2">
            {["all", "50", "100", "150", "200", "250"].map((value) => (
              <div key={`point-${value}`}>
                <label
                  htmlFor={`point-${value}`}
                  className={`mr-6 w-24 hover:text-green-400 2xl:w-fit ${
                    selectedPoint === value ? "text-green-400" : ""
                  }`}
                  onClick={() => handleRadioSelect("point", value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRadioSelect("point", value);
                    }
                  }}
                  aria-label={value === "all" ? "전체 보기" : `${value}포인트 이상`}
                >
                  {value === "all" ? "전체 보기" : `${value}P 이상`}
                </label>
                <input type="radio" name="point" id={`point-${value}`} className="hidden" />
              </div>
            ))}
          </form>
        </div>
      )}
      <div className="flex items-center gap-10 2xl:flex-col 2xl:items-start 2xl:gap-4">
        <p className="w-12 flex-none font-bold">마감기한</p>
        <form className="subtitle flex w-full flex-wrap text-gray-4 2xl:grid 2xl:grid-cols-2">
          {["all", "7", "14", "15"].map((value) => (
            <div key={`deadline-${value}`}>
              <label
                htmlFor={`deadline-${value}`}
                className={`mr-6 w-24 hover:text-green-400 2xl:w-fit ${
                  selectedDeadline === value ? "text-green-400" : ""
                }`}
                onClick={() => handleRadioSelect("deadline", value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRadioSelect("deadline", value);
                  }
                }}
                aria-label={
                  value === "all" ? "전체 보기" : `${value}일 이${value === "15" ? "상" : "내"}`
                }
              >
                {value === "all" ? "전체 보기" : `${value}일 이${value === "15" ? "상" : "내"}`}
              </label>
              <input type="radio" name="deadline" id={`deadline-${value}`} className="hidden" />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};
