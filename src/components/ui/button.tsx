interface Props {
  text: string;
  className: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  text,
  className,
  onClick,
  onMouseEnter,
  type = 'button',
}: Props) {
  return (
    <button
      type={type}
      className={`py-2 px-8 rounded-md ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {text}
    </button>
  );
}
