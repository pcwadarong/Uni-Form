import { toast } from "@/features/shared/ui/sonner";
import { firestore } from "@/lib/firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, increment, runTransaction, setDoc, updateDoc } from "firebase/firestore";
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
 * 새 응답 문서를 생성할 때만 responsesCount를 증가시킨다.
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
    const uid = user ? user.uid : crypto.randomUUID();
    const responseId = `${payload.formId}-${uid}`;

    const responseDocRef = doc(firestore, "responses", responseId);
    const formRef = doc(firestore, "forms", payload.formId);

    try {
      await runTransaction(firestore, async (transaction) => {
        const responseSnap = await transaction.get(responseDocRef);
        const isNewResponse = !responseSnap.exists();

        transaction.set(responseDocRef, {
          id: responseId,
          formId: payload.formId,
          uid,
          content: payload.answers,
          createdAt: Date.now(),
        });

        if (isNewResponse) {
          transaction.update(formRef, {
            responsesCount: increment(1),
          });
        }
      });

      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`응답 저장 실패: ${error.code}`);
      } else {
        toast.error("응답 저장 중 알 수 없는 오류가 발생했습니다.");
      }
      return null;
    }
  };

  return { saveResponse };
};
