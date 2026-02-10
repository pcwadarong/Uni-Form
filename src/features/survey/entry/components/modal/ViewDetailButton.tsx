import { LinkButton } from "@/features/shared/ui/button";

/**
 * 모달에서 상세 페이지로 이동하는 버튼 컴포넌트
 * @param encryptedId - 암호화된 폼 ID
 */
export function ViewDetailButton({ encryptedId }: { encryptedId: string }) {
  return (
    <div className="text-center">
      <LinkButton
        className="bg-green-100 text-green-500"
        href={`/entry/${encryptedId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        자세히 보기
      </LinkButton>
    </div>
  );
}
