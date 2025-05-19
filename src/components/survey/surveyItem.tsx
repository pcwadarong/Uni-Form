"use client";

import { encrypt } from "@/lib/utils/crypoto";
import formatDateUi from "@/lib/utils/formatDateUi";
import { getRandomColor } from "@/lib/utils/getRandomColor";
import type { Form } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Reaction from "./reaction";
import Special from "./special";

export default function SurveyItem({ item }: { item: Form }) {
  const router = useRouter();
  const backgroundClass = useMemo(() => getRandomColor(), []);

  const handleClick = async () => {
    const encryptedId = await encrypt(
      "survey-2024-07-21T03:14:29.823Z",
      process.env.NEXT_PUBLIC_CRYPT_SECRET || "",
    );
    router.push(`/entry/${encryptedId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      className="drop-shadow flex flex-col flex-1 justify-between overflow-hidden rounded-3xl h-[360px] cursor-pointer text-left"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={`h-36 w-full bg-${backgroundClass} overflow-hidden`}>
        {item.img && (
          <Image
            className="w-full h-full object-cover"
            src={item.img}
            alt="설문 이미지"
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="px-6 py-7 flex flex-col justify-between bg-surface dark:bg-muted flex-grow">
        <div>
          <Special id={item.id} point={item.point} endDate={item.endDate} />
          <h3 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h3>
          <p className="caption text-gray-4 truncate">
            {`${formatDateUi(item.id, item.startDate)} ~ ${formatDateUi(item.id, item.endDate)}`}
          </p>
        </div>
        <Reaction responsesCount={item.responsesCount} commentsCount={item.commentsCount} />
      </div>
    </button>
  );
}
