import { fetchComment } from "@/lib/firebase/form/getServer";
import CommentCardClient from "./commentCardClient";

export default async function CommentItem({ id }: { id: string }) {
  const comment = await fetchComment(id);

  if (!comment) return null;

  return (
    <CommentCardClient
      id={id}
      title={comment.formTitle?? "제목 없음"}
      content={comment.content}
    />
  );
}
