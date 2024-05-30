'use client';

import Link from 'next/link';
import { commonTemplate, surveyTemplate, recruitTemplate } from '@/constants/templates';
import { useState, useEffect } from 'react';
import FileEditIcon from '@/components/svg/file';
import { getRandomColor } from '@/utils/getRandomColor';

const RandomColoredBox: React.FC<{ link: string; text: string }> = ({ link, text }) => {
  const [randomClass, setRandomClass] = useState('');

  useEffect(() => {
    setRandomClass(getRandomColor());
  }, []);

  return (
    <li>
      <Link href={link}>
        <div
          className={`relative rounded-3xl h-auto mb-2 drop-shadow-md aspect-square bg-${randomClass}`}
          aria-label={`Navigate to ${text}`}
        >
          <p className="absolute top-6 left-6 title3">{text}</p>
          <div className="absolute bottom-6 right-6">
            <FileEditIcon width={60} height={60} aria-label="Edit icon" />
          </div>
        </div>
      </Link>
    </li>
  );
};

const Form: React.FC = () => {
  const gridClassNames = 'grid grid-cols-2 md:grid-cols-4 gap-4 xl:grid-cols-5 xl:gap-8';

  return (
    <div className="flex flex-col gap-10 w-full px-4 py-16 md:px-8 2xl:px-0 2xl:w-[1400px] text-center">
      <ul className={gridClassNames}>
        {Object.entries(commonTemplate).map(([key, value]) => (
          <RandomColoredBox key={key} link={`/create${value}`} text={key} />
        ))}
      </ul>
      <div>
        <h2 className="text-start mb-4 title3">설문조사</h2>
        <ul className={gridClassNames}>
          {Object.entries(surveyTemplate).map(([key, value]) => (
            <RandomColoredBox key={key} link={`/create${value}`} text={key} />
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-start mb-4 title3">모집공고</h2>
        <ul className={gridClassNames}>
          {Object.entries(recruitTemplate).map(([key, value]) => (
            <RandomColoredBox key={key} link={`/create${value}`} text={key} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
