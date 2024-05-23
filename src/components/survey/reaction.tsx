import { Survey } from '@/types';
interface ReactionProps extends Pick<Survey, 'response' | 'comments'> {}

export default function Reaction({ response, comments }: ReactionProps) {
  return (
    <div className="text-font text-xs md:text-sm flex gap-3 truncate">
      {response > 0 ? <span>{`👀 설문 ${response}회`}</span> : ''}
      {comments.length > 0 ? <span>{`✨ 댓글 ${comments.length}개`}</span> : ''}
    </div>
  );
}
