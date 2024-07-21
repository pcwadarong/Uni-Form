'use client';

import { useState, useRef } from 'react';
import { SURVEY_CATEGORY, RECRUIT_CATEGORY } from '@/constants/category';
import { useSurveyStore } from '@/store/survey';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ToggleBtn from '../common/toggleBtn';
import Button from '../common/button';
import { useSaveSurvey } from '@/hooks/useSaveSurvey';

interface Props {
  onClose: () => void;
}

const CheckModal: React.FC<Props> = ({ onClose }) => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('설문조사');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { saveSurvey } = useSaveSurvey();

  const handleMainCategoryChange = (value: string) => {
    setSelectedMainCategory(value);

    if (value === '설문조사') {
      setSubCategories(Object.keys(SURVEY_CATEGORY));
    } else if (value === '모집공고') {
      setSubCategories(Object.keys(RECRUIT_CATEGORY));
    }
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
    const selectedCategory =
      selectedMainCategory === '설문조사' ? SURVEY_CATEGORY[value] : RECRUIT_CATEGORY[value];
    const formattedCategory = selectedCategory.startsWith('/')
      ? selectedCategory.slice(1)
      : selectedCategory;
    setSurveyInfo({ ...surveyInfo, category: formattedCategory });
  };

  const toggleIsEditable = (value: boolean) => {
    setSurveyInfo({ ...surveyInfo, isEditable: value });
  };

  const toggleIsPublic = (value: boolean) => {
    setSurveyInfo({ ...surveyInfo, isPublic: value });
  };

  const handleOnClose = () => {
    if (!isSelectOpen) onClose();
  };

  const handleSaveSurvey = async () => {
    if (!selectedMainCategory || !selectedSubCategory) {
      alert('모든 카테고리를 선택해주세요.');
      return;
    }
    await saveSurvey(selectedMainCategory);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-dark/70" aria-hidden="true" onClick={handleOnClose}></div>
      <div
        className="flex flex-col gap-4 relative z-50 p-5 w-full max-w-[600px] max-h-full overflow-auto bg-white rounded-2xl shadow-2xl md:p-30px md:pt-35px"
        ref={modalRef}
      >
        <Select
          onValueChange={handleMainCategoryChange}
          onOpenChange={() => setIsSelectOpen(!isSelectOpen)}
        >
          <SelectTrigger className="border-gray-2 mb-3">
            <SelectValue placeholder="카테고리를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="설문조사">설문조사</SelectItem>
              <SelectItem value="모집공고">모집공고</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          disabled={!selectedMainCategory}
          onValueChange={handleSubCategoryChange}
          onOpenChange={() => setIsSelectOpen(!isSelectOpen)}
        >
          <SelectTrigger className="border-gray-2 mb-3">
            <SelectValue placeholder="소분류를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {subCategories.map((subCategory) => (
                <SelectItem key={subCategory} value={subCategory}>
                  {subCategory}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedMainCategory === '설문조사' && (
          <div className="flex items-center">
            <span className="w-20 pb-3">포인트:</span>
            <Select
              defaultValue="100"
              onValueChange={handleSubCategoryChange}
              onOpenChange={() => setIsSelectOpen(!isSelectOpen)}
            >
              <SelectTrigger className="border-gray-2 mb-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">0P</SelectItem>
                  <SelectItem value="10">10P</SelectItem>
                  <SelectItem value="20">20P</SelectItem>
                  <SelectItem value="30">30P</SelectItem>
                  <SelectItem value="40">40P</SelectItem>
                  <SelectItem value="50">50P</SelectItem>
                  <SelectItem value="80">80P</SelectItem>
                  <SelectItem value="100">100P</SelectItem>
                  <SelectItem value="120">120P</SelectItem>
                  <SelectItem value="150">150P</SelectItem>
                  <SelectItem value="200">200P</SelectItem>
                  <SelectItem value="350">250P</SelectItem>
                  <SelectItem value="300">300P</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-left">
            <p>답변 수정 허용</p>
            <p className="caption text-gray-4">
              설문 종료 전까지 응답자가 작성한 답변을 수정할 수 있습니다.
            </p>
          </div>
          <ToggleBtn
            text=""
            checked={surveyInfo.isEditable}
            onChange={() => toggleIsEditable(!surveyInfo.isEditable)}
            aria-label="답변 수정 허용"
          />
        </div>
        {selectedMainCategory === '설문조사' && (
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p>설문 결과 공개</p>
              <p className="caption text-gray-4">
                폭넓은 지식 공유를 위해, 개인정보를 제외한 설문 분석 결과를 사이트에 공개합니다.{' '}
              </p>
            </div>
            <ToggleBtn
              text=""
              checked={surveyInfo.isPublic}
              onChange={() => toggleIsPublic(!surveyInfo.isPublic)}
              aria-label="설문 결과 공개"
            />
          </div>
        )}
        <div className="mt-5 gap-2 flex justify-center">
          <Button
            text={'수정하기'}
            className={'bg-green-light text-font'}
            onClick={handleOnClose}
          />
          <Button
            text={'저장하기'}
            className={'bg-primary text-white'}
            onClick={handleSaveSurvey}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
