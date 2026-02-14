import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Form, SortType } from "@/types";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * Firestore 문서를 Form 타입으로 변환한다.
 * @param doc - Firestore Query 문서
 * @returns Form 데이터
 */
const mapDocumentToForm = (doc: QueryDocumentSnapshot): Form => {
  const data = doc.data();

  return {
    id: doc.id,
    uid: data.uid,
    title: data.title,
    description: data.description ?? null,
    img: data.img ?? null,
    endDate: data.endDate?.toMillis?.() ?? 0,
    startDate: data.startDate?.toMillis?.() ?? 0,
    createdAt: data.createdAt?.toMillis?.() ?? 0,
    category: data.category,
    isEditable: data.isEditable ?? false,
    isPublic: data.isPublic ?? false,
    responsesCount: data.responsesCount ?? 0,
    commentsCount: data.commentsCount ?? 0,
    ...(data.type === "survey" ? { point: data.point ?? 0 } : {}),
  };
};

/**
 * 정렬 타입에 따라 폼 목록 조회
 * @param formType - 폼 타입 ("survey" | "recruit")
 * @param sortType - 정렬 타입
 * @returns 폼 배열
 */
export const fetchFormList = async (
  formType: "survey" | "recruit",
  sortType: SortType,
): Promise<Form[]> => {
  try {
    const ref = adminFirestore.collection("forms").where("type", "==", formType);

    let queryRef: FirebaseFirestore.Query = ref;

    switch (sortType) {
      case "public":
        queryRef = ref.where("isPublic", "==", true);
        break;

      case "recent":
        queryRef = ref.orderBy("createdAt", "desc").limit(2);
        break;

      case "highPoint":
        queryRef = ref.orderBy("point", "desc").limit(4);
        break;

      case "popular":
        queryRef = ref.orderBy("responsesCount", "desc").orderBy("commentsCount", "desc").limit(2);
        break;

      case "endingSoon":
        queryRef = ref.orderBy("endDate", "asc").limit(4);
        break;

      default:
        throw new Error(`Unsupported sort type: ${sortType}`);
    }

    const snapshot = await queryRef.get();
    return snapshot.docs.map((doc) => mapDocumentToForm(doc));
  } catch (error) {
    console.error(`Error fetching ${sortType} ${formType}s:`, error);
    return [];
  }
};
