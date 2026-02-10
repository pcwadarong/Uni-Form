"use client";

import Loading from "@/app/loading";
import { useInfiniteComments } from "@/features/survey/entry/hooks/useInfiniteComments";
import type { Comment, Form } from "@/types";
import Comments from "./comment";

interface Props {
  item: Form;
  initialComments: Comment[];
  lastDocId: string | null;
  initialHasNextPage: boolean;
  totalCount: number;
}

/**
 * 댓글 조회/페이지네이션은 훅으로 분리하고,
 * 이 컴포넌트는 화면 조합과 상태 전달만 담당한다.
 */
export default function EntryClient({
  item,
  initialComments,
  lastDocId,
  initialHasNextPage,
  totalCount,
}: Props) {
  const { ready, allComments, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteComments({
      formId: item.id,
      initialComments,
      lastDocId,
      initialHasNextPage,
    });

  if (!ready) return <Loading />;

  return (
    <Comments
      formId={item.id}
      comments={allComments}
      loadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetching={isFetchingNextPage}
      isLoading={isLoading}
      isError={isError}
      totalCount={totalCount}
    />
  );
}
