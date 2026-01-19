import { RECRUIT_CATEGORY_LABELS, SURVEY_CATEGORY_LABELS } from "@/constants/category";
import { formatTextWithLineBreaks } from "@/features/shared/ui/formatTextWithLineBreaks";
import Reaction from "@/features/survey/form/components/reaction";
import formateDate from "@/lib/utils/formateDate";
import type { Form } from "@/types";

/**
 * 엔트리 페이지의 헤더 섹션 컴포넌트
 * 폼의 카테고리, 제목, 기간, 반응을 표시
 * @param item - 표시할 폼 데이터
 * @param type - 폼 타입 ("surveys" | "recruits")
 */
export function EntryHeader({ item, type }: { item: Form; type: string }) {
  const CATEGORY_LABELS = type === "surveys" ? SURVEY_CATEGORY_LABELS : RECRUIT_CATEGORY_LABELS;
  return (
    <div>
      <div className="subtitle mb-3 space-x-2 text-gray-400">
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
