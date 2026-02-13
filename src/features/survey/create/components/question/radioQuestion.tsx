import SVGIcon from "@/features/shared/icons/icons";
import Options from "@/features/survey/create/components/options";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import { deleteOption } from "@/lib/utils/createPageUtils";
import { handleOptionDragEnd } from "@/lib/utils/handleDragEnd";
import isModeDisabled from "@/lib/utils/isModeDisabled";
import type { Option, Question, QuestionProps } from "@/types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const RadioQuestion: React.FC<QuestionProps> = ({ question, mode, onResponseChange }) => {
  const isDisabled = isModeDisabled(mode);
  const { updateQuestion } = useSurveyStore();

  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  const hasEtcOption = question.options?.some((option) => option.value === "기타");

  const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onResponseChange) {
      onResponseChange(e.target.value);
    }
  };

  return (
    <>
      {mode === "editing" ? (
        <>
          <DragDropContext
            onDragEnd={(result) =>
              handleOptionDragEnd(result, question.options || [], (updatedOptions: Option[]) => {
                handleQuestionChange({
                  ...question,
                  options: updatedOptions,
                });
              })
            }
          >
            <Droppable droppableId={`droppable-${question.id}`} type="option" direction="vertical">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {(question.options || [])
                    .sort((a, b) => (a.id === -1 ? 1 : b.id === -1 ? -1 : 0))
                    .map((option, index) => (
                      <Draggable
                        key={option.id.toString()}
                        draggableId={`draggable-${question.id}-${option.id}`}
                        index={index}
                      >
                        {(draggableProvided) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className="flex gap-2"
                            aria-label={`항목 ${index + 1} 드래그 가능`}
                          >
                            <span className="cursor-move">=</span>
                            <input
                              type="text"
                              value={option.value}
                              placeholder={`항목 ${index}`}
                              onChange={(e) =>
                                handleQuestionChange({
                                  ...question,
                                  options: question.options?.map((opt, i) =>
                                    i === index ? { ...opt, value: e.target.value } : opt,
                                  ),
                                })
                              }
                              className="focused_input mb-2 flex-1"
                              aria-label={`항목 ${index + 1} 텍스트 입력`}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                deleteOption({
                                  question,
                                  id: option.id,
                                  handleQuestionChange,
                                })
                              }
                              disabled={question.options && question.options.length === 1}
                              aria-label={`항목 ${index + 1} 삭제`}
                            >
                              <SVGIcon name="CancelIcon" title={`항목 ${index + 1} 삭제`} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                handleQuestionChange({
                  ...question,
                  options: [
                    ...(question.options || []),
                    {
                      id: (question.options ? question.options.length : 0) + 1,
                      value: "",
                    },
                  ],
                })
              }
              aria-label="항목 추가"
            >
              항목 추가
            </button>
            {!hasEtcOption && (
              <>
                <span>또는</span>
                <button
                  type="button"
                  onClick={() =>
                    handleQuestionChange({
                      ...question,
                      options: [...(question.options || []), { id: -1, value: "기타" }],
                    })
                  }
                  className="rounded-full bg-gray-1 px-3 py-1 text-gray-4"
                  aria-label="'기타' 추가"
                >
                  '기타' 추가
                </button>
              </>
            )}
          </div>
          <Options id={question.id} />
        </>
      ) : (
        <>
          {question.options?.map((option) => (
            <label key={option.id} className="mt-3 flex gap-2 rounded-lg bg-gray-1 p-3 text-gray-3">
              <input
                type="radio"
                name={`question-${question.id}`}
                disabled={isDisabled}
                value={option.value}
                onChange={handleResponseChange}
                aria-label={option.value}
              />
              {option.value}
            </label>
          ))}
        </>
      )}
    </>
  );
};

export default RadioQuestion;
