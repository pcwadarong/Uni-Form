//import { Suspense } from 'react';
import { surveyData } from '@/firebase/db/surveyData';
import filterAndSortSurveyData from '@/utils/filterAndSortData';
import { getSelectedItems } from '@/utils/getSelectedItems';
//import Link from 'next/link';
// import SurveyItem from '@/components/survey/surveyItem';
// import SurveySkeleton from '@/components/survey/surveySkeleton';

interface SurveyListProps {
  category: string;
}

const SurveyList: React.FC<SurveyListProps> = ({ category }) => {
  const filteredSurveyData = filterAndSortSurveyData(
    surveyData,
    (item) => item.category === category,
    (a, b) => {
      return a.point - b.point;
    },
  );

  // const filteredSpecial = filterAndSortSurveyData(
  //   surveyData,
  //   (item) => item.point > 0,
  //   () => Math.random() - 0.5,
  // );

  // const filteredComment = filterAndSortSurveyData(
  //   surveyData,
  //   (item) => item.comments.length > 0,
  //   (a, b) => {
  //     return (
  //       new Date(b.comments[b.comments.length - 1].createdDate).getTime() -
  //       new Date(a.comments[a.comments.length - 1].createdDate).getTime()
  //     );
  //   },
  // );

  // const filteredRecent = filterAndSortSurveyData(
  //   surveyData,
  //   () => true,
  //   (a, b) => new Date(b.id).getTime() - new Date(a.id).getTime(),
  // );

  // const filteredPopular = filterAndSortSurveyData(
  //   surveyData,
  //   () => true,
  //   (a, b) => {
  //     if (b.response !== a.response) {
  //       return b.response - a.response;
  //     } else if (b.comments.length !== a.comments.length) {
  //       return b.comments.length - a.comments.length;
  //     } else {
  //       return new Date(b.id).getTime() - new Date(a.id).getTime();
  //     }
  //   },
  // );

  return (
    <>
      <div className='mt-20'>{`카테고리 ${category}`}</div>
      {/* <section className="w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex justify-between items-end mb-6">
            <h2>특별한 설문조사를 둘러보세요</h2>
            <Link href="/" className="text-xs">
              모든 설문 보기 →
            </Link>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Suspense
              fallback={
                <>
                  <SurveySkeleton />
                  <SurveySkeleton />
                  <SurveySkeleton />
                  <SurveySkeleton />
                </>
              }
            >
              {filteredSpecial.slice(0, 4).map((item) => (
                <SurveyItem key={item.id} item={item} />
              ))}
            </Suspense>
          </ul>
        </div>
      </section>
      <section className="w-full px-4 md:px-8 2xl:px-0 flex justify-center py-16">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex flex-col md:flex-row gap-14 md:gap-8">
            <article className="flex-1">
              {surveyData.length > 0 && (
                <>
                  <div className="flex justify-between items-end mb-6">
                    <h2>새로 등록된 설문조사</h2>
                    <Link href="/" className="text-xs">
                      모든 설문 보기 →
                    </Link>
                  </div>
                  <ul className="grid grid-cols-2 gap-4 md:gap-8">
                    <Suspense
                      fallback={
                        <>
                          <SurveySkeleton />
                          <SurveySkeleton />
                        </>
                      }
                    >
                      {filteredRecent.slice(0, 2).map((item) => (
                        <SurveyItem key={item.id} item={item} />
                      ))}
                    </Suspense>
                  </ul>
                </>
              )}
            </article>
            <article className="flex-1">
              {surveyData.length > 0 && (
                <>
                  <div className="flex justify-between items-end mb-6">
                    <h2>현재 인기가 많은 설문조사</h2>
                    <Link href="/" className="text-xs">
                      모든 설문 보기 →
                    </Link>
                  </div>
                  <ul className="grid grid-cols-2 gap-4 md:gap-8">
                    <Suspense
                      fallback={
                        <>
                          <SurveySkeleton />
                          <SurveySkeleton />
                        </>
                      }
                    >
                      {filteredPopular.slice(0, 2).map((item) => (
                        <SurveyItem key={item.id} item={item} />
                      ))}
                    </Suspense>
                  </ul>
                </>
              )}
            </article>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default SurveyList;
