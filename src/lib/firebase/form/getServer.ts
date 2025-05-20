import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Comment, Detail, Form, Response } from "@/types";
import { FirebaseError } from "firebase/app";
import type { DocumentData } from "firebase/firestore";
import { fetchUserDataServer } from "../user/getServer";

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
      const questionsSnap = await adminFirestore
        .collection("questions")
        .where("id", "==", id)
        .get();

      const questionsArray = questionsSnap.docs[0]?.data()?.questions ?? [];
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

export const fetchCommentsServer = async (
  id: string,
  limitCount = 5,
): Promise<{
  comments: Comment[];
  lastDocId: string | null;
  hasNextPage: boolean;
  totalCount: number;
}> => {
  try {
    const snapshot = await adminFirestore
      .collection("comments")
      .where("surveyId", "==", id)
      .orderBy("createdAt", "desc")
      .orderBy("__name__", "desc")
      .limit(limitCount + 1)
      .get();

    if (snapshot.empty)
      return {
        comments: [],
        lastDocId: null,
        hasNextPage: false,
        totalCount: 0,
      };

    const docs = snapshot.docs;
    const hasNextPage = docs.length > limitCount;
    const sliced = hasNextPage ? docs.slice(0, limitCount) : docs;

    const commentsWithNicknames = await Promise.all(
      sliced.map(async (doc) => {
        const data = doc.data();
        const nickname = await fetchUserDataServer(data.uid, "nickname");

        return {
          id: doc.id,
          surveyId: data.surveyId,
          uid: data.uid,
          content: data.content,
          createdAt: data.createdAt?.toMillis?.() ?? null,
          nickname: typeof nickname === "string" ? nickname : "",
        };
      }),
    );

    const countSnap = await adminFirestore
      .collection("comments")
      .where("surveyId", "==", id)
      .count()
      .get();

    const totalCount = countSnap.data().count || 0;

    return {
      comments: commentsWithNicknames,
      lastDocId: hasNextPage ? docs[limitCount - 1].id : null,
      hasNextPage,
      totalCount,
    };
  } catch (err) {
    if (err instanceof FirebaseError) throw new Error(`Firebase loading error: ${err.code}`);

    throw err;
  }
};

export const fetchResponses = async (id: string): Promise<Response[] | null> => {
  try {
    const snapshot = await adminFirestore.collection("responses").where("surveyId", "==", id).get();

    if (snapshot.empty) return [];

    const responses: Response[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        surveyId: data.surveyId,
        uid: data.uid,
        content: data.content,
      };
    });

    return responses;
  } catch (err) {
    if (err instanceof FirebaseError) throw new Error(`Firebase loading error: ${err.code}`);

    throw err;
  }
};
