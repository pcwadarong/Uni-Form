import SVGIcon from "@/features/shared/icons/icons";
import type { Comment } from "@/types";

/**
 * 모달 내에서 댓글 목록을 표시하는 컴포넌트
 * @param comments - 표시할 댓글 배열
 */
export function CommentsSection({ comments }: { comments: Comment[] }) {
  const hasComments = comments && comments.length > 0;

  return (
    <section
      className="relative mt-6 h-72 overflow-hidden"
      aria-labelledby="comments-section-heading"
    >
      <h2 id="comments-section-heading" className="sr-only">
        댓글 섹션
      </h2>

      {hasComments ? (
        <ul className="space-y-3">
          <div className="absolute bottom-0 h-14 w-full bg-linear-to-t from-muted" />
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-xl border border-gray-300 bg-surface px-4 py-3">
              <span className="font-semibold">{comment.displayName}</span>
              <span className="caption ml-2">
                {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
              </span>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex min-h-52 flex-col items-center justify-center gap-4 rounded-2xl border font-bold opacity-20">
          <SVGIcon name="BubbleChatIcon" size={70} />
          <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
        </div>
      )}
    </section>
  );
}
