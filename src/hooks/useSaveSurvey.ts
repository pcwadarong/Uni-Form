import { initSurveyInfo } from "@/constants/initSurveyInfo";
import { firestore } from "@/lib/firebase/firebaseConfig";
import { useSurveyStore } from "@/store/survey";
import type { Question } from "@/types/types";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export const useSaveSurvey = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const auth = getAuth();
  const router = useRouter();

  const saveSurvey = async (category: string) => {
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

      (Object.keys(question) as Array<keyof Question>).forEach((key) => {
        if (question[key] !== undefined) {
          (validatedQuestion[key] as Question[keyof Question]) = question[key];
        }
      });

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

  return { saveSurvey };
};
