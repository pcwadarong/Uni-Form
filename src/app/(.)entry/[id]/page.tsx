import Reaction from "@/components/form/reaction";
import BubbleChat from "@/components/svg/bubble-chat";
import { LinkButton } from "@/components/ui/button";
import { formatTextWithLineBreaks } from "@/components/ui/formatTextWithLineBreaks";
import { fetchCommentsServer, fetchForm } from "@/lib/firebase/form/getServer";
import { decrypt } from "@/lib/utils/crypoto";
import formateDate from "@/lib/utils/formateDate";

import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EntryIntercept({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: encryptedId } = await params;
  const itemId = await decrypt(encryptedId, process.env.CRYPT_SECRET || "");
  if (!itemId) return notFound();
  const type = itemId.startsWith("survey") ? "surveys" : "recruits";

  const item = await fetchForm(type, itemId);
  const { comments: initialComments } = await fetchCommentsServer(item.id, 3);

  return (
    <main>
      <section className="space-y-3">
        <div className="md:hidden w-screen relative left-1/2 -translate-x-1/2 shadow overflow-hidden">
          {item.img && (
            <Image
              src={item.img}
              width={240}
              height={150}
              alt={"form 이미지"}
              className="w-full max-h-[370px] object-cover"
            />
          )}
        </div>
        <h2 className="title3 md:text-xl line-clamp-2">{item.title}</h2>
        <hr className="w-full border border-green-300" />
        {item.description && <p>{formatTextWithLineBreaks(item.description)}</p>}
        <div className="flex justify-between">
          <span className="caption text-gray-4 truncate">{`${formateDate(item.startDate, true)} ~ ${formateDate(item.endDate, true)}`}</span>
          <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
        </div>
      </section>

      <section className="relative mt-6 h-72 overflow-hidden">
        {initialComments && initialComments.length > 0 ? (
          <ul className="space-y-3">
            <div className="absolute bottom-0 w-full h-14 bg-gradient-to-t from-muted" />
            {initialComments.map((comment) => (
              <li
                key={comment.id}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-surface"
              >
                <span className="font-semibold">{comment.nickname}</span>
                <span className="ml-2 caption">
                  {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
                </span>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="min-h-52 border font-bold rounded-2xl opacity-20 flex flex-col justify-center items-center gap-4">
            <BubbleChat />
            <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
          </div>
        )}
      </section>

      <div className="text-center">
        <LinkButton className={"bg-green-100 text-green-500"} href={`/analyze/${encryptedId}`}>
          자세히 보기
        </LinkButton>
      </div>
    </main>
  );
}
