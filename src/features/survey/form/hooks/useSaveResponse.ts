import { initSurveyInfo } from "@/constants/initSurveyInfo";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import type { Question } from "@/features/survey/types";
import { firestore } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

/**
 * 응답 저장 훅
 * 설문 응답을 Firestore에 저장
 * @returns 응답 저장 함수
 */
export const useSaveResponse = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const auth = getAuth();
  const router = useRouter();

  /**
   * 응답 저장 함수
   * @param category - 설문 카테고리 (설문조사 또는 모집공고)
   */
  const saveResponse = async (category: string) => {
    const cat = category === "설문조사" ? "surveys" : "recruits";
    const date = new Date().toISOString();
    const id = `${category === "설문조사" ? "survey" : "recruit"}-${date}`;

    const user = auth.currentUser;
    const uid = user ? user.uid : "unknown";

    const filteredSurveyInfo = {
      ...Object.fromEntries(Object.entries(surveyInfo).filter(([key]) => key !== "questions")),
      id: id,
      uid: uid,
    };

    const validatedQuestions = surveyInfo.questions.map((question) => {
      const validatedQuestion: Partial<Question> = {};

      for (const key of Object.keys(question) as Array<keyof Question>) {
        if (question[key] !== undefined)
          (validatedQuestion[key] as Question[keyof Question]) = question[key];
      }

      return validatedQuestion;
    });

    const questions = {
      id: id,
      questions: validatedQuestions,
    };

    try {
      await setDoc(doc(firestore, cat, id), filteredSurveyInfo);
      await setDoc(doc(firestore, "questions", id), questions);
      setSurveyInfo(initSurveyInfo);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error Saving Document:", error.code, error.message);
      } else {
        console.error("Unknown error saving document:", error);
      }
      return null;
    }
  };

  return { saveResponse };
};
