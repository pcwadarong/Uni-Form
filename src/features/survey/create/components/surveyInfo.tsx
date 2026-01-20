"use client";

import SVGIcon from "@/features/shared/icons/icons";
import { formatTextWithLineBreaks } from "@/features/shared/ui/formatTextWithLineBreaks";
import AutoResizeTextarea from "@/features/shared/ui/textarea";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import formatDate from "@/lib/utils/formateDate";
import { type ChangeEvent, useCallback, useState } from "react";
import AddBtns from "./addBtns";
import SetDuration from "./duration";

interface Props {
  mode: string;
  onEditToggle?: () => void;
}

/**
 * 설문 정보 컴포넌트
 * 설문 제목, 설명, 이미지, 기간 설정 UI 제공
 * @param mode - 모드 (editing, previewing, responding)
 * @param onEditToggle - 편집 모드 토글 핸들러 (선택)
 */
const SurveyInfo = ({ mode, onEditToggle }: Props) => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [explanationArea, setExplanationArea] = useState<string | undefined>(
    surveyInfo.description ?? "",
  );

  /**
   * 이미지 파일 변경 핸들러
   * @param event - 파일 입력 이벤트
   */
  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSurveyInfo({ img: reader.result.toString() });
        }
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [setSurveyInfo],
  );

  /**
   * 이미지 삭제 핸들러
   */
  const handleDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSurveyInfo({ img: "" });
    },
    [setSurveyInfo],
  );

  /**
   * 제목 변경 핸들러
   * @param e - 입력 이벤트
   */
  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSurveyInfo({ title: e.target.value });
    },
    [setSurveyInfo],
  );

  /**
   * 설명 변경 핸들러
   * @param e - 텍스트 영역 이벤트
   */
  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setExplanationArea(e.target.value);
      setSurveyInfo({ description: e.target.value });
    },
    [setSurveyInfo],
  );

  const isEditing = mode === "editing";

  return (
    <div
      onClick={onEditToggle}
      role={onEditToggle ? "button" : undefined}
      tabIndex={onEditToggle ? 0 : -1}
      onKeyDown={(e) => {
        if (!onEditToggle) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onEditToggle();
        }
      }}
      className={`overflow-hidden rounded-2xl bg-tone1 shadow-md transition-all ${
        isEditing ? "border-2 border-green-300 ring-2 ring-green-100" : "border border-transparent"
      }`}
    >
      <p className="px-4 py-2 font-medium text-green-400 text-sm">설문지 상단</p>

      {isEditing ? (
        <div className="flex flex-col">
          {/* 이미지 섹션 */}
          <div className="group relative flex aspect-4/1 w-full items-center justify-center overflow-hidden bg-green-500">
            {surveyInfo.img ? (
              <>
                <img
                  src={surveyInfo.img}
                  alt="Survey Header"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="rounded-lg bg-red px-4 py-2 text-white shadow-lg hover:bg-red-600"
                  >
                    이미지 삭제
                  </button>
                </div>
              </>
            ) : (
              <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center transition-colors hover:bg-green-600">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <SVGIcon name="FileEditIcon" color="white" size={40} />
                <p className="mt-2 font-medium text-sm text-white">헤더 이미지 추가</p>
              </label>
            )}
          </div>

          {/* 텍스트 정보 입력 */}
          <div className="space-y-3 p-6">
            <input
              type="text"
              placeholder="설문 제목을 입력해 주세요"
              value={surveyInfo.title}
              onChange={handleTitleChange}
              className="w-full border-gray-200 border-b py-2 font-bold text-2xl focus:border-green-400 focus:outline-none"
            />
            <AutoResizeTextarea
              value={explanationArea}
              onChange={handleDescriptionChange}
              className="w-full text-gray-600 outline-none"
              placeholder="설명 문구를 입력해 주세요..."
            />
          </div>

          <SetDuration />
          <AddBtns />
        </div>
      ) : (
        <div className="pb-4">
          {surveyInfo.img && (
            <div className="flex aspect-4/1 w-full overflow-hidden bg-green-100">
              <img
                src={surveyInfo.img}
                alt="Survey Header"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="space-y-3 p-6">
            <h2 className="font-bold text-3xl text-gray-900">
              {surveyInfo.title || "제목 없는 설문"}
            </h2>
            <div className="text-gray-600 leading-relaxed">
              {formatTextWithLineBreaks(surveyInfo.description || "설명이 없습니다.")}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700 text-xs">
                기간:{" "}
                {surveyInfo.startDate === 0
                  ? "즉시 시작"
                  : formatDate(surveyInfo.startDate).split(" / ")[0]}
                ~
                {surveyInfo.endDate === 0
                  ? "종료일 없음"
                  : formatDate(surveyInfo.endDate).split(" / ")[0]}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyInfo;
