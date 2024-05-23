export default function RecruitSkeleton() {
  return (
    <li className="flex flex-col flex-1 justify-between overflow-hidden h-[360px] bg-gray-2 rounded-3xl">
      <div className="h-48 bg-gray-3"></div>
      <div className="px-6 py-7 flex flex-col grow justify-between">
        <div>
          <div className="w-16 bg-gray-3 h-7 rounded-md"></div>
          <div className="bg-gray-3 h-10 rounded-xl mt-3"></div>
        </div>
        <div className="bg-gray-3 h-4 rounded-md w-3/4 mt-3 mb-2"></div>
      </div>
    </li>
  );
}
