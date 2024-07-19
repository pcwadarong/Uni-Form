import { Survey } from '@/types';
interface ReactionProps extends Pick<Survey, 'responses' | 'comments'> {}

export default function Reaction({ responses, comments }: ReactionProps) {
  return (
    <div className="text-font caption md:text-sm flex gap-3 truncate">
      {responses && (
        <span
          aria-label={`설문에 ${responses.length}번 응답이 있습니다.`}
        >{`👀 설문 ${responses.length}회`}</span>
      )}
      {comments && (
        <span aria-label={`댓글 ${comments.length}개가 있습니다.`}>
          {`✨ 댓글 ${comments.length}개`}
        </span>
      )}
    </div>
  );
}
