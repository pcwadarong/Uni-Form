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
      ref={dialogRef}
      onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === e.currentTarget) {
          router.back();
        }
      }}
      onClose={() => router.back()}
      onKeyDown={() => {}}
      className="m-auto flex max-h-full w-screen flex-col gap-3 overflow-auto rounded-2xl bg-muted p-7 pt-[25px] shadow-2xl backdrop:bg-black/70 sm:w-[470px] md:p-[30px] md:pt-[35px]"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="title2 absolute right-6 top-6 -m-4 p-4 text-gray-400 hover:text-green-300"
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
