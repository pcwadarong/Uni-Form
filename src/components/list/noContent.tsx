import Image from "next/image";

const NoContent = () => {
  return (
    <div className="flex flex-col items-center mt-10 text-gray-500">
      <Image src="/bubble-chat.svg" alt="no comments" width={80} height={78} />
      <p className="mt-5 text-center body2 text-gray-4">
        해당하는 설문이 없습니다. 다른 조건으로 검색해보세요.
      </p>
    </div>
  );
};

export default NoContent;
