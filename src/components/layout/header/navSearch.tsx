import Image from 'next/image';
export default function NavSearch() {
  return (
    <div className="relative flex-auto md:max-w-96 mx-8">
      <input
        className="w-full h-10 pl-2 pr-10 bg-dark/5 rounded-xl focus:outline-none focus:ring-2 hover:bg-dark/10 focus:ring-primary"
        type="text"
        placeholder="관심사를 찾아보세요!"
      />
      <button className="absolute top-1/2 right-3 transform -translate-y-1/2">
        <Image src={'./search.svg'} alt="search" width="20" height="20" />
      </button>
    </div>
  );
}
