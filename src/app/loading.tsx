"use client";
import CircularProgress from "@/components/ui/circular";

export default function Loading() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <CircularProgress aria-label="불러오는 중입니다." />
    </div>
  );
}
