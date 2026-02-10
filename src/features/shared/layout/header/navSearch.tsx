"use client";

import SVGIcon from "@/features/shared/icons/icons";
import { Input } from "@/features/shared/ui/input";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export default function NavSearch() {
  const [param, setParam] = useState("");
  const router = useRouter();
  const searchInputId = useId();

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
    <form
      className="relative ml-3 w-full flex-1"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <label htmlFor={searchInputId} className="sr-only">
        설문 및 모집공고 검색
      </label>
      <Input
        id={searchInputId}
        className="subtitle w-full bg-gray-300/20 pr-10 focus:ring-2 focus:ring-green-300"
        type="search"
        placeholder="관심사를 찾아보세요!"
        value={param}
        onChange={(e) => setParam(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer"
        aria-label="검색"
      >
        <SVGIcon name="SearchIcon" className="text-green-400" />
      </button>
    </form>
  );
}
