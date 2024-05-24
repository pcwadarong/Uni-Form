import Special from './special';
import Reaction from './reaction';
import { Survey } from '@/types';
import Image from 'next/image';

export default function SurveyItem({ item }: { item: Survey }) {
  const img = item.img || './logo.svg';

  return (
    <li className="drop-shadow flex flex-col flex-1 justify-between overflow-hidden rounded-3xl h-[360px]">
      <div className="h-36 w-full bg-font overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={img}
          alt="survey image"
          width={100}
          height={100}
        />
      </div>
      <div className="px-6 py-7 flex flex-col justify-between bg-white flex-grow">
        <div>
          <Special point={item.point} duration={item.duration} />
          <h3 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h3>
          <p className="caption text-gray-4 truncate">{item.duration}</p>
        </div>
        <Reaction response={item.response} comments={item.comments} />
      </div>
    </li>
  );
}
