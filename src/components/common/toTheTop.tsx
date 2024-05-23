'use client';

export default function ToTheTop() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className="fixed bottom-10 right-10 drop-shadow-md border-gray-3 leading-10 bg-white w-10 h-10 text-center rounded-full"
      onClick={handleClick}
    >
      ↑
    </button>
  );
}
