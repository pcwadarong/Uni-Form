interface SortSelectProps {
  onChangeSortType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
}

const SortSelectMini: React.FC<SortSelectProps> = ({ onChangeSortType, defaultValue }) => {
  return (
    <select className="dark:bg-gray-900" onChange={onChangeSortType} value={defaultValue}>
      {/* <option value="update-asc">끌올 순</option> */}
      <option value="random">랜덤 순</option>
      <option value="date-desc">최신 순</option>
    </select>
  );
};

export default SortSelectMini;

//끌올의 경우 부가 기능으로 업데이트 예정
