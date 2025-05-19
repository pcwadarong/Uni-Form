"use client";

import { useTheme } from "@/contexts/themeProvider";
import Dark from "../svg/dark";
import Light from "../svg/light";

export default function FloatingControls() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };

  const toTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const commonClass =
    "drop-shadow-md bg-surface w-11 h-11 rounded-full hover:bg-green-300 text-xl font-bold text-content/60 border border-gray-300";

  return (
    <div className="fixed bottom-10 right-10 leading-4 text-center sm:flex gap-3 hidden">
      <button type="button" className={commonClass} onClick={toTheTop} aria-label="위로 가기 버튼">
        ↑
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="테마 전환 버튼"
        className={`flex justify-center items-center ${commonClass}`}
      >
        {theme === "light" ? <Light /> : <Dark />}
      </button>
    </div>
  );
}
