import type { Form } from "@/types";

/** Firestore Timestamp-like (client or admin) */
type TimestampLike = { toMillis?: () => number } | number;

/** Raw form document from Firestore (client or admin) */
export type RawFormData = Record<string, unknown> & {
  uid?: unknown;
  title?: unknown;
  description?: unknown;
  img?: unknown;
  createdAt?: TimestampLike;
  startDate?: TimestampLike;
  endDate?: TimestampLike;
  category?: unknown;
  isEditable?: unknown;
  isPublic?: unknown;
  responsesCount?: unknown;
  commentsCount?: unknown;
  point?: unknown;
  type?: unknown;
};

const toMillis = (v: TimestampLike | undefined): number =>
  typeof v === "object" && v !== null && typeof (v as { toMillis?: () => number }).toMillis === "function"
    ? (v as { toMillis: () => number }).toMillis()
    : typeof v === "number"
      ? v
      : 0;

/**
 * Firestore 문서 데이터를 Form 형태로 변환한다.
 * Timestamp 필드는 .toMillis()로 숫자로 정규화한다.
 * @param rawData - Firestore 원본 데이터
 * @param id - 문서 ID
 * @returns Form 타입 데이터
 */
export const mapRawToForm = (rawData: RawFormData, id: string): Form => ({
  id,
  uid: (rawData.uid as string) ?? "",
  title: (rawData.title as string) ?? "",
  description: (rawData.description as string | null) ?? null,
  img: (rawData.img as string | null) ?? null,
  createdAt: toMillis(rawData.createdAt),
  startDate: toMillis(rawData.startDate),
  endDate: toMillis(rawData.endDate),
  category: (rawData.category as string) ?? "",
  isEditable: (rawData.isEditable as boolean) ?? false,
  isPublic: (rawData.isPublic as boolean) ?? false,
  responsesCount: (rawData.responsesCount as number) ?? 0,
  commentsCount: (rawData.commentsCount as number) ?? 0,
  point: (rawData.point as number) ?? 0,
  type: rawData.type as Form["type"],
});
