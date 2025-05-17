"use client";

import formatDateUi from "@/lib/utils/formatDateUi";
import { getRandomColor } from "@/lib/utils/getRandomColor";
import { handleEnterKeyPress, openDetailModal } from "@/lib/utils/handleModal";
import type { Survey } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Reaction from "./reaction";
import Special from "./special";

const SurveyItem: React.FC<{ item: Survey }> = ({ item }) => {
  const router = useRouter();
  const [randomClass, setRandomClass] = useState("");

  useEffect(() => {
    setRandomClass(getRandomColor());
  }, []);

  return (
    <li
      className="drop-shadow flex flex-col flex-1 justify-between overflow-hidden rounded-3xl h-[360px] cursor-pointer"
      // onClick={() => openDetailModal(item)}
      onClick={() => router.push(`/entry/${item.id}`)}
      onKeyDown={handleEnterKeyPress(item)}
      role="button"
      tabIndex={0}
    >
      <div className={`h-36 w-full bg-${randomClass} overflow-hidden`}>
        {item.img && (
          <Image
            className="w-full h-full object-cover"
            src={item.img}
            alt={"이미지"}
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="px-6 py-7 flex flex-col justify-between bg-white flex-grow">
        <div>
          <Special id={item.id} point={item.point} endDate={item.endDate} />
          <h3 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h3>
          <p className="caption text-gray-4 truncate">{`${formatDateUi(
            item.id,
            item.startDate,
          )} ~ ${formatDateUi(item.id, item.endDate)}`}</p>
        </div>
        <Reaction responses={item.responses} comments={item.comments} />
      </div>
    </li>
  );
};

export default SurveyItem;
