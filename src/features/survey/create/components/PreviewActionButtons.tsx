"use client";

import { Button } from "@/features/shared/ui/button";
import { memo, useCallback } from "react";

/**
 * 미리보기 액션 버튼 UI 컴포넌트
 * 양식 지우기 핸들러를 props로 받아 렌더링
 * @param onClearForm - 양식 지우기 핸들러
 */
export const PreviewActionButtons = memo(function PreviewActionButtons({
  onClearForm,
}: {
  onClearForm: () => void;
}) {
  return (
    <div className="flex" aria-label="폼 액션 버튼 그룹">
      <div className="flex-1" />
      <div className="flex-1 text-center">
        <Button className="bg-green-400 text-white" aria-label="폼 제출">
          제출
        </Button>
      </div>
      <div className="flex-1 text-end">
        <button
          type="button"
          className="rounded-md p-3 hover:bg-dark/5"
          onClick={onClearForm}
          aria-label="양식 지우기"
        >
          양식 지우기
        </button>
      </div>
    </div>
  );
});
