import { Survey } from '@/types';
import { openDetailModal, handleEnterKeyPress } from '@/utils/handleModal';

const CommentItem: React.FC<{ item: Survey }> = ({ item }) => {
  const comments = item.comments;

  return (
    <li
      className="p-8 border-[1px] border-gray-3 flex-1 rounded-3xl text-ellipsis overflow-hidden cursor-pointer"
      onClick={() => openDetailModal(item)}
      onKeyDown={handleEnterKeyPress(item)}
      role="button"
      tabIndex={0}
    >
      {comments.length > 0 && (
        <>
          <p className="mb-2">{comments[comments.length - 1].text}</p>
          <p className="caption text-gray-4">{item.title}</p>
        </>
      )}
    </li>
  );
};

export default CommentItem;
