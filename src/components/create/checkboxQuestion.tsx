import { QuestionProps, Option, Question } from '@/types';
import { useSurveyStore } from '@/store';
import AutoResizeTextarea from '../common/textarea';
import { useState, useEffect } from 'react';
import Options from './options';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { handleOptionDragEnd } from '@/utils/handleDragEnd';
import Image from 'next/image';
import QuestionSelect from './select';
import { onChangeQuestionType, deleteOption } from '@/utils/createPageUtils';

const CheckboxQuestion: React.FC<QuestionProps> = ({ question, isEditing }) => {
  const [explanation, setExplanation] = useState<string>(question.description || '');
  const { updateQuestion } = useSurveyStore();

  const handleQuestionChange = (updatedQuestion: Question) => {
    updateQuestion(question.id, updatedQuestion);
  };

  useEffect(() => {
    setExplanation(question.description || '');
  }, [question.description]);

  const hasEtcOption = question.options?.some((option) => option.value === '기타');

  return (
    <>
      {isEditing ? (
        <>
          <QuestionSelect
            value={question.type}
            onChangeQuestionType={(e) => onChangeQuestionType(e, handleQuestionChange, question)}
          />
          <div className="font-bold flex">
            <span>Q.</span>
            <input
              type="text"
              value={question.title}
              placeholder="질문 입력"
              onChange={(e) => handleQuestionChange({ ...question, title: e.target.value })}
              className="ml-1 flex-1 focused_input"
            />
          </div>

          <AutoResizeTextarea
            value={explanation}
            onChange={(e) => {
              setExplanation(e.target.value);
              handleQuestionChange({ ...question, description: e.target.value });
            }}
            className="caption"
            placeholder="설명 입력 (선택 사항)"
          />
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
                              className="flex-1 mb-2 focused_input"
                            />
                            <button
                              onClick={() =>
                                deleteOption({ question, id: option.id, handleQuestionChange })
                              }
                              disabled={question.options && question.options.length === 1}
                            >
                              <Image
                                src={'./cancel.svg'}
                                alt="no comments"
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
          <p className="font-bold">Q. {question.title || '(질문 없음)'}</p>
          <p className="caption">{question.description || ''}</p>
          {question.options?.map((option) => (
            <label key={option.id} className="p-3 rounded-lg flex gap-2 bg-gray-1 mt-3 text-gray-3">
              <input
                type="checkbox"
                name={`question-${question.id}`}
                disabled
                value={option.value}
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
