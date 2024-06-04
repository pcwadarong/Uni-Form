'use client';

import { useState, ChangeEvent } from 'react';
import FileEditIcon from '../svg/file';
import AutoResizeTextarea from '../common/textarea';
import AddBtns from './addBtns';

const SurveyInfo = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [explanationArea, setExplanationArea] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImageUrl(reader.result.toString());
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = () => {
    setImageUrl('');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <p className="py-2 px-4 text-font">{}페이지</p>
      <div className="aspect-[4/1] bg-font justify-center flex">
        {imageUrl ? (
          <div className="relative overflow-hidden flex items-center">
            <img src={imageUrl} alt="Uploaded" className="w-full h-auto object-cover" />
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
          className="p-2 w-full focused_input"
        />
        <AutoResizeTextarea
          value={explanationArea}
          onChange={(e) => setExplanationArea(e.target.value)}
          className="caption"
          placeholder="설명을 입력하세요 ..."
        />
      </div>
      <AddBtns />
    </div>
  );
};

export default SurveyInfo;
