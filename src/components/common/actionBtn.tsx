'use client';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ActionBtns() {
  const toTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-10 right-10 leading-4 text-center flex gap-3">
      <button
        className="drop-shadow-md border-gray-3 border-[1px] bg-white w-11 h-11 rounded-full focus:bg-primary"
        onClick={toTheTop}
      >
        ↑
      </button>
      <button className="drop-shadow-md border-gray-3 border-[1px] bg-white w-11 h-11 rounded-full focus:bg-primary">
        <SettingsIcon />
      </button>
    </div>
  );
}
