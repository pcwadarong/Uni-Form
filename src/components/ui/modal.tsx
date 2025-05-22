"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === e.currentTarget) {
          router.back();
        }
      }}
      onClose={() => router.back()}
      onKeyDown={() => {}}
      ref={dialogRef}
      className="w-screen sm:w-[470px] max-h-full p-7 pt-25px md:p-30px md:pt-35px m-auto flex flex-col gap-3 overflow-auto bg-muted rounded-2xl shadow-2xl backdrop:bg-black/70"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute right-6 top-6 text-gray-400 hover:text-green-300 p-4 -m-4 title2"
        aria-label="모달 닫기"
      >
        &times;
      </button>
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement,
  );
};

export default Modal;
