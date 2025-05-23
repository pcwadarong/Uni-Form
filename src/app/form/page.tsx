"use client";

import FileEditIcon from "@/components/svg/file";
import { initSurveyInfo } from "@/constants/initSurveyInfo";
import { commonTemplate, recruitTemplate, surveyTemplate } from "@/constants/templates";
import getColorById from "@/lib/utils/getRandomColor";
import { useSurveyStore } from "@/store/survey";
import { useRouter } from "next/navigation";

const RandomColoredBox: React.FC<{ link: string; text: string }> = ({ link, text }) => {
  const router = useRouter();
  const { setSurveyInfo } = useSurveyStore();

  const moveToCreatePage = async () => {
    try {
      setSurveyInfo(initSurveyInfo);
      router.push(link);
    } catch (error) {
      console.error("Failed to set survey info:", error);
    }
  };

  const bgColor = getColorById(text);

  return (
    <li
      className={`relative aspect-square h-auto mb-2 flex items-center justify-center rounded-3xl bg-${bgColor} drop-shadow-md`}
    >
      <button
        type="button"
        onClick={moveToCreatePage}
        aria-label={`Navigate to ${text}`}
        className="h-full w-full"
      >
        <p className="title3 absolute top-6 left-6">{text}</p>
        <div className="absolute bottom-6 right-6">
          <FileEditIcon width={60} height={60} aria-label="Edit icon" />
        </div>
      </button>
    </li>
  );
};

const Form: React.FC = () => {
  const gridClassNames = "grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5 xl:gap-8";

  return (
    <section className="flex w-full flex-col gap-10 px-4 py-16 text-center md:px-8 2xl:w-[1400px] 2xl:px-0">
      <ul className={gridClassNames} aria-label="공통 템플릿 목록">
        {Object.entries(commonTemplate).map(([key, value]) => (
          <RandomColoredBox key={key} link={`/create${value}`} text={key} />
        ))}
      </ul>
      <div>
        <h2 className="mb-4 text-start title3">설문조사</h2>
        <ul className={gridClassNames} aria-label="설문조사 템플릿 목록">
          {Object.entries(surveyTemplate).map(([key, value]) => (
            <RandomColoredBox key={key} link={`/create${value}`} text={key} />
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-4 text-start title3">모집공고</h2>
        <ul className={gridClassNames} aria-label="모집공고 템플릿 목록">
          {Object.entries(recruitTemplate).map(([key, value]) => (
            <RandomColoredBox key={key} link={`/create${value}`} text={key} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Form;
