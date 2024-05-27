import React from 'react';
import Reaction from '../survey/reaction';
import { Survey } from '@/types';
import ClearIcon from '@mui/icons-material/Clear';

const DetailModal: React.FC<{ item: Survey; closeModal: () => void }> = ({ item, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="max-w-[600px] h-96 p-10 bg-white rounded-2xl relative">
        <button onClick={closeModal} className="absolute right-8 top-8 text-gray-4 hover:text-dark">
          <ClearIcon />
        </button>
        s<h4 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h4>
        <h2 className="w-full h-[1px] border-primary"></h2>
        <div>
          <span className="caption text-gray-4 truncate">{item.duration}</span>
          <Reaction response={item.response} comments={item.comments} />
        </div>
        <div>
          <button>결과보기</button>
          <button>참여하기</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
