import React from 'react';
import Reaction from '../survey/reaction';
import { Survey } from '@/types';
import ClearIcon from '@mui/icons-material/Clear';

const DetailModal: React.FC<{ item: Survey; closeModal: () => void }> = ({ item, closeModal }) => {
  return (
    <div className="z-50 relative p-4" role="dialog" aria-modal="true">
      <div className="m-auto w-full flex flex-col gap-3 max-w-[600px] max-h-full oveflow-auto bg-gray-1 rounded-2xl shadow-2xl p-7 pt-25px md:p-30px md:pt-35px md:max-w-470px sm:max-w-screen">
        <button
          onClick={closeModal}
          className="absolute right-10 top-10 text-gray-4 hover:text-dark"
        >
          <ClearIcon />
        </button>
        <h4 className="title3 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h4>
        <hr className="-mt-3 w-full border-primary"></hr>
        <span className="line-clamp-3">{item.info}</span>
        <div className="flex justify-between">
          <span className="caption text-gray-4 truncate">{item.duration}</span>
          <Reaction response={item.response} comments={item.comments} />
        </div>
        <ul className='overflow-hidden h-52'>
          {item.comments.map((comment, index) => (
            <li key={index} className='w-full p-3 rounded-xl mb-2 border-[1px] border-gray-2 bg-white'>
              <h5 className='font-semibold'>{comment.creator}</h5>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-2">
          <button className="py-2 px-8 rounded-md bg-green-light text-font">결과보기</button>
          <button className="py-2 px-8 rounded-md bg-primary text-white">참여하기</button>{' '}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
