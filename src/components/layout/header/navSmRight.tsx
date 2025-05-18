import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RECRUIT_CATEGORY, SURVEY_CATEGORY } from "@/constants/category";
import useAuth from "@/hooks/useAuth";
import useHandleLogout from "@/hooks/useHandleLogout";
import Link from "next/link";

interface Props {
  isOpened: boolean;
  toggleCategory: () => void;
  closeMenu: () => void;
}

export default function NavSmRight({ isOpened, toggleCategory, closeMenu }: Props) {
  const handleLogout = useHandleLogout();
  const { user } = useAuth();

  const handleClickLink = () => closeMenu();

  return (
    <div
      className={`fixed inset-0 z-30 h-screen w-full transform overflow-auto bg-background p-8 pt-20 transition-transform duration-300 ease-out ${
        isOpened ? "translate-x-0" : "translate-x-full"
      }`}
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
                <Link
                  href="/auth/sign-in"
                  onClick={handleClickLink}
                  className="hover:text-green-400"
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/sign-up"
                  onClick={handleClickLink}
                  className="hover:text-green-400"
                >
                  회원가입
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
