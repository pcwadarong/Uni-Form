import SVGIcon from "@/features/shared/icons/icons";

/**
 * 콘텐츠 없음 UI 컴포넌트
 * 검색 결과가 없을 때 표시되는 빈 상태 메시지
 */
const NoContent = () => {
  return (
    <div className="mt-10 flex flex-col items-center text-gray-500">
      <SVGIcon name="BubbleChatIcon" width={80} height={78} color="#9CA3AF" />
      <p className="body2 mt-5 text-center text-gray-4">
        해당하는 설문이 없습니다. 다른 조건으로 검색해보세요.
      </p>
    </div>
  );
};

export default NoContent;
