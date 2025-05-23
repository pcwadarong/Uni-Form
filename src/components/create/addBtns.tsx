import { useSurveyStore } from "@/store/survey";
import type { Question } from "@/types/types";

const AddBtns = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();

  const basicData: Question = {
    id: surveyInfo.questions.length ? Math.max(...surveyInfo.questions.map((q) => q.id)) + 1 : 1,
    type: "checkbox",
    timestamp: new Date().toISOString(),
    title: "",
    isEssential: true,
    options: [
      { id: 1, value: "" },
      { id: 2, value: "" },
    ],
  };

  const addQuestion = () => {
    const updatedQuestions = [...surveyInfo.questions, basicData];
    setSurveyInfo({ questions: updatedQuestions });
  };

  return (
    <div className="border-t-[1px] border-gray-2 flex h-14 items-center">
      <button
        onClick={addQuestion}
        className="flex-1 border-r-[1px] border-gray-2"
        aria-label="항목 추가"
      >
        + 항목 추가
      </button>
      <button className="flex-1" aria-label="페이지 추가">
        + 페이지 추가
      </button>
    </div>
  );
};

export default AddBtns;
