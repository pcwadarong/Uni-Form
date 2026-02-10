import { firestore } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface SaveResponsePayload {
  formId: string;
  answers: Array<{
    questionId: number;
    timestamp: string;
    response: string | number | string[] | number[];
  }>;
}

/**
 * 응답 저장 훅
 * forms/formQuestions를 다시 생성하지 않고 responses만 저장한다.
 * @returns 응답 저장 함수
 */
export const useSaveResponse = () => {
  const auth = getAuth();
  const router = useRouter();

  /**
   * 응답 저장 함수
   * @param payload - 저장할 응답 데이터
   */
  const saveResponse = async (payload: SaveResponsePayload) => {
    const user = auth.currentUser;
    const uid = user ? user.uid : "unknown";
    const responseId = `${payload.formId}-${uid}`;

    try {
      await setDoc(doc(firestore, "responses", responseId), {
        id: responseId,
        formId: payload.formId,
        uid,
        content: payload.answers,
        createdAt: Date.now(),
      });

      /**
       * TODO: 트랜잭션으로 전환해 동시성 상황에서도 카운트 정확도를 보장한다.
       */
      await updateDoc(doc(firestore, "forms", payload.formId), {
        responsesCount: increment(1),
      });

      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error Saving Response:", error.code, error.message);
      } else {
        console.error("Unknown error saving response:", error);
      }
      return null;
    }
  };

  return { saveResponse };
};
