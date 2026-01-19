import Image from "next/image";

const NoContent = () => {
  return (
    <div className="mt-10 flex flex-col items-center text-gray-500">
      <Image src="/bubble-chat.svg" alt="no comments" width={80} height={78} />
      <p className="body2 mt-5 text-center text-gray-4">
        해당하는 설문이 없습니다. 다른 조건으로 검색해보세요.
      </p>
    </div>
  );
};

export default NoContent;
