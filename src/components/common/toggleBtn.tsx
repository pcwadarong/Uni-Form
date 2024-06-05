type ToggleBtnProps = {
  text: string;
  checked: boolean;
  onChange: () => void;
};

const ToggleBtn = ({ text, checked, onChange }: ToggleBtnProps) => {
  return (
    <label className="flex gap-2 items-center">
      <span>{text}</span>
      <button
        onClick={onChange}
        className={`w-[38px] rounded-full h-full overflow-hidden relative transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-gray-3'}`}
      >
        <div
          className={`w-5 bg-white h-5 rounded-full absolute top-0.5 transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0.5'}`}
        ></div>
      </button>
    </label>
  );
};

export default ToggleBtn;
