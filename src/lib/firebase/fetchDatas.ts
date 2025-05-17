import type { Recruit, SortType, Survey } from "@/types";
import {
  type DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "./firebaseConfig";

const mapDocumentToData = (item: DocumentData, surveyType: "survey" | "recruit") => {
  const data = item.data();

  const commonFields = {
    id: item.id,
    uid: data.uid,
    title: data.title,
    description: data.description ?? "",
    img: data.img ?? "",
    startDate: data.startDate,
    endDate: data.endDate,
    category: data.category,
    isEditable: data.isEditable,
    isPublic: data.isPublic ?? false,
  };

  if (surveyType === "survey") {
    return {
      ...commonFields,
      point: data.point ?? 0,
      comments: data.comments || [],
    } as Survey;
  }
  return {
    ...commonFields,
  } as Recruit;
};

export const fetchSurveysOrRecruitsList = async (
  surveyType: "survey" | "recruit",
  queryType: SortType,
): Promise<Survey[] | Recruit[]> => {
  try {
    const ref =
      surveyType === "survey"
        ? collection(firestore, "surveys")
        : collection(firestore, "recruits");

    switch (queryType) {
      case "public": {
        return await getDocs(ref).then((querySnapshot) => {
          return querySnapshot.docs
            .map((item) => mapDocumentToData(item, surveyType))
            .filter(Boolean) as Survey[];
        });
      }

      case "latest": {
        const q1 = query(ref, orderBy("id", "desc"), limit(4));
        const querySnapshot1 = await getDocs(q1);
        return querySnapshot1.docs.map((item) => mapDocumentToData(item, surveyType)) as Survey[];
      }

      case "special": {
        const q2 = query(ref, orderBy("point", "desc"), limit(4));
        const querySnapshot2 = await getDocs(q2);
        return querySnapshot2.docs.map((item) => mapDocumentToData(item, surveyType)) as Survey[];
      }

      case "popular": {
        const q3 = query(
          ref,
          orderBy("responses.length", "desc"),
          orderBy("comments.length", "desc"),
          limit(2),
        );
        const querySnapshot3 = await getDocs(q3);
        return querySnapshot3.docs.map((item) => mapDocumentToData(item, surveyType)) as Survey[];
      }

      case "closing": {
        const q5 = query(
          ref,
          where("endDate", "!=", "제한 없음"),
          orderBy("endDate", "desc"),
          limit(3),
        );
        const q6 = query(ref, where("endDate", "==", "제한 없음"), limit(4));

        const [querySnapshot5, querySnapshot6] = await Promise.all([getDocs(q5), getDocs(q6)]);

        const results1 = querySnapshot5.docs.map((item) => mapDocumentToData(item, surveyType));
        const results2 = querySnapshot6.docs.map((item) => mapDocumentToData(item, surveyType));

        return [...results1, ...results2] as Survey[];
      }
      default:
        throw new Error("Unsupported query type");
    }
  } catch (error) {
    console.error(`Error getting ${queryType} ${surveyType}s:`, error);
    return [];
  }
};