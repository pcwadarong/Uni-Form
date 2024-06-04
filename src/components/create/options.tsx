import ToggleBtn from '../common/toggleBtn';

const Options: React.FC = () => {
  return (
    <div className="flex gap-2 justify-end border-t-[1px] border-gray-2 pt-2 mt-4">
      <button>복사</button>
      <button>삭제</button>
      <ToggleBtn text="답변 필수" />
    </div>
  );
};

export default Options;
