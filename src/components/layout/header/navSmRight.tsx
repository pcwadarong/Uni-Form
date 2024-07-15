import Link from 'next/link';
import Image from 'next/image';
import { SURVEY_CATEGORY, RECRUIT_CATEGORY } from '@/constants/category';
import { useAuthStore } from '@/store/auth';
import useHandleLogout from '@/hooks/useHandleLogout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  isOpened: boolean;
  toggleCategory: () => void;
  closeMenu: () => void;
}

export default function NavSmRight({ isOpened, toggleCategory, closeMenu }: Props) {
  const { user } = useAuthStore();
  const handleLogout = useHandleLogout();

  return (
    <div>
      <div
        className={`bg-white fixed top-0 right-0 w-96 max-w-full h-screen z-30 p-8 overflow-auto transform ${isOpened ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-out`}
      >
        <button
          onClick={toggleCategory}
          className="absolute right-8 top-8 text-gray-4 hover:text-dark"
        >
          <Image src={'./cancel.svg'} alt="no comments" width="20" height="20" />
        </button>
        <Link href="/" className="flex items-start gap-2 mb-4" onClick={closeMenu}>
          <Image src={'/logo.svg'} alt="logo" width="30" height="20" priority={true} />
          <span>Uni Form</span>
        </Link>
        <div className="flex flex-col mr-1">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>설문조사</AccordionTrigger>
              <AccordionContent>
                <ul className="grid grid-cols-2 gap-4">
                  {Object.entries(SURVEY_CATEGORY).map(([key, value]) => (
                    <li key={key} className="hover:text-font">
                      <Link href={`/survey/${value}`} onClick={() => closeMenu()}>
                        {key}
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
                  {Object.entries(RECRUIT_CATEGORY).map(([key, value]) => (
                    <li key={key} className="hover:text-font">
                      <Link href={`/survey/${value}`} onClick={() => closeMenu()}>
                        {key}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ul className="gap-4 flex flex-col border-t-[1px] py-6">
            {user ? (
              <>
                <li>
                  <Link className="hover:text-font" href="/form" onClick={() => closeMenu()}>
                    설문 페이지
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-font" href="/user" onClick={() => closeMenu()}>
                    내 정보
                  </Link>
                </li>
                <li>
                  <button className="hover:text-font" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/sign-in"
                    className="hover:text-font"
                    onClick={() => closeMenu()}
                  >
                    로그인
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/sign-up"
                    className="hover:text-font"
                    onClick={() => closeMenu()}
                  >
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div
        onClick={toggleCategory}
        className={`fixed inset-0 h-screen z-20 bg-dark/70 transition-opacity duration-300 ${isOpened ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />
    </div>
  );
}
