'use client';

import { useState, ChangeEvent } from 'react';
import FileEditIcon from '../svg/file';
import AutoResizeTextarea from '../common/textarea';
import AddBtns from './addBtns';
import { useSurveyStore } from '@/store';

const SurveyInfo = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [explanationArea, setExplanationArea] = useState<string>(surveyInfo.description);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setSurveyInfo({ imageUrl: reader.result.toString() });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = () => {
    setSurveyInfo({ imageUrl: '' });
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyInfo({ title: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExplanationArea(e.target.value);
    setSurveyInfo({ description: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <p className="py-2 px-4 text-font">{}페이지</p>
      <div className="aspect-[4/1] bg-font justify-center flex">
        {surveyInfo.imageUrl ? (
          <div className="relative overflow-hidden flex items-center">
            <img src={surveyInfo.imageUrl} alt="Uploaded" className="w-full h-auto object-cover" />
            <div className="absolute bottom-5 right-5 bg-gray-4/50 text-white p-2 rounded-md">
              <button onClick={handleDeleteClick}>삭제하기</button>
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
        />
        <AutoResizeTextarea
          value={explanationArea}
          onChange={handleDescriptionChange}
          className="caption"
          placeholder="설명을 입력하세요 ..."
        />
      </div>
      <AddBtns />
    </div>
  );
};

export default SurveyInfo;