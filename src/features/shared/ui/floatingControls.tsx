"use client";

import { useTheme } from "@/features/shared/contexts/themeProvider";
import Dark from "@/features/shared/icons/dark";
import Light from "@/features/shared/icons/light";

export default function FloatingControls() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const commonClass =
    "w-11 h-11 rounded-full border border-gray-300 bg-surface text-xl font-bold text-content/60 drop-shadow-md hover:bg-green-300";

  return (
    <div className="fixed right-10 bottom-10 hidden gap-3 text-center leading-4 sm:flex">
      <button type="button" className={commonClass} onClick={toTheTop} aria-label="위로 가기 버튼">
        ↑
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="테마 전환 버튼"
        className={`flex items-center justify-center ${commonClass}`}
      >
        {theme === "light" ? <Light /> : <Dark />}
      </button>
    </div>
  );
}
