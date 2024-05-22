export default function Special() {
  const point = 15;
  const date = 1;

  return (
    <div className="flex space-x-2">
      <span className="px-3 py-1.5 bg-lightRed text-center text-red text-xs rounded-md">
        {date ? `마감 ${date}일 전` : ''}
      </span>
      <span className="px-3 py-1.5 bg-primary text-center text-white text-xs rounded-md">
        {point ? `${point}P` : ''}
      </span>
    </div>
  );
}
