"use client";

import Questions from "@/components/create/questions";
import SurveyInfo from "@/components/create/surveyInfo";
import { Button } from "@/components/ui/button";
import { fetchDetail } from "@/lib/firebase/fetchDatas";
import { decrypt } from "@/lib/utils/crypotoUtils";
import { useResponseStore } from "@/store/response";
import { useSurveyStore } from "@/store/survey";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ResponsePage = () => {
  const pathname = usePathname();
  const encryptedId = pathname.replace("/response/", "");
  const itemId = encryptedId ? decrypt(encryptedId) : "";
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const { response, initializeResponses } = useResponseStore();
  const type = itemId.startsWith("survey") ? "surveys" : "recruits";

  const { data } = useSuspenseQuery({
    queryKey: ["selectedSurveyDetail", type, itemId],
    queryFn: () => fetchDetail(type, itemId),
    staleTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    if (data) {
      setSurveyInfo(data);
      initializeResponses(itemId, data.questions);
    }
  }, [itemId, data, setSurveyInfo, initializeResponses]);

  const handleSaveResponse = () => {
    console.log(response);
    alert("saved");
  };

  return (
    <div className="flex-1 w-full px-4 pt-8 pb-20 md:px-8 2xl:px-0 bg-green-light justify-center">
      <div className="w-full 2xl:w-[1400px] flex flex-col gap-5 m-auto">
        <SurveyInfo mode="responding" />
        {surveyInfo.questions?.map((question) => (
          <Questions
            key={question.id}
            question={question}
            isEssential={question.isEssential}
            mode="responding"
          />
        ))}
        <Button className={"text-white bg-green-300 w-fit m-auto"} onClick={handleSaveResponse}>
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default ResponsePage;
