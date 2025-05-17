export default function Reaction({
  responsesCount,
  commentsCount,
}: { responsesCount: number; commentsCount: number }) {
  return (
    <div className="text-green-400 caption md:text-sm flex gap-3 truncate">
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
