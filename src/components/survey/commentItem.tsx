import { fetchComments } from '@/lib/firebase/fetchDatas';
import { handleEnterKeyPress, openDetailModal } from '@/lib/utils/handleModal';
import type { Survey } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const CommentItem: React.FC<{ item: Survey }> = ({ item }) => {
  const { data: commentsList } = useSuspenseQuery({
    queryKey: ['comments', item.id],
    queryFn: () => fetchComments(item.id),
  });

  return (
    <li
      className="p-8 border-[1px] border-gray-3 flex-1 rounded-3xl text-ellipsis overflow-hidden cursor-pointer"
      onClick={() => openDetailModal(item)}
      onKeyDown={handleEnterKeyPress(item)}
      role="button"
      tabIndex={0}
    >
      {commentsList && (
        <>
          <p className="mb-2">
            {commentsList[commentsList.length - 1].content}
          </p>
          <p className="caption text-gray-4">{item.title}</p>
        </>
      )}
    </li>
  );
};

export default CommentItem;
