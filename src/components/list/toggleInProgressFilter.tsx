interface ToggleInProgressFilterProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleInProgressFilter: React.FC<ToggleInProgressFilterProps> = ({ checked, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        name="inProgress"
        id="inProgress"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="inProgress">
        <span className="block md:hidden">진행 중</span>
        <span className="hidden md:block">진행 중인 설문만 보기</span>
      </label>
    </div>
  );
};

export default ToggleInProgressFilter;
