type ToggleBtnProps = {
  text: string;
  checked: boolean | undefined;
  onChange: () => void;
};

const ToggleBtn = ({ text, checked = false, onChange }: ToggleBtnProps) => {
  return (
    <div className="flex h-6 items-center gap-2">
      <span>{text}</span>
      <button
        type="button"
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        aria-label={text}
        className={`relative h-full w-[38px] overflow-hidden rounded-full transition-colors duration-200 ${
          checked ? "bg-green-300" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 h-4 w-4 rounded-full bg-surface transition-transform duration-200 ${
            checked ? "translate-x-[18px]" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleBtn;
