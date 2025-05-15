import { type ChangeEvent, useEffect, useRef } from 'react';

interface AutoResizeTextareaProps {
  value: string | undefined;
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
      className={`resize-none overflow-hidden p-1 w-full focused_input ${className}`}
    />
  );
};

export default AutoResizeTextarea;
