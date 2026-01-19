"use client";

import FileEditIcon from "@/features/shared/icons/file";
import { formatTextWithLineBreaks } from "@/features/shared/ui/formatTextWithLineBreaks";
import AutoResizeTextarea from "@/features/shared/ui/textarea";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import formatDate from "@/lib/utils/formateDate";
import { type ChangeEvent, useState } from "react";
import AddBtns from "./addBtns";
import SetDuration from "./duration";

interface Props {
  mode: string;
  onEditToggle?: () => void;
}
const SurveyInfo = ({ mode, onEditToggle }: Props) => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [explanationArea, setExplanationArea] = useState<string | undefined>(
    surveyInfo.description ?? "",
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleDeleteClick = () => {
    setSurveyInfo({ img: "" });
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyInfo({ title: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExplanationArea(e.target.value);
    setSurveyInfo({ description: e.target.value });
  };

  return (
    <div
      onClick={onEditToggle}
      onKeyDown={onEditToggle}
      className={`overflow-hidden rounded-2xl bg-tone1 shadow-md ${
        mode === "editing" ? "border border-green-300" : ""
      }`}
    >
      <p className="px-4 py-2 text-green-400">{}페이지</p>
      {mode === "editing" ? (
        <div>
          <div className="flex aspect-4/1 justify-center bg-green-500">
            {surveyInfo.img ? (
              <div className="relative flex items-center overflow-hidden">
                <img src={surveyInfo.img} alt="Uploaded" className="h-auto w-full object-cover" />
                <div className="absolute right-5 bottom-5 rounded-md bg-gray-4/50 p-2 text-white">
                  <button type="button" onClick={handleDeleteClick} aria-label="Delete image">
                    삭제하기
                  </button>
                </div>
              </div>
            ) : (
              <label
                className="flex cursor-pointer flex-col items-center justify-center p-50"
                aria-label="Upload Image"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg, .jpeg, .png, .bmp, .webp, .svg"
                />
                <FileEditIcon color="white" width={70} height={70} />
                <p className="mt-2 text-white">사진 추가하기</p>
              </label>
            )}
          </div>
          <div className="p-2">
            <input
              type="text"
              placeholder="설문 제목 입력"
              value={surveyInfo.title}
              onChange={handleTitleChange}
              className="focused_input w-full p-2"
              aria-label="Survey title"
            />
            <AutoResizeTextarea
              value={explanationArea}
              onChange={handleDescriptionChange}
              className="caption"
              placeholder="설명을 입력하세요 ..."
              aria-label="Survey description"
            />
          </div>
          <SetDuration />
          <AddBtns />
        </div>
      ) : (
        <div className="pb-2">
          {surveyInfo.img && (
            <div className="flex aspect-4/1 justify-center bg-green-500">
              <div className="relative flex items-center overflow-hidden">
                <img src={surveyInfo.img} alt="Survey" className="h-auto w-full object-cover" />
              </div>
            </div>
          )}
          <div className="p-4">
            <h2 className="title3" aria-label="Survey title">
              {surveyInfo.title}
            </h2>
            <p
              className={`caption ${explanationArea ? "pb-5" : ""}`}
              aria-label="Survey description"
            >
              {formatTextWithLineBreaks(surveyInfo.description || "")}
            </p>
            <span className="rounded-full bg-gray-1 p-2 text-gray-4" aria-label="Survey duration">
              {surveyInfo.startDate === 0
                ? "바로 시작"
                : formatDate(surveyInfo.startDate).split(" / ")[0]}
              {" ~ "}
              {surveyInfo.endDate === 0
                ? "제한 없음"
                : formatDate(surveyInfo.endDate).split(" / ")[0]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyInfo;
