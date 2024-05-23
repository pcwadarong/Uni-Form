import { Survey } from '@/types';
interface ReactionProps extends Pick<Survey, 'response' | 'comments'> {}

export default function Reaction({ response, comments }: ReactionProps) {
  return (
    <div className="text-font text-sm flex gap-3">
      <span>{response > 0 ? `👀 설문수 ${response}회` : ''}</span>
      <span>{comments.length > 0 ? `✨ 댓글 ${comments.length}개` : ''}</span>
    </div>
  );
}
