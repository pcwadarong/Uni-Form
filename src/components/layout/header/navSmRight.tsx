"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RECRUIT_CATEGORY, SURVEY_CATEGORY } from "@/constants/category";
import { useAuth } from "@/contexts/authProvider";
import useHandleLogout from "@/hooks/useHandleLogout";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  isOpened: boolean;
  toggleCategory: () => void;
  closeMenu: () => void;
}

export default function NavSmRight({ isOpened, toggleCategory, closeMenu }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpened)
      if (!dialog.open) dialog.showModal();
      else if (dialog.open) dialog.close();
  }, [isOpened]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-30 m-0 h-screen w-full transform overflow-auto bg-surface p-8 pt-20 transition-transform duration-300 ease-out open:translate-x-0 translate-x-full"
      onClose={closeMenu}
      aria-label="카테고리 사이드 메뉴"
    >
      <button
        type="button"
        onClick={toggleCategory}
        className="absolute right-9 top-8 text-2xl"
        aria-label="메뉴 닫기"
      >
        &times;
      </button>

      <div className="mr-1 flex flex-col">
        <CategoryAccordion closeMenu={closeMenu} />
        <UserLinks closeMenu={closeMenu} />
      </div>
    </dialog>
  );
}

function CategoryAccordion({ closeMenu }: { closeMenu: () => void }) {
  const handleClickLink = () => closeMenu();

  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>설문조사</AccordionTrigger>
        <AccordionContent>
          <ul className="grid grid-cols-2 gap-4">
            {Object.entries(SURVEY_CATEGORY).map(([label, path]) => (
              <li key={label}>
                <Link
                  href={`/survey/${path}`}
                  onClick={handleClickLink}
                  className="hover:text-green-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>모집공고</AccordionTrigger>
        <AccordionContent>
          <ul className="grid grid-cols-2 gap-4">
            {Object.entries(RECRUIT_CATEGORY).map(([label, path]) => (
              <li key={label}>
                <Link
                  href={`/survey/${path}`}
                  onClick={handleClickLink}
                  className="hover:text-green-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function UserLinks({ closeMenu }: { closeMenu: () => void }) {
  const { user } = useAuth();
  const handleLogout = useHandleLogout();
  const handleClickLink = () => closeMenu();

  return (
    <ul className="flex flex-col gap-4 border-t py-6">
      {user ? (
        <>
          <li>
            <Link href="/form" onClick={handleClickLink} className="hover:text-green-400">
              설문 페이지
            </Link>
          </li>
          <li>
            <Link href="/user" onClick={handleClickLink} className="hover:text-green-400">
              내 정보
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleLogout} className="hover:text-green-400">
              로그아웃
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/auth/sign-in" onClick={handleClickLink} className="hover:text-green-400">
              로그인
            </Link>
          </li>
          <li>
            <Link href="/auth/sign-up" onClick={handleClickLink} className="hover:text-green-400">
              회원가입
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
