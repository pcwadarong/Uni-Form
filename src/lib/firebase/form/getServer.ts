import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Comment, Detail, Form, Response } from "@/types";
import { FirebaseError } from "firebase/app";
import { fetchUserDataServer } from "../user/getServer";

export const fetchFormInfo = async (
  surveyType: "surveys" | "recruits",
  id: string,
): Promise<Form> => {
  try {
    const docRef = adminFirestore.collection(surveyType).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) throw new Error("해당하는 폼이 존재하지 않습니다.");

    const data = docSnap.data() as Detail;
    return {
      ...data,
      id: docSnap.id,
    };
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
    throw err;
  }
};

export const fetchFormDetail = async (
  surveyType: "surveys" | "recruits",
  id: string,
): Promise<Detail | null> => {
  try {
    const docRef = adminFirestore.collection(surveyType).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) throw new Error("해당하는 폼이 존재하지 않습니다.");

    const data = docSnap.data() as Detail;
    const questionsSnap = await adminFirestore.collection("questions").where("id", "==", id).get();
    const questionsArray = questionsSnap.docs[0]?.data()?.questions ?? [];

    return {
      ...data,
      id: docSnap.id,
      questions: questionsArray,
    };
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
): Promise<Comment[] | null> => {
  try {
    const snapshot = await adminFirestore
      .collection("comments")
      .where("surveyId", "==", id)
      .orderBy("id", "desc")
      .limit(limitCount)
      .get();

    if (snapshot.empty) return [];

    const commentsWithNicknames = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const nickname = await fetchUserDataServer(data.uid, "nickname");

        return {
          id: doc.id,
          surveyId: data.surveyId,
          uid: data.uid,
          content: data.content,
          nickname: typeof nickname === "string" ? nickname : "",
        };
      }),
    );

    return commentsWithNicknames;
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
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
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
    throw err;
  }
};
