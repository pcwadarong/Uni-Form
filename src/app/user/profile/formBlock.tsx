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
    <div className="shrink-0 grow rounded-xl bg-tone1 p-6 shadow-md">
      <label htmlFor={htmlFor} className="subtitle">
        {label}
      </label>
      {children}
      {error && <p className="caption mt-2 text-red-500">{error}</p>}
    </div>
  );
}
