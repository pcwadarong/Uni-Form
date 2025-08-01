import { fetchCommentsServer } from "@/lib/firebase/comment/getCommentsServer";
import { handleComments } from "@/lib/firebase/user/server/handler/handleComments";

export default async function Page() {
  const {
    comments: initialComments,
    lastDocId,
    hasNextPage: initialHasNextPage,
    totalCount,
  } = await handleComments();

  return <div>내 활동 보기</div>;
}
