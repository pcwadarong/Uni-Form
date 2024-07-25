interface Props {
  text: string;
  className: string;
  onClick: () => void;
  onMouseEnter?: () => void;
}

export default function Button({ text, className, onClick, onMouseEnter }: Props) {
  return (
    <button
      className={`py-2 px-8 rounded-md ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {text}
    </button>
  );
}
