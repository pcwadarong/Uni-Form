import Reaction from '../survey/reaction';
import { Survey } from '@/types';
import Image from 'next/image';
import { closeModal } from '@/utils/handleModal';

const DetailModal: React.FC<{ item: Survey }> = ({ item }) => {
  return (
    <div className="z-50 relative p-4" role="dialog" aria-modal="true">
      <div className="m-auto w-full flex flex-col gap-3 max-w-[600px] max-h-full overflow-auto bg-gray-1 rounded-2xl shadow-2xl p-7 pt-25px md:p-30px md:pt-35px md:max-w-470px sm:max-w-screen">
        <button
          onClick={closeModal}
          className="absolute right-10 top-10 text-gray-4 hover:text-dark p-4 -m-4"
        >
          <Image src={'./cancel.svg'} alt="no comments" width="20" height="20" />
        </button>
        <h4 className="title3 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h4>
        <hr className="-mt-3 w-full border-primary"></hr>
        <span className="line-clamp-3">{item.info}</span>
        <div className="flex justify-between">
          <span className="caption text-gray-4 truncate">{item.duration}</span>
          <Reaction response={item.response} comments={item.comments} />
        </div>
        <div className="overflow-hidden h-52 relative">
          {item.comments.length > 0 ? (
            <ul>
              <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-gray-1"></div>
              {item.comments.map((comment, index) => (
                <li
                  key={index}
                  className="w-full p-3 rounded-xl mb-2 border-[1px] border-gray-2 bg-white"
                >
                  <h5 className="font-semibold">{comment.creator}</h5>
                  <p>{comment.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-52 border-[1px] border-gray-2 bg-white rounded-xl text-gray-3 flex flex-col gap-3 justify-center items-center">
              <Image src={'./bubble-chat.svg'} alt="no comments" width="80" height="78" />
              <p>아직 댓글이 없어요. 처음으로 댓글을 남겨보세요!</p>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <button className="py-2 px-8 rounded-md bg-green-light text-font">결과보기</button>
          <button className="py-2 px-8 rounded-md bg-primary text-white">참여하기</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
