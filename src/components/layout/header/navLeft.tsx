'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Props {
  handleMouseOver: (category: string) => void;
  handleMouseLeave: () => void;
}

export default function NavLeft({ handleMouseOver, handleMouseLeave }: Props) {
  return (
    <ul className="flex gap-4 md:gap-8 items-center">
      <li className='w-10'>
        <h1>
          <Link href="/">
            <Image src={'./logo.svg'} alt="logo" width="48" height="30" priority={true} />
          </Link>
        </h1>
      </li>
      <li
        className="hidden sm:inline hover:underline underline-offset-8 decoration-primary"
        onMouseOver={() => handleMouseOver('survey')}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/survey">설문조사</Link>
      </li>
      <li
        className="hidden sm:inline hover:underline underline-offset-8 decoration-primary"
        onMouseOver={() => handleMouseOver('recruit')}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/recruit">모집공고</Link>
      </li>
    </ul>
  );
}
