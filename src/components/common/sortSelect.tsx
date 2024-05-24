interface SortSelectProps {
  onChangeSortType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ onChangeSortType }) => {
  return (
    <select className="dark:bg-gray-900" onChange={onChangeSortType}>
      <option className="option" value="Recommendations">
        Recommendations
      </option>
      <option value="New Item">New Item</option>
      <option value="Price ascending">Price ascending</option>
      <option value="Price descending">Price descending</option>
    </select>
  );
};

export default SortSelect;
