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
          checked ? "bg-green-300" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 bg-surface h-4 rounded-full absolute top-1 transition-transform duration-200 ${
            checked ? "translate-x-4.5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleBtn;
