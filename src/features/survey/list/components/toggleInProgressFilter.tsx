interface ToggleInProgressFilterProps {
  checked: boolean;
  onChange: () => void;
}

/**
 * 진행 중 필터 토글 컴포넌트
 * 진행 중인 설문/모집만 필터링하는 체크박스
 * @param checked - 체크 상태
 * @param onChange - 변경 핸들러
 */
const ToggleInProgressFilter: React.FC<ToggleInProgressFilterProps> = ({ checked, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="cursor-pointer"
        name="inProgress"
        id="inProgress"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="inProgress" className="cursor-pointer">
        <span className="block text-sm md:hidden">진행 중</span>
        <span className="hidden md:block">진행 중인 설문만 보기</span>
      </label>
    </div>
  );
};

export default ToggleInProgressFilter;
