import { useEffect, useState } from "react";

interface Props {
  topic: string;
  onFilterChange: (filter: { point?: string; deadline: string }) => void;
}

export const CategorySelection: React.FC<Props> = ({ topic, onFilterChange }) => {
  const [selectedPoint, setSelectedPoint] = useState<string>("all");
  const [selectedDeadline, setSelectedDeadline] = useState<string>("all");

  const updateLabelClass = (type: string, value: string) => {
    const labels = document.querySelectorAll(`label[for^=${type}]`);
    labels.forEach((label) => {
      const htmlFor = (label as HTMLLabelElement).htmlFor;
      if (htmlFor === `${type}-${value}`) {
        label.classList.add("text-green-400");
      } else {
        label.classList.remove("text-green-400");
      }
    });
  };

  useEffect(() => {
    updateLabelClass("point", selectedPoint);
    updateLabelClass("deadline", selectedDeadline);

    onFilterChange({ point: selectedPoint, deadline: selectedDeadline });
  }, [selectedPoint, selectedDeadline]);

  const handleRadioSelect = (type: string, value: string) => {
    if (type === "point") {
      setSelectedPoint(value);
    } else if (type === "deadline") {
      setSelectedDeadline(value);
    }
  };

  return (
    <div className="py-6 px-10 2xl:px-6 border-[1px] border-gray-2 bg-foreground rounded-3xl 2xl:w-64 w-full text-nowrap flex-none mb-10">
      {topic === "survey" && (
        <div className="flex 2xl:flex-col gap-10 2xl:gap-4 items-center 2xl:items-start mb-6">
          <p className="font-bold w-12 flex-none">포인트</p>
          <form className="2xl:grid 2xl:grid-cols-2 flex subtitle w-full flex-wrap text-gray-4">
            {["all", "50", "100", "150", "200", "250"].map((value) => (
              <div key={`point-${value}`}>
                <label
                  htmlFor={`point-${value}`}
                  className={`hover:text-green-400 w-24 mr-6 2xl:w-fit ${selectedPoint === value ? "text-green-400" : ""}`}
                  onClick={() => handleRadioSelect("point", value)}
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
      <div className="flex 2xl:flex-col gap-10 2xl:gap-4 items-center 2xl:items-start">
        <p className="font-bold w-12 flex-none">마감기한</p>
        <form className="2xl:grid 2xl:grid-cols-2 flex subtitle w-full flex-wrap text-gray-4">
          {["all", "7", "14", "15"].map((value) => (
            <div key={`deadline-${value}`}>
              <label
                htmlFor={`deadline-${value}`}
                className={`hover:text-green-400 w-24 mr-6 2xl:w-fit ${selectedDeadline === value ? "text-green-400" : ""}`}
                onClick={() => handleRadioSelect("deadline", value)}
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
