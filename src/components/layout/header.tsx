import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <Image src={'./logo.svg'} alt="logo" width="52" height="34" />
      <input type="text" placeholder="search..." />
    </div>
  );
}
