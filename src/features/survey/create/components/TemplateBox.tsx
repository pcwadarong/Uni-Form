"use client";

import { initSurveyInfo } from "@/constants/initSurveyInfo";
import SVGIcon from "@/features/shared/icons/icons";
import { toast } from "@/features/shared/ui/sonner";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import getRandomColor from "@/features/survey/utils/getRandomColor";
import { useRouter } from "next/navigation";

interface TemplateBoxProps {
  link: string;
  text: string;
}

/**
 * 템플릿 선택 박스 컴포넌트
 * ID 기반 색상이 적용된 클릭 가능한 템플릿 선택 박스
 * @param link - 이동할 생성 페이지 경로
 * @param text - 템플릿 이름 (색상 결정 및 표시용)
 */
export function TemplateBox({ link, text }: TemplateBoxProps) {
  const router = useRouter();
  const { setSurveyInfo } = useSurveyStore();

  const moveToCreatePage = async () => {
    try {
      setSurveyInfo(initSurveyInfo);
      router.push(link);
    } catch {
      toast.error("템플릿 이동 중 오류가 발생했습니다.");
    }
  };

  const bgColor = getRandomColor(text);

  return (
    <li
      className={`relative mb-2 flex aspect-square h-auto items-center justify-center rounded-3xl ${bgColor} drop-shadow-md`}
    >
      <button
        type="button"
        onClick={moveToCreatePage}
        aria-label={`Navigate to ${text}`}
        className="h-full w-full"
      >
        <p className="title3 absolute top-6 left-6">{text}</p>
        <div className="absolute right-6 bottom-6">
          <SVGIcon name="FileEditIcon" size={60} />
        </div>
      </button>
    </li>
  );
}
