type ToggleBtnProps = {
  text: string;
  checked: boolean | undefined;
  onChange: () => void;
};

const ToggleBtn = ({ text, checked = false, onChange }: ToggleBtnProps) => {
  return (
    <div className="flex gap-2 items-center h-6">
      <span>{text}</span>
      <button
        type="button"
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        aria-label={text}
        className={`w-[38px] rounded-full h-full overflow-hidden relative transition-colors duration-200 ${
          checked ? 'bg-primary' : 'bg-gray-3'
        }`}
      >
        <div
          className={`w-5 bg-white h-5 rounded-full absolute top-0.5 transition-transform duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleBtn;
