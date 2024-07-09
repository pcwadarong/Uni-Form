import { QuestionProps, Option, Question } from '@/types';
import { useSurveyStore } from '@/store';
import Options from '../options';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { handleOptionDragEnd } from '@/utils/handleDragEnd';
import Image from 'next/image';
import { deleteOption } from '@/utils/createPageUtils';
import isModeDisabled from '@/utils/isModeDisabled';

const CheckboxQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const isDisabled = isModeDisabled(mode);
  const { updateQuestion } = useSurveyStore();

  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  const hasEtcOption = question.options?.some((option) => option.value === '기타');

  return (
    <>
      {mode === 'editing' ? (
        <>
          <DragDropContext
            onDragEnd={(result) =>
              handleOptionDragEnd(result, question.options || [], (updatedOptions: Option[]) => {
                handleQuestionChange({ ...question, options: updatedOptions });
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
                          >
                            <span className="cursor-move" aria-label={`${index + 1}번 질문 이동하기`}>
                              =
                            </span>
                            <label
                              htmlFor={`option-${question.id}-${option.id}`}
                              className="sr-only"
                            >
                              {index + 1}번
                            </label>
                            <input
                              type="text"
                              id={`option-${question.id}-${option.id}`}
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
                              className="flex-1 mb-2 focused_input"
                            />
                            <button
                              onClick={() =>
                                deleteOption({ question, id: option.id, handleQuestionChange })
                              }
                              disabled={question.options && question.options.length === 1}
                              aria-label={`${index + 1}번 항목 삭제`}
                            >
                              <Image
                                src={'./cancel.svg'}
                                alt="Delete option"
                                width="20"
                                height="20"
                              />
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
          <div className="flex gap-2 items-center">
            <button
              onClick={() =>
                handleQuestionChange({
                  ...question,
                  options: [
                    ...(question.options || []),
                    {
                      id: (question.options ? question.options.length : 0) + 1,
                      value: `항목 ${(question.options ? question.options.length : 0) + 1}`,
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
                  onClick={() =>
                    handleQuestionChange({
                      ...question,
                      options: [...(question.options || []), { id: -1, value: '기타' }],
                    })
                  }
                  className="rounded-full bg-gray-1 text-gray-4 py-1 px-3"
                  aria-label="'기타' 항목 추가"
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
            <label key={option.id} className="p-3 rounded-lg flex gap-2 bg-gray-1 mt-3 text-gray-3">
              <input
                type="checkbox"
                name={`question-${question.id}`}
                disabled={isDisabled}
                value={option.value}
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

export default CheckboxQuestion;
