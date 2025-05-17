import NotFound from "@/app/not-found";
import { LinkButton } from "@/components/ui/button";
import { fetchCommentsServer, fetchFormInfo } from "@/lib/firebase/form/get";
import { decrypt } from "@/lib/utils/crypotoUtils";

import { formatTextWithLineBreaks } from "@/lib/utils/formatTextWithLineBreaks";
import parseDateString from "@/lib/utils/parseDateString";
import EntryClient from "./entryClient";

type Props = {
  params: { id: string };
};

export default async function Entry({ params }: Props) {
  const { id: encryptedId } = params;
  const itemId = decrypt(encryptedId);
  const type = itemId.startsWith("survey") ? "surveys" : "recruits";

  const item = await fetchFormInfo(type, itemId);
  if (!item) return NotFound();

  const initialComments = await fetchCommentsServer(item.id, 5);

  const currentDate = new Date();
  const diffTime = parseDateString(item.id, item.endDate).getTime() - currentDate.getTime();

  return (
    <div className="p-4">
      <div className="m-auto w-full flex flex-col gap-3 max-w-[600px] max-h-full overflow-auto bg-gray-1 rounded-2xl shadow-2xl p-7 pt-25px md:p-30px md:pt-35px md:max-w-470px sm:max-w-screen">
        <h4 className="title3 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h4>
        <hr className="-mt-3 w-full border-green-300" />
        {item.description && (
          <span className="overflow-visible">{formatTextWithLineBreaks(item.description)}</span>
        )}
        {"comments" in item && (
          <EntryClient encryptedId={encryptedId} item={item} initialComments={initialComments} />
        )}
        <div className="flex justify-center gap-2 mt-4">
          {"isPublic" in item && item.isPublic && (
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
      </div>
    </div>
  );
}
