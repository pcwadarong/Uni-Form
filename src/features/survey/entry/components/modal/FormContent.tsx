import { formatTextWithLineBreaks } from "@/features/shared/ui/formatTextWithLineBreaks";
import Reaction from "@/features/survey/form/components/reaction";
import formatDate from "@/lib/utils/formateDate";
import type { Form } from "@/types";
import Image from "next/image";

/**
 * 모달 내에서 폼 정보를 표시하는 컴포넌트
 * @param item - 표시할 폼 데이터
 */
export function FormContent({ item }: { item: Form }) {
  return (
    <section className="space-y-3">
      <div className="-translate-x-1/2 relative left-1/2 w-screen overflow-hidden shadow md:hidden">
        {item.img && (
          <Image
            src={item.img}
            width={240}
            height={150}
            alt="form 이미지"
            className="max-h-[370px] w-full object-cover"
          />
        )}
      </div>
      <h2 className="title3 line-clamp-2 md:text-xl">{item.title}</h2>
      <hr className="w-full border border-green-300" />
      {item.description && <p>{formatTextWithLineBreaks(item.description)}</p>}
      <div className="flex justify-between">
        <span className="caption truncate text-gray-4">
          {`${formatDate(item.startDate, true)} ~ ${formatDate(item.endDate, true)}`}
        </span>
        <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
      </div>
    </section>
  );
}
