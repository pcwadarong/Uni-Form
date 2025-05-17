"use client";

import { formatTextWithLineBreaks } from "@/lib/utils/formatTextWithLineBreaks";
import { useSurveyStore } from "@/store/survey";
import { type ChangeEvent, useState } from "react";
import FileEditIcon from "../svg/file";
import AutoResizeTextarea from "../ui/textarea";
import AddBtns from "./addBtns";
import SetDuration from "./duration";

interface Props {
  mode: string;
  onEditToggle?: () => void;
}
const SurveyInfo = ({ mode, onEditToggle }: Props) => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [explanationArea, setExplanationArea] = useState<string | undefined>(
    surveyInfo.description,
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
      className={`bg-white rounded-2xl overflow-hidden shadow-md ${
        mode === "editing" ? "border border-green-300" : ""
      }`}
    >
      <p className="py-2 px-4 text-green-400">{}페이지</p>
      {mode === "editing" ? (
        <div>
          <div className="aspect-[4/1] bg-font justify-center flex">
            {surveyInfo.img ? (
              <div className="relative overflow-hidden flex items-center">
                <img src={surveyInfo.img} alt="Uploaded" className="w-full h-auto object-cover" />
                <div className="absolute bottom-5 right-5 bg-gray-4/50 text-white p-2 rounded-md">
                  <button onClick={handleDeleteClick} aria-label="Delete image">
                    삭제하기
                  </button>
                </div>
              </div>
            ) : (
              <label
                className="cursor-pointer p-50 justify-center flex flex-col items-center"
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
              className="p-2 w-full focused_input"
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
            <div className="aspect-[4/1] bg-font justify-center flex">
              <div className="relative overflow-hidden flex items-center">
                <img src={surveyInfo.img} alt="Survey" className="w-full h-auto object-cover" />
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
            <span className="bg-gray-1 p-2 rounded-full text-gray-4" aria-label="Survey duration">
              {`${surveyInfo.startDate} ~ ${surveyInfo.endDate}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyInfo;
