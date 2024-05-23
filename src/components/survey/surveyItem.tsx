import Special from './special';
import Reaction from './reaction';
import { Survey } from '@/types';

export default function SurveyItem({ item }: { item: Survey }) {
  return (
    <li className="h-96 drop-shadow flex-1 flex-col overflow-hidden rounded-3xl">
      <div className="h-36 w-full bg-font overflow-hidden">
        <img className="w-full h-full object-cover" src="./logo.svg" alt="survey image" />
      </div>
      <div className="px-6 py-8 flex flex-col justify-between bg-white grow">
        <div>
          <Special point={item.point} duration={item.duration} />
          <h3 className="text-xl mt-3 mb-2">{item.title}</h3>
          <p className="text-xs text-gray-4">{item.info}</p>
        </div>
        <Reaction response={item.response} comments={item.comments} />
      </div>
    </li>
  );
}
