"use client";

import { fetchCommentsClient } from "@/lib/firebase/form/get";
import formatDateUi from "@/lib/utils/formatDateUi";
import type { Detail } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import Comments from "./comment";

interface Props {
  encryptedId: string;
  item: Detail;
  initialComments: Comment[];
}

export default function EntryClient({ encryptedId, item, initialComments }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["comments", item.id],
    queryFn: async ({ pageParam }) => {
      return await fetchCommentsClient(item.id, 5, pageParam?.lastDoc);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? { lastDoc: lastPage.lastDoc } : undefined;
    },
    initialData: {
      pageParams: [undefined],
      pages: [
        {
          comments: initialComments,
          lastDoc: null,
          hasMore: true,
        },
      ],
    },
  });

  return (
    <Comments
      itemId={item.id}
      showMeta={true}
      startDate={formatDateUi(item.id, item.startDate)}
      endDate={formatDateUi(item.id, item.endDate)}
      responses={item.responses}
      comments={data.pages.flat()}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
