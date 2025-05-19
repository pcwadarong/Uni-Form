"use client";

import { useEncryptedEntryNavigation } from "@/hooks/useEncryptedEntryNavigation";
import formatDateUi from "@/lib/utils/formatDateUi";
import { getColorById } from "@/lib/utils/getRandomColor";
import type { Form } from "@/types";
import Image from "next/image";
import { useMemo } from "react";
import Reaction from "./reaction";
import Special from "./special";

interface FormCardItemProps {
  item: Form;
  type: "survey" | "recruit";
}

export default function FormCardItem({ item, type }: FormCardItemProps) {
  const { navigate, handleKeyDown } = useEncryptedEntryNavigation(type);
  const backgroundClass = useMemo(() => getColorById(item.id), [item]);
  const showPoint = type === "survey";

  return (
    <button
      type="button"
      className="drop-shadow-md flex flex-col flex-1 justify-between overflow-hidden rounded-3xl h-[360px] cursor-pointer text-left"
      onClick={() => navigate(item.id)}
      onKeyDown={handleKeyDown(item.id)}
      tabIndex={0}
    >
      <div className={`h-36 w-full bg-${backgroundClass} overflow-hidden`}>
        {item.img && (
          <Image
            className="w-full h-full object-cover"
            src={item.img}
            alt={`${type === "survey" ? "설문" : "모집"} 이미지`}
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="px-6 py-6 flex flex-col justify-between bg-surface dark:bg-muted flex-1 w-full">
        <div>
          <Special id={item.id} endDate={item.endDate} point={item.point} showPoint={showPoint} />
          <h3 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h3>
        </div>
        <p className="caption text-gray-4 truncate">
          {`${formatDateUi(item.id, item.startDate)} ~ ${formatDateUi(item.id, item.endDate)}`}
        </p>
        {showPoint && (
          <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
        )}
      </div>
    </button>
  );
}
