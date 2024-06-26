'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Date from './date';
import { Survey } from '@/types';
import { openDetailModal } from '@/utils/handleModal';
import { getRandomColor } from '@/utils/getRandomColor';

const RecruitItem: React.FC<{ item: Survey }> = ({ item }) => {
  const [randomClass, setRandomClass] = useState('');

  useEffect(() => {
    setRandomClass(getRandomColor());
  }, []);

  return (
    <li
      className="drop-shadow flex flex-col flex-1 justify-between overflow-hidden rounded-3xl h-[360px] cursor-pointer"
      onClick={() => openDetailModal(item)}
    >
      <div className={`h-44 w-full bg-${randomClass} overflow-hidden`}>
        {item.img && (
          <Image
            className="w-full h-full object-cover"
            src={item.img}
            alt="survey image"
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="px-6 py-6 flex flex-col justify-between bg-white flex-grow">
        <div>
          <Date duration={item.duration} />
          <h3 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h3>
        </div>
        <p className="caption text-gray-4 truncate">{item.duration}</p>
      </div>
    </li>
  );
};

export default RecruitItem;
