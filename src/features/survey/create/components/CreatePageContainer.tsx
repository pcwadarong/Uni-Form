"use client";

import AppreciateMessage from "@/features/survey/create/components/appreciateMessage";
import CreatePageButton from "@/features/survey/create/components/buttons";
import Questions from "@/features/survey/create/components/questions";
import SurveyInfo from "@/features/survey/create/components/surveyInfo";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import { handleQuestionDragEnd } from "@/lib/utils/handleDragEnd";
import type { Question } from "@/types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

/**
 * 설문 생성 페이지의 컨테이너 컴포넌트
 * 상태 관리 및 드래그 앤 드롭 기능을 담당
 */
export function CreatePageContainer() {
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
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const timestamp = new Date().toISOString();
    const updatedQuestions = surveyInfo.questions.map((q) => ({
      ...q,
      timestamp: timestamp,
    }));
    setSurveyInfo({ questions: updatedQuestions });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [setSurveyInfo, surveyInfo.questions]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="w-full flex-1 justify-center bg-green-50 px-4 pt-8 pb-20 md:px-8 2xl:px-0 dark:bg-surface">
      <div className="m-auto flex w-full flex-col gap-5 2xl:w-350">
        <CreatePageButton />
        <SurveyInfo
          mode={editingId === 0 ? "editing" : "previewing"}
          onEditToggle={() => toggleEdit(0)}
        />
        <DragDropContext
          onDragEnd={(result) => handleQuestionDragEnd(result, surveyInfo.questions, setQuestions)}
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
                          mode={editingId === q.id ? "editing" : "previewing"}
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
}
