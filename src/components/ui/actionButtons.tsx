"use client";

import { useCallback } from "react";

export default function ActionButtons() {
  const handleShare = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch(() => {
        alert("복사에 실패했습니다. 수동으로 복사해주세요.");
      });
  }, []);

  const handleBookmark = useCallback(() => {
    alert("북마크 되었습니다.");
  }, []);

  const handleReport = useCallback(() => {
    alert("신고 접수되었습니다.");
  }, []);

  return (
    <div className="mt-10 space-x-8 font-bold">
      <button type="button" onClick={handleShare}>
        공유
      </button>
      <button type="button" onClick={handleBookmark}>
        북마크
      </button>
      <button type="button" onClick={handleReport}>
        신고
      </button>
    </div>
  );
}
