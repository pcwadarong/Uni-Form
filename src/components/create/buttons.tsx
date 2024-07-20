'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useSurveyStore } from '@/store/survey';
import CheckModal from './checkModal';

const CreatePageButton = () => {
  const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPath = usePathname();
  const { surveyInfo } = useSurveyStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowToggleMenu(false);
    }
  };

  const handleOpenPreview = () => {
    window.open(`${currentPath}/preview`, '_blank', 'noopener,noreferrer');
    localStorage.setItem('survey 1', JSON.stringify(surveyInfo));
  };

  const handleSaveDraft = () => {
    alert('아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.');
  };

  const handleValidate = () => {
    const validateSurveyInfo = (): boolean => {
      if (!surveyInfo.title) {
        alert('설문 제목을 입력해 주세요.');
        return false;
      }

      const incompleteQuestions = surveyInfo.questions.filter((q) => !q.title);
      if (incompleteQuestions.length > 0) {
        alert('모든 질문의 제목을 입력해 주세요.');
        return false;
      }
      return true;
    };

    if (validateSurveyInfo()) {
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleDuplicate = () => {
    alert('아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.');
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      router.push('/');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-2 justify-end subtitle items-center">
      <button className="py-1 px-3 bg-white rounded-md" onClick={handleOpenPreview}>
        미리보기
      </button>
      <button className="py-1 px-3 bg-white rounded-md" onClick={handleSaveDraft}>
        임시저장
      </button>
      <button
        className="py-1 px-3 bg-primary text-white rounded-md"
        aria-label="저장하기"
        onClick={handleValidate}
      >
        저장
      </button>
      <div className="relative flex items-center" ref={menuRef}>
        <button
          onClick={() => setShowToggleMenu((prev) => !prev)}
          aria-label="사용자 메뉴 토글"
          aria-expanded={showToggleMenu}
        >
          <Image src={'/meatball.svg'} alt="meatball menu icon" width="20" height="20" />
        </button>
        {showToggleMenu && (
          <div
            className="absolute right-0 top-10 flex flex-col text-center rounded-lg overflow-hidden shadow-md bg-white"
            aria-labelledby="menu-button"
          >
            <button
              className="rounded-md px-3 py-2 hover:bg-gray-2 text-nowrap"
              onClick={handleDuplicate}
            >
              복제하기
            </button>
            <button
              className="text-red px-3 py-2 rounded-md hover:bg-gray-2"
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
