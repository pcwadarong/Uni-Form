'use client';

import AppreciateMessage from '@/components/create/appreciateMessage';
import CreatePageButton from '@/components/create/buttons';
import Questions from '@/components/create/questions';
import SurveyInfo from '@/components/create/surveyInfo';
import { handleQuestionDragEnd } from '@/lib/utils/handleDragEnd';
import { useSurveyStore } from '@/store/survey';
import type { Question } from '@/types';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

const Create: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const { surveyInfo, setSurveyInfo } = useSurveyStore();

  const toggleEdit = (id: number) => {
    setEditingId(id);
    setIsEditing(!isEditing);
  };

  const setQuestions = (questions: Question[]) => {
    setSurveyInfo({ questions });
  };

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const timestamp = new Date().toISOString();
    const updatedQuestions = surveyInfo.questions.map((q) => ({
      ...q,
      timestamp: timestamp,
    }));
    setSurveyInfo({ questions: updatedQuestions });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setSurveyInfo, surveyInfo.questions.map]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="flex-1 w-full px-4 pt-8 pb-20 md:px-8 2xl:px-0 bg-green-light justify-center">
      <div className="w-full 2xl:w-[1400px] flex flex-col gap-5 m-auto">
        <CreatePageButton />
        <SurveyInfo
          mode={editingId === 0 ? 'editing' : 'previewing'}
          onEditToggle={() => toggleEdit(0)}
        />
        <DragDropContext
          onDragEnd={(result) =>
            handleQuestionDragEnd(result, surveyInfo.questions, setQuestions)
          }
        >
          <Droppable droppableId="questions" type="card" direction="vertical">
            {(droppableProvided) => (
              <ul
                className="flex flex-col gap-5"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                aria-label="질문 목록"
              >
                {surveyInfo.questions.map((q, index) => (
                  <Draggable
                    key={q.id.toString()}
                    draggableId={q.id.toString()}
                    index={index}
                    isDragDisabled={!isEditing}
                  >
                    {(draggableProvided) => (
                      <li
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        aria-roledescription="드래그 가능 항목"
                        aria-labelledby={`question-title-${q.id}`}
                        aria-describedby={`question-description-${q.id}`}
                      >
                        <Questions
                          key={q.id}
                          question={q}
                          isEssential={q.isEssential}
                          mode={editingId === q.id ? 'editing' : 'previewing'}
                          onEditToggle={() => toggleEdit(q.id)}
                          provided={draggableProvided}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <AppreciateMessage />
      </div>
    </div>
  );
};

export default Create;
