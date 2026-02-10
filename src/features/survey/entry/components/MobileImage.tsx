import Image from "next/image";

/**
 * 모바일에서만 표시되는 폼 이미지 컴포넌트
 * @param img - 이미지 URL
 */
export function MobileImage({ img }: { img: string }) {
  if (!img) return null;
  return (
    <div className="-translate-x-1/2 relative left-1/2 w-screen overflow-hidden shadow md:hidden">
      <Image
        src={img}
        width={240}
        height={150}
        alt="form 이미지"
        className="max-h-[370px] w-full object-cover"
      />
    </div>
  );
}
