"use client";
import CircularProgress from "@/components/ui/circular";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <CircularProgress aria-label="불러오는 중입니다." />
    </div>
  );
}
