'use client';

import { QuestionProps } from '@/types';
import Options from '../options';
import { useState } from 'react';
import Image from 'next/image';

const FileQuestion: React.FC<QuestionProps> = ({ question, mode }) => {
  const [file, setFile] = useState<File | null>(null);
  const isDisabled = mode === 'previewing' || mode === 'editing' || file !== null;
  const [type, setFileType] = useState('사진');
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 최대 10MB 이하의 파일을 첨부해주세요.');
      event.target.value = ''; // 선택된 파일 초기화
      setFile(null);
    } else {
      setFile(selectedFile || null);
    }
  };

  return (
    <div>
      {mode === 'editing' ? (
        <>
          <div className="flex gap-3">
            <div>
              <input
                type="radio"
                id="image"
                value="사진"
                name="option"
                checked={type === '사진'}
                onChange={handleOptionChange}
              />
              <label htmlFor="image" className="ml-1">
                이미지
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="file"
                value="파일"
                name="option"
                checked={type === '파일'}
                onChange={handleOptionChange}
              />
              <label htmlFor="file" className="ml-1">
                파일
              </label>
            </div>
          </div>
          <p className="caption text-gray-4">1개 첨부 가능</p>
          <Options id={question.id} />
        </>
      ) : (
        <>
          <label className="cursor-pointer flex justify-center items-center border-[1px] border-gray-2 rounded-lg p-2 mb-3 focus:outline-none dark:bg-gray-900">
            <input
              type="file"
              className="hidden"
              accept={
                type === '사진'
                  ? '.jpg, .jpeg, .png, .bmp, .webp, .svg'
                  : '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf'
              }
              disabled={isDisabled}
              onChange={handleFileChange}
            />
            <Image
              src={type === '사진' ? './image.svg' : './file.svg'}
              alt="logo"
              width="20"
              height="20"
            />
            <p className={`pl-2 ${isDisabled && 'text-gray-3'}`}>{`${type} 첨부`}</p>
          </label>
          <div>
            <p className="subtitle text-gray-4">{`${type} 업로드는 최대 1개만 가능합니다.`}</p>
            <p className="caption text-gray-3">{`* ${type} 용량 10MB 이하`}</p>
            <p className="caption text-gray-3">{`* 첨부 가능 파일: 확장자 ${
              type === '사진'
                ? 'JPG, JPEG, PNG, BMP, WEBP, SVG'
                : '워드, 엑셀, 파워포인트, 어도비, PDF'
            }`}</p>
          </div>
          {file && (
            <div className="mt-4">
              {type === '사진' ? (
                <div className="relative w-fit">
                  <button
                    onClick={() => setFile(null)}
                    style={{ lineHeight: '1.3rem' }}
                    className="absolute right-3 top-3 w-6 h-6 bg-dark/50 rounded-full text-white flex justify-center"
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
                <p>{file.name}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileQuestion;
