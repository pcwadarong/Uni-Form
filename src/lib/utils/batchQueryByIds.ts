// 리밋 방지를 위해 최대 10개씩 나눠서 병렬 조회

import type { Form } from "@/types/types";
import { FieldPath } from "firebase-admin/firestore";
import { adminFirestore } from "../firebase/firebaseAdminConfig";

export const batchQueryByIds = async (collectionName: string, ids: string[]): Promise<Form[]> => {
  const chunks: string[][] = [];
  const chunkSize = 10;

  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize));
  }

  const results = await Promise.all(
    chunks.map(async (idChunk) => {
      const snapshot = await adminFirestore
        .collection(collectionName)
        .where(FieldPath.documentId(), "in", idChunk)
        .get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Form[];
    }),
  );

  return results.flat();
};
