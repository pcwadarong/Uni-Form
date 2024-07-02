'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const CreatePageButton = () => {
  const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPath = usePathname();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowToggleMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex gap-2 justify-end subtitle items-center">
      <button
        className="py-1 px-3 bg-white rounded-md"
        onClick={() => window.open(`${currentPath}/preview`, '_blank')}
      >
        미리보기
      </button>
      <button className="py-1 px-3 bg-white rounded-md">임시저장</button>
      <button className="py-1 px-3 bg-primary text-white rounded-md">저장</button>
      <div className="relative flex items-center" ref={menuRef}>
        <button onClick={() => setShowToggleMenu((prev) => !prev)} aria-label="Toggle User Menu">
          <Image src={'/meatball.svg'} alt="meatball menu icon" width="20" height="20" />
        </button>
        {showToggleMenu && (
          <div className="absolute right-0 top-10 flex flex-col text-center rounded-lg overflow-hidden shadow-md bg-white">
            <button
              className="rounded-md px-3 py-2 hover:bg-gray-2 text-nowrap"
              onClick={() =>
                alert('아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.')
              }
            >
              복제하기
            </button>
            <button
              className="text-red px-3 py-2 rounded-md hover:bg-gray-2"
              onClick={() => {
                if (confirm('정말 삭제하시겠습니까?')) router.push('/');
              }}
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePageButton;
