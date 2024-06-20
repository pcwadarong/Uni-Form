interface Props {
  text: string;
  className: string;
  onClick: () => void;
}

export default function Button({ text, className, onClick }: Props) {
  return (
    <button className={`py-2 px-8 rounded-md ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
