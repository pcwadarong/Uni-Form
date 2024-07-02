import { QuestionProps, Option, Question } from '@/types';
import { useSurveyStore } from '@/store';
import Options from '../options';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { handleOptionDragEnd } from '@/utils/handleDragEnd';
import Image from 'next/image';
import { deleteOption } from '@/utils/createPageUtils';
import isModeDisabled from '@/utils/isModeDisabled';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DropDownQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
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
          <Select disabled={isDisabled}>
            <SelectTrigger className="border-gray-2 mb-3">
              <SelectValue placeholder="답변을 선택해주세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">hi</SelectItem>
            </SelectContent>
          </Select>
        </>
      )}
    </>
  );
};

export default DropDownQuestion;
