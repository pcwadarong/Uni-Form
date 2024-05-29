import Date from './date';
import { Survey } from '@/types';
import Image from 'next/image';
import { openDetailModal } from '@/utils/handleModal';

const RecruitItem: React.FC<{ item: Survey }> = ({ item }) => {
  const img = item.img || './logo.svg';

  return (
    <li
      className="drop-shadow flex flex-col flex-1 justify-between overflow-hidden rounded-3xl h-[360px] cursor-pointer"
      onClick={() => openDetailModal(item)}
    >
      <div className="h-44 w-full bg-font overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={img}
          alt="survey image"
          width={100}
          height={100}
        />
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
