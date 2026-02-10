"use client";

import SVGIcon from "@/features/shared/icons/icons";
import { useCallback } from "react";
import { toast } from "sonner";

export default function ActionButtons() {
  const handleShare = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("링크가 복사되었습니다.");
      })
      .catch(() => {
        toast("복사에 실패했습니다. 수동으로 복사해주세요.");
      });
  }, []);

  const handleBookmark = useCallback(() => {
    toast("북마크 되었습니다.");
  }, []);

  const handleReport = useCallback(() => {
    toast("신고 접수되었습니다.");
  }, []);

  return (
    <menu className="mt-10 flex gap-5 font-bold">
      <li>
        <button
          type="button"
          onClick={handleShare}
          className="cursor-pointer"
          aria-label="공유하기"
        >
          <SVGIcon name="ShareIcon" />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={handleBookmark}
          className="cursor-pointer"
          aria-label="북마크하기"
        >
          <SVGIcon name="BookmarkIcon" />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={handleReport}
          className="cursor-pointer"
          aria-label="신고하기"
        >
          <SVGIcon name="ReportIcon" />
        </button>
      </li>
    </menu>
  );
}
