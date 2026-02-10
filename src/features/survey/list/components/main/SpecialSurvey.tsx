export const revalidate = 60 * 5; // 5분

import SectionHeader from "@/features/shared/ui/sectionHeader";
import FormCardItem from "@/features/survey/form/components/formCardItem";
import FormCardSkeleton from "@/features/survey/form/components/formCardSkeleton";
import { fetchFormList } from "@/lib/firebase/form/getFormListServer";

const SpecialSurveys = async () => {
  const specialSurveys = await fetchFormList("survey", "highPoint");

  return (
    <section
      className="flex w-full justify-center px-4 py-16 md:px-8 2xl:px-0"
      aria-labelledby="special-survey-heading"
    >
      <div className="w-full 2xl:w-350">
        <SectionHeader
          title="특별한 설문조사를 둘러보세요"
          headingId="special-survey-heading"
          linkHref="/survey?cat=all"
        />
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
