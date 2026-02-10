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

  return (
    <form
      className="relative ml-3 w-full flex-1"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <label htmlFor="global-search" className="sr-only">
        통합 검색
      </label>
      <Input
        id="global-search"
        className="subtitle w-full bg-gray-300/20 pr-10 focus:ring-2 focus:ring-green-300"
        type="search"
        placeholder="관심사를 찾아보세요!"
        value={param}
        onChange={(e) => setParam(e.target.value)}
      />
      <button
        type="submit"
        className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer"
      >
        <SVGIcon name="SearchIcon" className="text-green-400" />
      </button>
    </form>
  );
}
