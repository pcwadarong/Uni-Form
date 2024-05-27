import { Survey } from '@/types';

interface CommentProps extends Pick<Survey, 'title' | 'comments'> {
  openDetailModal: () => void;
}

const CommentItem: React.FC<CommentProps> = ({ title, comments, openDetailModal }) => {
  return (
    <li
      className="p-8 border-[1px] border-gray-3 flex-1 rounded-3xl text-ellipsis overflow-hidden cursor-pointer"
      onClick={openDetailModal}
    >
      {comments.length > 0 && (
        <>
          <p className="mb-2">{comments[comments.length - 1].text}</p>
          <p className="caption text-gray-4">{title}</p>
        </>
      )}
    </li>
  );
};

export default CommentItem;
