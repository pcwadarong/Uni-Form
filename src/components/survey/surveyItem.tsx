//import Link from 'next/link';
import Special from './special';
import Reaction from './reaction';

export default function SurveyItem() {
  return (
    <div className="h-96 drop-shadow flex flex-col overflow-hidden rounded-3xl">
      <div className="h-36 w-full bg-font overflow-hidden">
        <img className="w-full h-full object-cover" src="./logo.svg" alt="survey image" />
      </div>
      <div className="px-6 py-8 flex flex-col justify-between bg-white grow">
        <div>
          <Special />
          <h3 className="text-xl mt-3 mb-2">
            통학 여부에 따른 대중 교통 이용 빈도에 관한 설문 조사
          </h3>
          <p className="text-xs text-gray-4">24.05.19 11:00 ~ 24.06.15 19:00</p>
        </div>
        <Reaction />
      </div>
    </div>
  );
}
