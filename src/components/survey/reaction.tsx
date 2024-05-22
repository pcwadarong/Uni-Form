export default function Reaction() {
  const response = 200;
  const comment = 5;

  return (
    <div className="text-font text-sm flex gap-3">
      <span>{response ? `👀 설문수 ${response}회` : ''}</span>
      <span>{comment ? `✨ 댓글 ${comment}개` : ''}</span>
    </div>
  );
}
