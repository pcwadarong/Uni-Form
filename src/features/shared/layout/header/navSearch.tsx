"use client";

import SVGIcon from "@/features/shared/icons/icons";
import { Input } from "@/features/shared/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavSearch() {
  const [param, setParam] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!param.trim()) return;
    router.push(`/search?query=${encodeURIComponent(param)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative ml-3 w-full flex-1">
      <Input
        className="subtitle w-full bg-gray-300/20 pr-10 focus:ring-2 focus:ring-green-300"
        type="text"
        placeholder="관심사를 찾아보세요!"
        value={param}
        onChange={(e) => setParam(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer"
        onClick={handleSearch}
      >
        <SVGIcon name="SearchIcon" className="text-green-400" />
      </button>
    </div>
  );
}
