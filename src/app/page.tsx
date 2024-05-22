import Link from 'next/link';
import SurveyItem from '@/components/survey/surveyItem';

export default function Home() {
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
            <li className="flex-1">
              <SurveyItem />
            </li>
            <li className="flex-1">
              <SurveyItem />
            </li>
            <li className="flex-1">
              <SurveyItem />
            </li>
            <li className="flex-1">
              <SurveyItem />
            </li>
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
          <ul className="flex justify-between">
            <li>댓글 1</li>
            <li>댓글 1</li>
            <li>댓글 1</li>
            <li>댓글 1</li>
          </ul>
        </div>
      </section>
      <section className="w-full px-8 2xl:px-0 flex justify-center py-8">
        <div className="w-full 2xl:w-[1400px]">
          <div className="flex">
            <article className="flex-1">
              <div className="flex justify-between items-end mb-6r">
                <h2>새로 등록된 설문조사</h2>
                <Link href="/" className="text-xs">
                  모든 설문 보기 →
                </Link>
              </div>
              <ul>
                <li>
                  <SurveyItem />
                </li>
                <li>
                  <SurveyItem />
                </li>
              </ul>
            </article>
            <article className="flex-1">
              <div className="flex justify-between items-end mb-6">
                <h2>현재 인기가 많은 설문조사</h2>
                <Link href="/" className="text-xs">
                  모든 설문 보기 →
                </Link>
              </div>
              <ul>
                <li>
                  <SurveyItem />
                </li>
                <li>
                  <SurveyItem />
                </li>
              </ul>
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
            <li>
              <SurveyItem />
            </li>
            <li>
              <SurveyItem />
            </li>
            <li>
              <SurveyItem />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
