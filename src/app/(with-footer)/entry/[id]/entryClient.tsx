"use client";

import Loading from "@/app/loading";
import { fetchCommentsClient, getCommentSnapshotById } from "@/lib/firebase/form/getClient";
import type { Comment, Form } from "@/types";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Comments from "./comment";

interface Props {
  item: Form;
  initialComments: Comment[];
  lastDocId: string | null;
  initialHasNextPage: boolean;
  totalCount: number;
}

interface CommentPage {
  comments: Comment[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

export default function EntryClient({
  item,
  initialComments,
  lastDocId,
  initialHasNextPage,
  totalCount,
}: Props) {
  const [initialLastDoc, setInitialLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(
    null,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchLastDoc = async () => {
      if (lastDocId) {
        const snap = await getCommentSnapshotById(lastDocId);
        setInitialLastDoc(snap);
      }
      setReady(true);
    };
    fetchLastDoc();
  }, [lastDocId]);

  if (!ready) return <Loading />;

  return (
    <CommentQueryClient
      item={item}
      initialComments={initialComments}
      initialLastDoc={initialLastDoc}
      initialHasNextPage={initialHasNextPage}
      totalCount={totalCount}
    />
  );
}

interface CommentQueryClientProps {
  item: Form;
  initialComments: Comment[];
  initialLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  initialHasNextPage: boolean;
  totalCount: number;
}

function CommentQueryClient({
  item,
  initialComments,
  initialLastDoc,
  initialHasNextPage,
  totalCount,
}: CommentQueryClientProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    CommentPage,
    Error,
    InfiniteData<CommentPage>,
    [string, string],
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: ["comments", item.id],
    queryFn: async ({ pageParam }) => await fetchCommentsClient(item.id, 5, pageParam ?? null),
    getNextPageParam: (lastPage) => (lastPage.comments.length > 0 ? lastPage.lastDoc : undefined),
    initialPageParam: null,
    initialData: {
      pages: [
        {
          comments: initialComments,
          lastDoc: initialLastDoc,
          hasMore: initialHasNextPage,
        },
      ],
      pageParams: [null],
    },
  });

  const allComments = data?.pages.flatMap((page) => page.comments) ?? [];

  return (
    <Comments
      formId={item.id}
      comments={allComments}
      loadMore={fetchNextPage}
      hasNextPage={hasNextPage ?? false}
      isFetching={isFetchingNextPage}
      isLoading={data?.pages.length === 0}
      totalCount={totalCount}
    />
  );
}
