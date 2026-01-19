"use client";

import Questions from "@/components/create/questions";
import SurveyInfo from "@/components/create/surveyInfo";
// import { Button } from "@/components/ui/button"; // TODO: 완성되지 않은 로직으로 인해 주석 처리
import { fetchDetail } from "@/lib/firebase/fetchDatas";
// import { decrypt } from "@/lib/utils/crypoto";
import { useResponseStore } from "@/store/response";
import { useSurveyStore } from "@/store/survey";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ResponsePage({
  params: _params, // TODO: 현재 사용하지 않음 - 향후 사용 예정
}: {
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();
  const encryptedId = pathname.replace("/response/", "");
  // TODO: decrypt는 async 함수이며 secret이 필요함. 클라이언트 컴포넌트에서는 환경 변수 접근 제한으로 인해 주석 처리
  // const itemId = encryptedId ? await decrypt(encryptedId, process.env.NEXT_PUBLIC_CRYPT_SECRET || "") : "";
  const itemId = encryptedId || ""; // 임시 처리
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const { initializeResponses } = useResponseStore();
  // const { response } = useResponseStore(); // TODO: 완성되지 않은 로직으로 인해 주석 처리
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

  // TODO: 완성되지 않은 로직 - 응답 저장 기능 구현 필요
  // const handleSaveResponse = () => {
  //   console.log(response);
  //   alert("saved");
  // };

  return (
    <div className="w-full flex-1 justify-center bg-green-light px-4 pt-8 pb-20 md:px-8 2xl:px-0">
      <div className="m-auto flex w-full flex-col gap-5 2xl:w-350">
        <SurveyInfo mode="responding" />
        {surveyInfo.questions?.map((question) => (
          <Questions
            key={question.id}
            question={question}
            isEssential={question.isEssential}
            mode="responding"
          />
        ))}
        {/* TODO: 완성되지 않은 로직 - 응답 저장 기능 구현 필요 */}
        {/* <Button className={"m-auto w-fit bg-green-400 text-white"} onClick={handleSaveResponse}>
          제출하기
        </Button> */}
      </div>
    </div>
  );
}
