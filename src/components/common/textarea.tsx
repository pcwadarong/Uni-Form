import { useEffect, useRef, ChangeEvent } from 'react';

interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  placeholder = '',
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const resizeTextarea = () => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    textarea?.addEventListener('input', resizeTextarea);

    return () => {
      textarea?.removeEventListener('input', resizeTextarea);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      rows={1}
      className={`resize-none overflow-hidden p-1 w-full focus:outline-none hover:border-b-[1px] focus:border-b-[1px] hover:border-gray-3 focus:border-primary ${className}`}
    />
  );
};

export default AutoResizeTextarea;
