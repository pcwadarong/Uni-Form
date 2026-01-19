"use client";

import { useSurveyStore } from "@/store/survey";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CheckModal from "./checkModal";

const CreatePageButton = () => {
  const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPath = usePathname();
  const { surveyInfo } = useSurveyStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowToggleMenu(false);
    }
  }, []);

  const handleOpenPreview = () => {
    window.open(`${currentPath}/preview`, "_blank", "noopener,noreferrer");
    localStorage.setItem("survey 1", JSON.stringify(surveyInfo));
  };

  const handleSaveDraft = () => {
    toast("아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.");
  };

  const handleValidate = () => {
    const validateSurveyInfo = (): boolean => {
      if (!surveyInfo.title) {
        toast("설문 제목을 입력해 주세요.");
        return false;
      }

      const incompleteQuestions = surveyInfo.questions.filter((q) => !q.title);
      if (incompleteQuestions.length > 0) {
        toast("모든 질문의 제목을 입력해 주세요.");
        return false;
      }
      return true;
    };

    if (validateSurveyInfo()) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const handleDuplicate = () => {
    toast("아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.");
  };

  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      router.push("/");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="subtitle flex items-center justify-end gap-2">
      <button type="button" className="rounded-md bg-tone1 px-3 py-1" onClick={handleOpenPreview}>
        미리보기
      </button>
      <button type="button" className="rounded-md bg-tone1 px-3 py-1" onClick={handleSaveDraft}>
        임시저장
      </button>
      <button
        type="button"
        className="rounded-md bg-green-400 px-3 py-1 text-white"
        aria-label="저장하기"
        onClick={handleValidate}
      >
        저장
      </button>
      <div className="relative flex items-center" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowToggleMenu((prev) => !prev)}
          aria-label="사용자 메뉴 토글"
          aria-expanded={showToggleMenu}
        >
          <Image src={"/meatball.svg"} alt="meatball menu icon" width="20" height="20" />
        </button>
        {showToggleMenu && (
          <div
            className="absolute top-10 right-0 flex flex-col overflow-hidden rounded-lg bg-content text-center shadow-md"
            aria-labelledby="menu-button"
          >
            <button
              type="button"
              className="text-nowrap rounded-md px-3 py-2 hover:bg-gray-2"
              onClick={handleDuplicate}
            >
              복제하기
            </button>
            <button
              type="button"
              className="rounded-md px-3 py-2 text-red-500 hover:bg-gray-2"
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
      {showModal && <CheckModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CreatePageButton;
