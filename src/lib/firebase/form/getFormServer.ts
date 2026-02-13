import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { type RawFormData, mapRawToForm } from "@/lib/utils/mapRawToForm";
import type { Comment, Detail, Form } from "@/types";
import { FirebaseError } from "firebase/app";
import type { DocumentData } from "firebase/firestore";

/**
 * 설문 타입 파라미터를 forms.type 값으로 정규화한다.
 * @param surveyType - 기존 컬렉션 명 기반 타입
 * @returns forms 컬렉션의 type 값
 */
const resolveFormType = (surveyType: "surveys" | "recruits"): "survey" | "recruit" =>
  surveyType === "surveys" ? "survey" : "recruit";

/**
 * 서버에서 폼 데이터 조회
 * @param id - 폼 ID
 * @param includeQuestions - 질문 포함 여부 (기본: false)
 * @returns 폼 데이터 (Form 또는 Detail)
 * @throws 폼이 존재하지 않거나 Firebase 에러 발생 시
 */
export const fetchForm = async (id: string, includeQuestions = false): Promise<Form | Detail> => {
  try {
    const docRef = adminFirestore.collection("forms").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) throw new Error("해당하는 폼이 존재하지 않습니다.");

    const rawData = docSnap.data() as RawFormData;

    const baseData = mapRawToForm(rawData, docSnap.id);

    if (includeQuestions) {
      const questionsDocSnap = await adminFirestore.collection("formQuestions").doc(id).get();

      const questionsArray = questionsDocSnap.exists
        ? (questionsDocSnap.data()?.questions ?? [])
        : [];

      return {
        ...baseData,
        questions: questionsArray,
      } as Detail;
    }

    return baseData as Form;
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
    throw err;
  }
};

/**
 * 최근 댓글이 달린 폼 제목과 함께 조회
 * @param limitCount - 조회할 댓글 수 제한 (기본: 4)
 * @returns 댓글 배열 또는 null
 */
export const fetchLatestCommentsWithFormTitles = async (
  limitCount = 4,
): Promise<Comment[] | null> => {
  try {
    const snapshot = await adminFirestore
      .collection("comments")
      .orderBy("createdAt", "desc")
      .limit(limitCount)
      .get();

    if (snapshot.empty) return [];

    const comments = snapshot.docs;

    const results = await Promise.all(
      comments.map(async (doc) => {
        const data = doc.data() as DocumentData;

        if (!data.formId || typeof data.formId !== "string")
          throw new Error(`Invalid formId in comment: ${doc.id}`);

        const formDocSnap = await adminFirestore.collection("forms").doc(data.formId).get();

        const formTitle = formDocSnap.exists
          ? (formDocSnap.data()?.title ?? "제목 없음")
          : "제목 없음";

        return {
          id: doc.id,
          uid: data.uid,
          formId: data.formId,
          content: data.content,
          createdAt: data.createdAt?.toMillis?.() ?? null,
          formTitle,
        };
      }),
    );

    return results;
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
    throw err;
  }
};

/**
 * 비슷한 폼 추천 (같은 카테고리 우선, 부족 시 추가)
 * @param currentId - 현재 폼 ID
 * @param surveyType - 폼 타입 ("surveys" | "recruits")
 * @param cat - 카테고리
 * @returns 추천 폼 배열 또는 null
 */
export const fetchSimilarForms = async (
  currentId: string,
  surveyType: "surveys" | "recruits",
  cat: string,
): Promise<Form[] | null> => {
  try {
    const formType = resolveFormType(surveyType);
    const ref = adminFirestore.collection("forms").where("type", "==", formType);

    // first filtering: same category
    const categorySnapshot = await ref.where("category", "==", cat).get();
    const matchedDocs = categorySnapshot.docs
      .filter((doc) => doc.id !== currentId)
      .map((doc) => mapRawToForm(doc.data() as RawFormData, doc.id));

    if (matchedDocs.length >= 3) return matchedDocs.slice(0, 3);

    const additionalSnapshot = await adminFirestore
      .collection("forms")
      .where("type", "==", formType)
      .orderBy("createdAt", "desc")
      .limit(6)
      .get();

    const additionalDocs = additionalSnapshot.docs
      .filter((doc) => doc.id !== currentId)
      .filter((doc) => doc.data().category !== cat)
      .map((doc) => mapRawToForm(doc.data() as RawFormData, doc.id));

    const combined = [...matchedDocs, ...additionalDocs].slice(0, 3);

    return combined;
  } catch (err) {
    if (err instanceof FirebaseError) throw new Error(`Firebase loading error: ${err.code}`);

    throw err;
  }
};
