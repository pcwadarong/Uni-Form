import Link from 'next/link';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';
import { SURVEY_CATEGORY, RECRUIT_CATEGORY } from '@/constants/category';

interface Props {
  isOpened: boolean;
  toggleCategory: () => void;
  closeMenu: () => void;
}

export default function MobileMenu({ isOpened, toggleCategory, closeMenu }: Props) {
  return (
    <div>
      <div
        className={`bg-white fixed top-0 right-0 w-96 max-w-full h-screen z-50 p-8 overflow-auto transform ${isOpened ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-out`}
      >
        <button onClick={toggleCategory} className="absolute right-8 top-8 text-gray-400">
          <ClearIcon />
        </button>
        <Link href="/" className="flex items-start gap-2 mb-6" onClick={closeMenu}>
          <Image src={'/logo.svg'} alt="logo" width="30" height="20" priority={true} />
          <span>Uni Form</span>
        </Link>
        <ul className="flex flex-col gap-4">
          <li>
            <p className="font-semibold mb-4">설문조사</p>
            <ul className="text-sm flex flex-wrap">
              {Object.entries(SURVEY_CATEGORY).map(([key, value]) => (
                <li key={key} className="w-1/2 hover:text-font mb-4">
                  <Link href={`survey/${value}`} onClick={closeMenu}>
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className="font-semibold mb-4">모집공고</p>
            <ul className="text-sm flex flex-wrap">
              {Object.entries(RECRUIT_CATEGORY).map(([key, value]) => (
                <li key={key} className="w-1/2 hover:text-font mb-4">
                  <Link href={`recruit/${value}`} onClick={closeMenu}>
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/sign-in" onClick={closeMenu}>
              로그인
            </Link>
          </li>
          <li>
            <Link href="/sign-up" onClick={closeMenu}>
              회원가입
            </Link>
          </li>
        </ul>
      </div>
      <div
        onClick={toggleCategory}
        className={`fixed inset-0 h-screen z-40 bg-dark/70 transition-opacity duration-300 ${isOpened ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />
    </div>
  );
}
