'use client';

import { commonTemplate, surveyTemplate, recruitTemplate } from '@/constants/templates';
import { useState, useEffect } from 'react';
import FileEditIcon from '@/components/svg/file';
import { getRandomColor } from '@/utils/getRandomColor';
import { useSurveyStore } from '@/store/survey';
import { initSurveyInfo } from '@/constants/initSurveyInfo';
import { useRouter } from 'next/navigation';

const RandomColoredBox: React.FC<{ link: string; text: string }> = ({ link, text }) => {
  const [randomClass, setRandomClass] = useState('');
  const router = useRouter();
  const { setSurveyInfo } = useSurveyStore();

  useEffect(() => {
    setRandomClass(getRandomColor());
  }, []);

  const moveToCreatePage = async () => {
    try {
      setSurveyInfo(initSurveyInfo);
      router.push(link);
    } catch (error) {
      console.error('Failed to set survey info:', error);
      return;
    }
  };

  return (
    <li
      className={`relative rounded-3xl h-auto mb-2 drop-shadow-md aspect-square bg-${randomClass} flex items-center justify-center`}
    >
      <button onClick={moveToCreatePage} aria-label={`Navigate to ${text}`} className='w-full h-full'>
        <p className="absolute top-6 left-6 title3">{text}</p>
        <div className="absolute bottom-6 right-6">
          <FileEditIcon width={60} height={60} aria-label="Edit icon" />
        </div>
      </button>
    </li>
  );
};

const Form: React.FC = () => {
  const gridClassNames = 'grid grid-cols-2 md:grid-cols-4 gap-4 xl:grid-cols-5 xl:gap-8';

  return (
    <section className="flex flex-col gap-10 w-full px-4 py-16 md:px-8 2xl:px-0 2xl:w-[1400px] text-center">
      <ul className={gridClassNames} aria-label="공통 템플릿 목록">
        {Object.entries(commonTemplate).map(([key, value]) => (
          <RandomColoredBox key={key} link={`/create${value}`} text={key} />
        ))}
      </ul>
      <div>
        <h2 className="text-start mb-4 title3">설문조사</h2>
        <ul className={gridClassNames} aria-label="설문조사 템플릿 목록">
          {Object.entries(surveyTemplate).map(([key, value]) => (
            <RandomColoredBox key={key} link={`/create${value}`} text={key} />
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-start mb-4 title3">모집공고</h2>
        <ul className={gridClassNames} aria-label="모집공고 템플릿 목록">
          {Object.entries(recruitTemplate).map(([key, value]) => (
            <RandomColoredBox key={key} link={`/create${value}`} text={key} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Form;
