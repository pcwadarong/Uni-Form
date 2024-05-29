interface Props {
  text: string;
  className: string;
}

export default function Button({ text, className }: Props) {
  return <button className={`py-2 px-8 rounded-md ${className}`}>{text}</button>;
}
