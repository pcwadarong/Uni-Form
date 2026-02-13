import { LinkButton } from "@/features/shared/ui/button";
import type { Form } from "@/types";
import Image from "next/image";

interface EntryAsideProps {
  item: Form;
  encryptedId: string;
  hasAnswered: boolean;
}

/**
 * 엔트리 페이지의 사이드바 컴포넌트
 * 이미지, 결과보기 버튼, 참여/수정하기 버튼을 표시
 * @param item - 폼 데이터
 * @param encryptedId - 암호화된 폼 ID
 * @param hasAnswered - 사용자가 이미 응답했는지 여부
 */
export function EntryAside({ item, encryptedId, hasAnswered }: EntryAsideProps) {
  return (
    <aside className="flex w-full gap-3 md:w-60 md:flex-col">
      {item.img && (
        <Image
          src={item.img}
          width={240}
          height={150}
          alt="form 이미지"
          className="hidden rounded-md border border-gray-300 md:flex"
          priority
        />
      )}
      {item.isPublic && (
        <LinkButton className="w-full bg-green-100 text-green-500" href={`/analyze/${encryptedId}`}>
          결과보기
        </LinkButton>
      )}
      {item.endDate - Date.now() > 0 &&
        (hasAnswered ? (
          <LinkButton
            className="w-full bg-green-400 text-white"
            href={`/edit-response/${encryptedId}`}
          >
            수정하기
          </LinkButton>
        ) : (
          <LinkButton className="w-full bg-green-400 text-white" href={`/response/${encryptedId}`}>
            참여하기
          </LinkButton>
        ))}
    </aside>
  );
}
