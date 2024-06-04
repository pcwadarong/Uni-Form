'use client';
import { useState } from 'react';

type ToggleBtnProps = {
  text: string;
};

const ToggleBtn = ({ text }: ToggleBtnProps) => {
  const [toggle, setToggle] = useState(false);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <label className="flex gap-2 items-center">
      <span>{text}</span>
      <button
        onClick={clickedToggle}
        className={`w-[38px] rounded-full h-full overflow-hidden relative transition-colors duration-200 ${toggle ? 'bg-primary' : 'bg-gray-3'}`}
      >
        <div
          className={`w-5 bg-white h-5 rounded-full absolute top-0.5 transition-transform duration-200 ${toggle ? 'translate-x-4' : 'translate-x-0.5'}`}
        ></div>
      </button>
    </label>
  );
};

export default ToggleBtn;
