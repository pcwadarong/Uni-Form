"use client";

import { fetchCommentsClient } from "@/lib/firebase/form/getClient";
import type { Comment, Form } from "@/types";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Comments from "./comment";

interface Props {
  item: Form;
  initialComments: Comment[];
}

interface CommentPage {
  comments: Comment[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

export default function EntryClient({ item, initialComments }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    CommentPage,
    Error,
    InfiniteData<CommentPage>,
    [string, string],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["comments", item.id],
    queryFn: async ({ pageParam }) => await fetchCommentsClient(item.id, 5, pageParam ?? null),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastDoc : undefined),

    initialPageParam: null,
    initialData: {
      pages: [
        {
          comments: initialComments,
          lastDoc: null,
          hasMore: true,
        },
      ],
      pageParams: [null],
    },
  });

  const allComments = data?.pages.flatMap((page) => page.comments) ?? [];

  return (
    <Comments
      comments={allComments}
      loadMore={fetchNextPage}
      hasNextPage={hasNextPage ?? false}
      isFetching={isFetchingNextPage}
      isLoading={data?.pages.length === 0}
    />
  );
}
