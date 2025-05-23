import Reaction from "@/components/form/reaction";
import ActionButtons from "@/components/ui/actionButtons";
import { LinkButton } from "@/components/ui/button";
import CreateComments from "./comment/createComment";
import EntryClient from "./comment/entryClient";
import SimilarForms from "./similarForms";

import BubbleChat from "@/components/svg/bubble-chat";
import { formatTextWithLineBreaks } from "@/components/ui/formatTextWithLineBreaks";
import { RECRUIT_CATEGORY_LABELS, SURVEY_CATEGORY_LABELS } from "@/constants/category";
import type { Comment, Form } from "@/types/types";

import { getServerUid } from "@/lib/firebase/auth/getServerUid";
import { fetchCommentsServer } from "@/lib/firebase/comment/getCommentsServer";
import { fetchForm, fetchSimilarForms } from "@/lib/firebase/form/getFormServer";
import { handleAnsweredFormIds } from "@/lib/firebase/user/handlers/handleAnsweredFormIds";
import { decrypt } from "@/lib/utils/crypoto";
import formateDate from "@/lib/utils/formateDate";

import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Entry({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 주소창 해석해서 formId 알아내기
  const { id: encryptedId } = await params;
  const itemId = await decrypt(encryptedId, process.env.CRYPT_SECRET || "");
  if (!itemId) return notFound();

  // 해당하는 doc에서 데이터 가져오기
  const type = itemId.startsWith("survey") ? "surveys" : "recruits";
  const item = await fetchForm(type, itemId);

  // 초기 댓글 5개 + 1개 매칭하여 가져오기
  const {
    comments: initialComments,
    lastDocId,
    hasNextPage: initialHasNextPage,
    totalCount,
  } = await fetchCommentsServer(item.id, 5);

  // 현재 로그인한 사용자가 대답한 설문인지 확인하기
  const currentUid = await getServerUid();
  const answeredFormIds = currentUid ? await handleAnsweredFormIds(currentUid) : [];
  const hasAnswered = answeredFormIds.includes(item.id);

  return (
    <div className="m-y-auto w-full max-w-[1200px] px-14 pb-10 space-y-20 shadow bg-surface dark:bg-muted">
      <section className="flex flex-col gap-10 md:flex-row">
        <MobileImage img={item.img ?? ""} />

        <main className="flex flex-col justify-between">
          <EntryHeader item={item} type={type} />
          <ActionButtons />
        </main>

        <EntryAside item={item} encryptedId={encryptedId} hasAnswered={hasAnswered} />
      </section>

      <EntryCommentSection
        item={item}
        initialComments={initialComments}
        lastDocId={lastDocId}
        initialHasNextPage={initialHasNextPage}
        totalCount={totalCount}
      />

      <SimilarForms itemId={itemId} category={item.category} />
    </div>
  );
}

function EntryHeader({ item, type }: { item: Form; type: string }) {
  const CATEGORY_LABELS = type === "surveys" ? SURVEY_CATEGORY_LABELS : RECRUIT_CATEGORY_LABELS;
  return (
    <div>
      <div className="mb-3 space-x-2 text-gray-400 subtitle">
        <span>{type === "surveys" ? "#설문조사" : "#모집공고"}</span>
        <span>{`#${CATEGORY_LABELS[item.category]}`}</span>
      </div>
      <h2 className="title3 line-clamp-2 md:text-xl">{item.title}</h2>
      <hr className="mt-2 mb-3 w-full max-w-120 border border-green-300" />
      <div className="mb-4 flex gap-3">
        <span className="caption truncate text-gray-4">
          {`${formateDate(item.startDate, true)} ~ ${formateDate(item.endDate, true)}`}
        </span>
        <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
      </div>
      {item.description && <p>{formatTextWithLineBreaks(item.description)}</p>}
    </div>
  );
}

function EntryAside({
  item,
  encryptedId,
  hasAnswered,
}: {
  item: Form;
  encryptedId: string;
  hasAnswered: boolean;
}) {
  return (
    <aside className="flex w-full gap-3 md:w-60 md:flex-col">
      {item.img && (
        <Image
          src={item.img}
          width={240}
          height={150}
          alt="form 이미지"
          className="hidden rounded-md border border-gray-300 md:flex"
        />
      )}
      {item.isPublic && (
        <LinkButton className="w-full bg-green-100 text-green-500" href={`/analyze/${encryptedId}`}>
          결과보기
        </LinkButton>
      )}
      {item.endDate - Date.now() > 0 &&
        (hasAnswered ? (
          <LinkButton
            className="w-full bg-blue-400 text-white"
            href={`/edit-response/${encryptedId}`}
          >
            수정하기
          </LinkButton>
        ) : (
          <LinkButton className="w-full bg-green-400 text-white" href={`/response/${encryptedId}`}>
            참여하기
          </LinkButton>
        ))}
    </aside>
  );
}

function EntryCommentSection({
  item,
  initialComments,
  lastDocId,
  initialHasNextPage,
  totalCount,
}: {
  item: Form;
  initialComments: Comment[];
  lastDocId: string | null;
  initialHasNextPage: boolean;
  totalCount: number;
}) {
  return (
    <>
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
          <BubbleChat />
          <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
        </section>
      )}
    </>
  );
}

function MobileImage({ img }: { img: string }) {
  if (!img) return null;
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden shadow md:hidden">
      <Image
        src={img}
        width={240}
        height={150}
        alt="form 이미지"
        className="max-h-[370px] w-full object-cover"
      />
    </div>
  );
}
