import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import type { Form, SortType } from "@/types";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

const mapDocumentToForm = (doc: QueryDocumentSnapshot, formType: "survey" | "recruit"): Form => {
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
    ...(formType === "survey" ? { point: data.point ?? 0 } : {}),
  };
};

export const fetchFormList = async (
  formType: "survey" | "recruit",
  sortType: SortType,
): Promise<Form[]> => {
  try {
    const ref = adminFirestore.collection(formType === "survey" ? "surveys" : "recruits");

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
    return snapshot.docs.map((doc) => mapDocumentToForm(doc, formType));
  } catch (error) {
    console.error(`Error fetching ${sortType} ${formType}s:`, error);
    return [];
  }
};
