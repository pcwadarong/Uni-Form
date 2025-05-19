import BubbleChat from "@/components/svg/bubble-chat";

import Reaction from "@/components/survey/reaction";
import ActionButtons from "@/components/ui/actionButtons";
import { LinkButton } from "@/components/ui/button";
import EntryClient from "./entryClient";

import { RECRUIT_CATEGORY_LABELS, SURVEY_CATEGORY_LABELS } from "@/constants/category";

import { fetchCommentsServer, fetchFormInfo } from "@/lib/firebase/form/getServer";
import { decrypt } from "@/lib/utils/crypoto";
import formatDateUi from "@/lib/utils/formatDateUi";
import { formatTextWithLineBreaks } from "@/lib/utils/formatTextWithLineBreaks";
import parseDateString from "@/lib/utils/parseDateString";

import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Entry({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: encryptedId } = await params;
  const itemId = await decrypt(encryptedId, process.env.CRYPT_SECRET || "");
  if (!itemId) return notFound();
  const type = itemId.startsWith("survey") ? "surveys" : "recruits";
  const CATEGORY_LABELS = type === "surveys" ? SURVEY_CATEGORY_LABELS : RECRUIT_CATEGORY_LABELS;

  const item = await fetchFormInfo(type, itemId);
  const {
    comments: initialComments,
    lastDocId,
    hasNextPage: initialHasNextPage,
    totalCount,
  } = await fetchCommentsServer(item.id, 5);
  const currentDate = new Date();
  const diffTime = parseDateString(item.id, item.endDate).getTime() - currentDate.getTime();

  return (
    <div className="bg-surface dark:bg-muted m-y-auto w-full max-w-[1200px] shadow px-14 md:pt-20 pb-10 space-y-20">
      <section className="flex flex-col md:flex-row gap-10">
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
        <main className="flex flex-col justify-between">
          <div>
            <div className="space-x-2 text-gray-400 subtitle mb-3">
              <span>{type === "surveys" ? "#설문조사" : "#모집공고"}</span>
              <span>{`#${CATEGORY_LABELS[item.category]}`}</span>
            </div>

            <h2 className="title3 md:text-xl line-clamp-2">{item.title}</h2>
            <hr className="w-full max-w-120 border border-green-300 mt-2 mb-3" />

            <div className="flex gap-3 mb-4">
              <span className="caption text-gray-4 truncate">{`${formatDateUi(item.id, item.startDate)} ~ ${formatDateUi(item.id, item.endDate)}`}</span>
              <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
            </div>

            {item.description && <p>{formatTextWithLineBreaks(item.description)}</p>}
          </div>
          <ActionButtons />
        </main>

        <aside className="flex md:flex-col w-full md:w-60 gap-3">
          {item.img && (
            <Image
              src={item.img}
              width={240}
              height={150}
              alt={"form 이미지"}
              className="hidden md:flex border border-gray-300 rounded-md"
            />
          )}
          {item.isPublic && (
            <LinkButton
              className={"bg-green-100 text-green-500 w-full"}
              href={`/analyze/${encryptedId}`}
            >
              결과보기
            </LinkButton>
          )}
          {diffTime && (
            <LinkButton
              className={"bg-green-400 text-white w-full"}
              href={`/response/${encryptedId}`}
            >
              참여하기
            </LinkButton>
          )}
          {/* {item.isEditable && <Button text={'수정하기'} className={'bg-green-300 text-white'} />} */}
        </aside>
      </section>

      {initialComments && initialComments.length > 0 ? (
        <EntryClient
          item={item}
          initialComments={initialComments}
          lastDocId={lastDocId}
          initialHasNextPage={initialHasNextPage}
          totalCount={totalCount}
        />
      ) : (
        <section className="min-h-52 border font-bold rounded-2xl opacity-20 flex flex-col justify-center items-center gap-4">
          <BubbleChat />
          <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
        </section>
      )}

      <section>
        <h3>비슷한 설문</h3>
        <div>비슷한 설문 3개 보여주기</div>
      </section>
    </div>
  );
}
