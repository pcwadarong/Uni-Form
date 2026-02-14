import { initSurveyInfo } from "@/constants/initSurveyInfo";
import { toast } from "@/features/shared/ui/sonner";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import type { Question } from "@/features/survey/types";
import { firestore } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

/**
 * 설문 저장 훅
 * `forms` 단일 컬렉션 + `type` 필드 구조로 저장한다.
 * @returns 설문 저장 함수
 */
export const useSaveSurvey = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const auth = getAuth();
  const router = useRouter();

  /**
   * 설문 저장 함수
   * @param category - 화면에서 사용하는 카테고리 문자열(설문조사/모집공고)
   */
  const saveSurvey = async (category: string) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("설문 저장 실패: 로그인이 필요합니다.");
      return null;
    }

    /**
     * TODO: category 문자열 의존을 enum/상수로 통일한다.
     */
    const formType = category === "설문조사" ? "survey" : "recruit";
    const date = new Date().toISOString();
    const id = `${formType}-${date}`;
    const uid = user.uid;

    const filteredSurveyInfo = {
      ...Object.fromEntries(Object.entries(surveyInfo).filter(([key]) => key !== "questions")),
      id,
      uid,
      type: formType,
    };

    /**
     * 질문 데이터 유효성 검사 및 정리
     * undefined 값을 제거해 Firestore 저장 데이터를 최소화한다.
     */
    const validatedQuestions = surveyInfo.questions.map((question) => {
      const validatedQuestion: Partial<Question> = {};

      for (const key of Object.keys(question) as Array<keyof Question>) {
        if (question[key] !== undefined)
          (validatedQuestion[key] as Question[keyof Question]) = question[key];
      }

      return validatedQuestion;
    });

    const questions = {
      id,
      questions: validatedQuestions,
    };

    try {
      await setDoc(doc(firestore, "forms", id), filteredSurveyInfo);
      await setDoc(doc(firestore, "formQuestions", id), questions);
      setSurveyInfo(initSurveyInfo);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`설문 저장 실패: ${error.code}`);
      } else {
        toast.error("설문 저장 중 알 수 없는 오류가 발생했습니다.");
      }
      return null;
    }
  };

  return { saveSurvey };
};
