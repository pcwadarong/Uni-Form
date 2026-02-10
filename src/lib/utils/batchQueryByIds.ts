import type { RawFormData } from "@/lib/utils/mapRawToForm";
import { mapRawToForm } from "@/lib/utils/mapRawToForm";
import type { Form } from "@/types";
import { FieldPath } from "firebase-admin/firestore";
import { adminFirestore } from "../firebase/firebaseAdminConfig";

/**
 * Firestore 쿼리 제한(30개)을 고려하여 ID 목록을 배치로 조회
 * @param collectionName - 조회할 컬렉션 이름
 * @param ids - 조회할 문서 ID 배열
 * @returns 조회된 폼 배열 (Timestamp 필드 숫자로 정규화)
 */
export const batchQueryByIds = async (collectionName: string, ids: string[]): Promise<Form[]> => {
  const chunks: string[][] = [];
  const chunkSize = 30;

  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize));
  }

  const results = await Promise.all(
    chunks.map(async (idChunk) => {
      const snapshot = await adminFirestore
        .collection(collectionName)
        .where(FieldPath.documentId(), "in", idChunk)
        .get();

      return snapshot.docs.map((doc) => mapRawToForm(doc.data() as RawFormData, doc.id));
    }),
  );

  return results.flat();
};
