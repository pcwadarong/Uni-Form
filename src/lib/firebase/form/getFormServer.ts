import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Comment, Detail, Form, Response } from "@/types/types";
import { FirebaseError } from "firebase/app";
import type { DocumentData } from "firebase/firestore";

// form의 detail (문항 미포함) - entry에서 사용
export const fetchForm = async (
  surveyType: "surveys" | "recruits",
  id: string,
  includeQuestions = false,
): Promise<Form | Detail> => {
  try {
    const docRef = adminFirestore.collection(surveyType).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) throw new Error("해당하는 폼이 존재하지 않습니다.");

    const rawData = docSnap.data() as DocumentData;

    const baseData = {
      ...rawData,
      id: docSnap.id,
      startDate: rawData.startDate?.toMillis?.() ?? null,
      endDate: rawData.endDate?.toMillis?.() ?? null,
    };

    if (includeQuestions) {
      const questionsDocSnap = await adminFirestore.collection("questions").doc(id).get();

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

// 최근 댓글이 달린 게시물 - main페이지에서 사용
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

        const formDocSnap = await adminFirestore.collection("surveys").doc(data.formId).get();

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

// 비슷한 form 추천
export const fetchSimilarForms = async (
  currentId: string,
  surveyType: "surveys" | "recruits",
  cat: string,
): Promise<Form[] | null> => {
  try {
    const ref = adminFirestore.collection(surveyType);

    const convertDateFields = (rawData: DocumentData, id: string) =>
      ({
        ...rawData,
        id,
        startDate: rawData.startDate?.toMillis?.() ?? null,
        endDate: rawData.endDate?.toMillis?.() ?? null,
        createdAt: rawData.createdAt?.toMillis?.() ?? null,
      }) as Form;

    // first filtering: same category
    const categorySnapshot = await ref.where("category", "==", cat).get();
    const matchedDocs = categorySnapshot.docs
      .filter((doc) => doc.id !== currentId)
      .map((doc) => convertDateFields(doc.data(), doc.id));

    if (matchedDocs.length >= 3) return matchedDocs.slice(0, 3);

    const additionalSnapshot = await ref.orderBy("__name__", "desc").limit(6).get();
    const additionalDocs = additionalSnapshot.docs
      .filter((doc) => doc.id !== currentId)
      .filter((doc) => doc.data().category !== cat)
      .map((doc) => convertDateFields(doc.data(), doc.id));

    const combined = [...matchedDocs, ...additionalDocs].slice(0, 3);

    return combined;
  } catch (err) {
    if (err instanceof FirebaseError) throw new Error(`Firebase loading error: ${err.code}`);

    throw err;
  }
};
