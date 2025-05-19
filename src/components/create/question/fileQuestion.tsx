"use client";

import FileEditIcon from "@/components/svg/file";
import ImageIcon from "@/components/svg/image";
import { useSurveyStore } from "@/store/survey";
import type { QuestionProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import Options from "../options";

const FileQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const { updateQuestion } = useSurveyStore();
  const [file, setFile] = useState<File | null>(null);
  const isDisabled = mode === "previewing" || mode === "editing" || file !== null;
  const [type, setFileType] = useState("사진");
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleOptionClick = (newType: string) => {
    setFileType(newType);
    setFile(null);
    updateQuestion(question.id, { ...question, selectedOption: newType });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      alert("파일 크기가 너무 큽니다. 최대 10MB 이하의 파일을 첨부해주세요.");
      event.target.value = "";
      setFile(null);
    } else {
      setFile(selectedFile || null);
    }
  };

  return (
    <div>
      {mode === "editing" ? (
        <>
          <div className="flex gap-3" role="radiogroup" aria-labelledby="파일 종류 선택하기">
            <div>
              <input
                type="radio"
                id="image"
                value="사진"
                name="option"
                checked={type === "사진"}
                onChange={() => handleOptionClick("사진")}
                aria-labelledby="이미지 선택"
              />
              <label id="image-label" htmlFor="image" className="ml-1">
                이미지
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="file"
                value="파일"
                name="option"
                checked={type === "파일"}
                onChange={() => handleOptionClick("파일")}
                aria-labelledby="파일 선택"
              />
              <label id="file-label" htmlFor="file" className="ml-1">
                파일
              </label>
            </div>
          </div>
          <p className="caption text-gray-4">1개 첨부 가능</p>
          <Options id={question.id} />
        </>
      ) : (
        <>
          <label
            className="cursor-pointer flex justify-center items-center border-[1px] border-gray-2 rounded-lg p-2 mb-3 focus:outline-none dark:bg-gray-900"
            aria-label={`파일 업로드: ${type} 파일 업로드 버튼`}
          >
            <input
              type="file"
              className="hidden"
              accept={
                type === "사진"
                  ? ".jpg, .jpeg, .png, .bmp, .webp, .svg"
                  : ".doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf"
              }
              disabled={isDisabled}
              onChange={handleFileChange}
            />
            {type === "사진" ? <ImageIcon /> : <FileEditIcon />}
            <p className={`pl-2 ${isDisabled && "text-gray-3"}`}>{`${type} 첨부`}</p>
          </label>
          <div id="file-upload-instructions">
            <p className="subtitle text-gray-4">{`${type} 업로드는 최대 1개만 가능합니다.`}</p>
            <p className="caption text-gray-3">{`* ${type} 용량 10MB 이하`}</p>
            <p className="caption text-gray-3">{`* 첨부 가능 파일: 확장자 ${
              type === "사진"
                ? "JPG, JPEG, PNG, BMP, WEBP, SVG"
                : "워드, 엑셀, 파워포인트, 어도비, PDF"
            }`}</p>
          </div>
          {file && (
            <div className="mt-4">
              {type === "사진" ? (
                <div className="relative w-fit">
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    style={{ lineHeight: "1.3rem" }}
                    className="absolute right-3 top-3 w-6 h-6 bg-dark/50 rounded-full text-white flex justify-center"
                    aria-label="파일 삭제"
                  >
                    x
                  </button>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="첨부된 이미지"
                    width="150"
                    height="150"
                    className="rounded-lg"
                  />
                </div>
              ) : (
                <>
                  <p>{file.name}</p>
                  <div className="sr-only" aria-live="polite">
                    파일 이름: {file.name}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileQuestion;
