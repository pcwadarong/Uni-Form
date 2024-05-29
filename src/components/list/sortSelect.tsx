interface SortSelectProps {
  onChangeSortType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
}

const SortSelect: React.FC<SortSelectProps> = ({ onChangeSortType, defaultValue }) => {
  return (
    <select className="dark:bg-gray-900" onChange={onChangeSortType} value={defaultValue}>
      <option className="option" value="point-asc">
        리워드 높은 순
      </option>
      {/* <option value="update-asc">끌올 순</option> */}
      <option value="random">랜덤 순</option>
      <option value="popular-asc">인기 순</option>
      <option value="date-desc">최신 순</option>
    </select>
  );
};

export default SortSelect;

//끌올의 경우 부가 기능으로 업데이트 예정