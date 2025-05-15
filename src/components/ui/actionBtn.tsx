'use client';
import Image from 'next/image';

export default function ActionBtns() {
  const toTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-10 right-10 leading-4 text-center sm:flex gap-3 hidden">
      <button
        type="button"
        className="drop-shadow-md border-gray-3 border-[1px] bg-white w-11 h-11 rounded-full focus:bg-green-300 text-xl"
        onClick={toTheTop}
        aria-label="위로 가기 버튼"
      >
        ↑
      </button>
      <button
        type="button"
        className="drop-shadow-md border-gray-3 border-[1px] bg-white w-11 h-11 rounded-full focus:bg-green-300 flex justify-center items-center"
      >
        <Image src={'./setting.svg'} alt="logo" width="20" height="20" />
      </button>
    </div>
  );
}
