"use client";

import type { Form } from "@/features/survey/types";
import getRandomColor from "@/features/survey/utils/getRandomColor";
import { useEncryptedEntryNavigation } from "@/features/user/hooks/useEncryptedEntryNavigation";
import formateDate from "@/lib/utils/formateDate";
import Image from "next/image";
import { useMemo } from "react";
import Reaction from "./reaction";
import Special from "./special";

interface FormCardItemProps {
  item: Form;
  type: "survey" | "recruit";
}

/**
 * 설문/모집 카드 아이템 컴포넌트
 * 설문 또는 모집공고 카드를 렌더링하고 상세 페이지로 이동
 * @param item - 표시할 설문/모집 데이터
 * @param type - 설문 또는 모집공고 구분
 */
export default function FormCardItem({ item, type }: FormCardItemProps) {
  const { navigate, handleKeyDown } = useEncryptedEntryNavigation();
  const backgroundClass = useMemo(() => getRandomColor(item.id), [item.id]);
  const showPoint = type === "survey";

  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => navigate(item.id)}
        onKeyDown={handleKeyDown(item.id)}
        className="flex h-90 w-full flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl text-left drop-shadow-md"
        aria-label={`${item.title} 상세보기`}
      >
        <div className={`h-36 w-full overflow-hidden bg-${backgroundClass}`}>
          {item.img && (
            <Image
              className="h-full w-full object-cover"
              src={item.img}
              alt={`${type === "survey" ? "설문" : "모집"} 이미지`}
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="flex w-full flex-1 flex-col justify-between bg-surface px-6 py-6 dark:bg-muted">
          <div>
            <Special endDate={item.endDate} point={item.point} showPoint={showPoint} />
            <h3 className="body1 mt-3 mb-2 line-clamp-2 md:text-xl">{item.title}</h3>
          </div>
          <p className="caption truncate text-gray-4">
            {`${formateDate(item.startDate, true)} ~ ${formateDate(item.endDate, true)}`}
          </p>
          {showPoint && (
            <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
          )}
        </div>
      </button>
    </li>
  );
}
