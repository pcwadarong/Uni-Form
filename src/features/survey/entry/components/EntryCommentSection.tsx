import SVGIcon from "@/features/shared/icons/icons";
import CreateComments from "@/features/survey/entry/components/comment/createComment";
import EntryClient from "@/features/survey/entry/components/comment/entryClient";
import EntryQueryClientProvider from "@/features/survey/entry/components/comment/queryClientProvider";
import type { Comment, Form } from "@/types";

interface EntryCommentSectionProps {
  item: Form;
  initialComments: Comment[];
  lastDocId: string | null;
  initialHasNextPage: boolean;
  totalCount: number;
}

/**
 * 엔트리 페이지의 댓글 섹션 컴포넌트
 * 댓글 작성 및 댓글 목록 표시를 담당
 * @param item - 폼 데이터
 * @param initialComments - 초기 댓글 목록
 * @param lastDocId - 마지막 문서 ID (페이지네이션용)
 * @param initialHasNextPage - 다음 페이지 존재 여부
 * @param totalCount - 전체 댓글 수
 */
export function EntryCommentSection({
  item,
  initialComments,
  lastDocId,
  initialHasNextPage,
  totalCount,
}: EntryCommentSectionProps) {
  return (
    <EntryQueryClientProvider>
      <CreateComments id={item.id} />
      {initialComments && initialComments.length > 0 ? (
        <EntryClient
          item={item}
          initialComments={initialComments}
          lastDocId={lastDocId}
          initialHasNextPage={initialHasNextPage}
          totalCount={totalCount}
        />
      ) : (
        <section className="flex min-h-52 flex-col items-center justify-center gap-4 rounded-2xl border font-bold opacity-20">
          <SVGIcon name="BubbleChatIcon" />
          <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
        </section>
      )}
    </EntryQueryClientProvider>
  );
}
