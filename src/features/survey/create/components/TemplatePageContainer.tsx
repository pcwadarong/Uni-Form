"use client";

import { commonTemplate, recruitTemplate, surveyTemplate } from "@/constants/templates";
import { TemplateList } from "./TemplateList";

const gridClassNames = "grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5 xl:gap-8";

/**
 * 템플릿 페이지 컨테이너 컴포넌트
 * 공통, 설문조사, 모집공고 템플릿 섹션을 표시
 */
export function TemplatePageContainer() {
  return (
    <section className="flex w-full flex-col gap-10 px-4 py-16 text-center md:px-8 2xl:w-350 2xl:px-0">
      <TemplateList
        templates={commonTemplate}
        ariaLabel="공통 템플릿 목록"
        gridClassNames={gridClassNames}
      />
      <div>
        <h2 className="title3 mb-4 text-start">설문조사</h2>
        <TemplateList
          templates={surveyTemplate}
          ariaLabel="설문조사 템플릿 목록"
          gridClassNames={gridClassNames}
        />
      </div>
      <div>
        <h2 className="title3 mb-4 text-start">모집공고</h2>
        <TemplateList
          templates={recruitTemplate}
          ariaLabel="모집공고 템플릿 목록"
          gridClassNames={gridClassNames}
        />
      </div>
    </section>
  );
}
