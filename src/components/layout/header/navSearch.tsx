"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
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
    <div className="relative flex-1 w-full ml-3">
      <Input
        className="w-full pr-10 bg-gray-300/20 focus:ring-2 focus:ring-green-300 subtitle"
        type="text"
        placeholder="관심사를 찾아보세요!"
        value={param}
        onChange={(e) => setParam(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
      >
        <Image src={"/search.svg"} alt="search" width="20" height="20" />
      </button>
    </div>
  );
}
