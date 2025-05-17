import NotFound from "@/app/not-found";
import Reaction from "@/components/survey/reaction";
import BubbleChat from "@/components/svg/bubble-chat";
import { LinkButton } from "@/components/ui/button";
import { fetchCommentsServer, fetchFormInfo } from "@/lib/firebase/form/getServer";
import { decrypt, encrypt } from "@/lib/utils/crypoto";
import formatDateUi from "@/lib/utils/formatDateUi";
import { formatTextWithLineBreaks } from "@/lib/utils/formatTextWithLineBreaks";
import parseDateString from "@/lib/utils/parseDateString";
import Image from "next/image";
import EntryClient from "./entryClient";

export default async function Entry({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: encryptedId } = await params;
  const itemId = await decrypt(encryptedId, process.env.NEXT_PUBLIC_CRYPT_SECRET || "");
  const type = itemId.startsWith("survey") ? "surveys" : "recruits";

  const item = await fetchFormInfo(type, itemId);
  if (!item) return NotFound();

  const initialComments = await fetchCommentsServer(item.id, 5);

  const currentDate = new Date();
  const diffTime = parseDateString(item.id, item.endDate).getTime() - currentDate.getTime();

  return (
    <div className="p-4">
      <div className="m-auto w-full flex flex-col gap-3 max-w-[600px] max-h-full overflow-auto bg-gray-1 rounded-2xl shadow-2xl p-7 pt-25px md:p-30px md:pt-35px md:max-w-470px sm:max-w-screen">
        <div>
          <div>
            <span>{type === "surveys" ? "#설문조사" : "#모집공고"}</span>
            <span>{item.category}</span>
          </div>

          <h2 className="title3 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h2>
          <hr className="-mt-3 w-full border-green-300" />

          <div className="flex justify-between">
            <span className="caption text-gray-4 truncate">{`${formatDateUi(item.id, item.startDate)} ~ ${formatDateUi(item.id, item.endDate)}`}</span>
            <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
          </div>

          {item.description && (
            <span className="overflow-visible">{formatTextWithLineBreaks(item.description)}</span>
          )}
        </div>
        <div>
          {item.img && <Image src={item.img} width={200} height={150} alt={"form 이미지"} />}
          {item.isPublic && (
            <LinkButton
              className={"bg-green-light text-green-400"}
              href={`/analyze/${encryptedId}`}
            >
              결과보기
            </LinkButton>
          )}
          {diffTime && (
            <LinkButton
              className={"bg-green-light text-green-400"}
              href={`/response/${encryptedId}`}
            >
              참여하기
            </LinkButton>
          )}
          {/* {item.isEditable && <Button text={'수정하기'} className={'bg-green-300 text-white'} />} */}
        </div>
        {initialComments && initialComments.length > 0 ? (
          <EntryClient item={item} initialComments={initialComments} />
        ) : (
          <div className="h-52 border-[1px] border-gray-2 bg-white rounded-xl text-gray-3 flex flex-col gap-3 justify-center items-center">
            <BubbleChat />
            <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
          </div>
        )}
        <h3>비슷한 설문</h3>
        <div>비슷한 설문 3개 보여주기</div>
      </div>
    </div>
  );
}
