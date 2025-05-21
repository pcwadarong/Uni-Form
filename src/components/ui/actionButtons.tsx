"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import BookMark from "../svg/bookmark";
import Report from "../svg/report";
import Share from "../svg/share";

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
    <div className="mt-10 flex gap-5 font-bold">
      <Share onClick={handleShare} className="cursor-pointer" />
      <BookMark onClick={handleBookmark} className="cursor-pointer" />
      <Report onClick={handleReport} className="cursor-pointer" />
    </div>
  );
}
