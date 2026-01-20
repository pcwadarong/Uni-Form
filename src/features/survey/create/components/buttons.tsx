"use client";

import SVGIcon from "@/features/shared/icons/icons";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CheckModal from "./checkModal";

/**
 * 설문 생성 페이지 버튼 컴포넌트
 * 미리보기, 임시저장, 저장, 복제, 삭제 기능 제공
 */
const CreatePageButton = () => {
  const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPath = usePathname();
  const { surveyInfo } = useSurveyStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  /**
   * 외부 클릭 감지 핸들러
   * 메뉴 외부 클릭 시 메뉴 닫기
   * @param event - 마우스 이벤트
   */
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowToggleMenu(false);
    }
  }, []);

  /**
   * 미리보기 열기 핸들러
   * 새 창에서 미리보기 페이지 열기
   */
  const handleOpenPreview = useCallback(() => {
    window.open(`${currentPath}/preview`, "_blank", "noopener,noreferrer");
    const storageKey = `survey-preview:${currentPath}`;
    localStorage.setItem(storageKey, JSON.stringify(surveyInfo));
  }, [currentPath, surveyInfo]);

  /**
   * 임시 저장 핸들러
   */
  const handleSaveDraft = useCallback(() => {
    toast("아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.");
  }, []);

  /**
   * 설문 정보 유효성 검사
   * @returns 유효성 검사 통과 여부
   */
  const validateSurveyInfo = useCallback((): boolean => {
    if (!surveyInfo.title?.trim()) {
      toast("설문 제목을 입력해 주세요.");
      return false;
    }

    const incompleteQuestions = surveyInfo.questions.filter((q) => !q.title?.trim());
    if (incompleteQuestions.length > 0) {
      toast("모든 질문의 제목을 입력해 주세요.");
      return false;
    }
    return true;
  }, [surveyInfo]);

  /**
   * 저장 유효성 검사 및 모달 열기
   */
  const handleValidate = useCallback(() => {
    if (validateSurveyInfo()) {
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  }, [validateSurveyInfo]);

  /**
   * 모달 닫기 핸들러
   */
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  }, []);

  /**
   * 복제 핸들러
   */
  const handleDuplicate = useCallback(() => {
    toast("아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.");
  }, []);

  /**
   * 삭제 핸들러
   */
  const handleDelete = useCallback(() => {
    if (confirm("정말 삭제하시겠습니까?")) {
      router.push("/");
    }
  }, [router]);

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
          <SVGIcon name="MeatballIcon" />
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
