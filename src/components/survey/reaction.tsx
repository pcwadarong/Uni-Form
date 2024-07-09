import { Survey } from '@/types';
interface ReactionProps extends Pick<Survey, 'response' | 'comments'> {}

export default function Reaction({ response, comments }: ReactionProps) {
  return (
    <div className="text-font caption md:text-sm flex gap-3 truncate">
      {response > 0 && (
        <span aria-label={`설문에 ${response}번 응답이 있습니다.`}>{`👀 설문 ${response}회`}</span>
      )}
      {comments.length > 0 && (
        <span aria-label={`댓글 ${comments.length}개가 있습니다.`}>
          {`✨ 댓글 ${comments.length}개`}
        </span>
      )}
    </div>
  );
}
