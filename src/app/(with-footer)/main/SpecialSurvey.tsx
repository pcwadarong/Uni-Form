export const revalidate = 60 * 5; // 5분

import FormCardItem from "@/components/form/formCardItem";
import FormCardSkeleton from "@/components/form/formCardSkeleton";
import { fetchFormList } from "@/lib/firebase/form/getFormListServer";
import Link from "next/link";

const SpecialSurveys = async () => {
  const specialSurveys = await fetchFormList("survey", "highPoint");

  return (
    <section
      className="flex w-full justify-center px-4 py-16 md:px-8 2xl:px-0"
      aria-labelledby="special-survey-heading"
    >
      <div className="w-full 2xl:w-[1400px]">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="special-survey-heading" className="title2">
            특별한 설문조사를 둘러보세요
          </h2>
          <Link href="/survey?cat=all" className="caption">
            모든 설문 보기 →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {specialSurveys.length > 0
            ? specialSurveys.map((item) => <FormCardItem type="survey" key={item.id} item={item} />)
            : Array.from({ length: 4 }).map((_, i) => <FormCardSkeleton key={i} type="survey" />)}
        </ul>
      </div>
    </section>
  );
};

export default SpecialSurveys;
