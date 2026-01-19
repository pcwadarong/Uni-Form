interface ReactionProps {
  responsesCount: number;
  commentsCount: number;
}

/**
 * 반응 지표 컴포넌트
 * 응답 수와 댓글 수를 표시
 * @param responsesCount - 응답 수
 * @param commentsCount - 댓글 수
 */
export default function Reaction({ responsesCount, commentsCount }: ReactionProps) {
  return (
    <div className="caption flex gap-3 truncate text-green-500 md:text-sm ">
      {responsesCount > 0 && (
        <span
          aria-label={`설문에 ${responsesCount}번 응답이 있습니다.`}
        >{`👀 설문 ${responsesCount}회`}</span>
      )}
      {commentsCount > 0 && (
        <span aria-label={`댓글 ${commentsCount}개가 있습니다.`}>
          {`✨ 댓글 ${commentsCount}개`}
        </span>
      )}
    </div>
  );
}
