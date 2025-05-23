"use client";

import { useEncryptedEntryNavigation } from "@/hooks/useEncryptedEntryNavigation";
import formateDate from "@/lib/utils/formateDate";
import getColorById from "@/lib/utils/getRandomColor";
import type { Form } from "@/types/types";
import Image from "next/image";
import { useMemo } from "react";
import Reaction from "./reaction";
import Special from "./special";

interface FormCardItemProps {
  item: Form;
  type: "survey" | "recruit";
}

export default function FormCardItem({ item, type }: FormCardItemProps) {
  const { navigate, handleKeyDown } = useEncryptedEntryNavigation();
  const backgroundClass = useMemo(() => getColorById(item.id), [item]);
  const showPoint = type === "survey";

  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => navigate(item.id)}
        onKeyDown={handleKeyDown(item.id)}
        className="flex h-[360px] w-full flex-1 flex-col justify-between overflow-hidden rounded-3xl text-left drop-shadow-md cursor-pointer"
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
        <div className="flex w-full flex-1 flex-col justify-between px-6 py-6 bg-surface dark:bg-muted">
          <div>
            <Special endDate={item.endDate} point={item.point} showPoint={showPoint} />
            <h3 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h3>
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
