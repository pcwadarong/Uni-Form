export default function FormBlock({
  label,
  htmlFor,
  children,
  error,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="rounded-xl shadow-md bg-tone1 p-6 grow shrink-0">
      <label htmlFor={htmlFor} className="subtitle">
        {label}
      </label>
      {children}
      {error && <p className="caption text-red-500 mt-2">{error}</p>}
    </div>
  );
}
