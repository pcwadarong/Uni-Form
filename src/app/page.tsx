'use client';

import { surveyData } from '@/firebase/db/surveyData';
import filterAndSortSurveyData from '@/utils/filterAndSortData';
import Link from 'next/link';
import SurveyItem from '@/components/survey/surveyItem';
import CommentItem from '@/components/survey/commentItem';

export default function Home() {
  const filteredSpecial = filterAndSortSurveyData(
    surveyData,
    (item) => item.point > 0,
    () => Math.random() - 0.5,
  );

  const filteredComment = filterAndSortSurveyData(
    surveyData,
    (item) => item.comments.length > 0,
    (a, b) => {
      return (
        new Date(b.comments[b.comments.length - 1].createdDate).getTime() -
        new Date(a.comments[a.comments.length - 1].createdDate).getTime()
      );
    },
  );

  const filteredRecent = filterAndSortSurveyData(
    surveyData,
    () => true,
    (a, b) => new Date(b.id).getTime() - new Date(a.id).getTime(),
  );

  const filteredPopular = filterAndSortSurveyData(
    surveyData,
    () => true,
    (a, b) => {
      if (b.response !== a.response) {
        return b.response - a.response;
      } else if (b.comments.length !== a.comments.length) {
        return b.comments.length - a.comments.length;
      } else {
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      }
    },
  );

  return (
    <>
      <section className="w-full px-8 2xl:px-0 flex justify-center py-8">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex justify-between items-end mb-6">
            <h2>특별한 설문조사를 둘러보세요</h2>
            <Link href="/" className="text-xs">
              모든 설문 보기 →
            </Link>
          </div>
          <ul className="flex justify-between gap-8">
            {filteredSpecial.slice(0, 4).map((item) => (
              <SurveyItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white w-full px-8 2xl:px-0 flex justify-center py-8">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex justify-between items-end mb-6">
            <h2>최신 댓글이 달린 설문조사를 살펴보세요</h2>
            <Link href="/" className="text-xs">
              모든 설문 보기 →
            </Link>
          </div>
          {surveyData.length > 0 && (
            <ul className="flex gap-8 mb-8">
              {filteredComment.slice(0, 4).map((item) => (
                <CommentItem key={item.id} title={item.title} comments={item.comments} />
              ))}
            </ul>
          )}
        </div>
      </section>
      <section className="w-full px-8 2xl:px-0 flex justify-center py-8">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex">
            <article className="flex-1">
              {surveyData.length > 0 && (
                <>
                  <div className="flex justify-between items-end mb-6r">
                    <h2>새로 등록된 설문조사</h2>
                    <Link href="/" className="text-xs">
                      모든 설문 보기 →
                    </Link>
                  </div>
                  <ul>
                    {filteredRecent.slice(0, 2).map((item) => (
                      <SurveyItem key={item.id} item={item} />
                    ))}
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
                  <ul>
                    {filteredPopular.slice(0, 2).map((item) => (
                      <SurveyItem key={item.id} item={item} />
                    ))}
                  </ul>
                </>
              )}
            </article>
          </div>
        </div>
      </section>
      <section className="bg-white w-full px-8 2xl:px-0 flex justify-center py-8">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex justify-between items-center">
            <h2>곧 마감되는 모집 공고를 살펴보세요</h2>
            <Link href="/" className="text-xs">
              모든 설문 보기 →
            </Link>
          </div>
          <ul className="flex justify-between">
            {surveyData
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((item) => (
                <SurveyItem key={item.id} item={item} />
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
