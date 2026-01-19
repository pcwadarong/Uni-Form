/**
 * 설문 응답 관련 타입 정의
 */

import type { Form } from "../types";

/**
 * 답변 타입
 */
export interface Answer {
  questionId: number;
  timestamp: string;
  response: string | number | string[] | number[];
}

/**
 * 설문 응답 타입
 */
export interface Response {
  id: string;
  formId: string;
  uid: string;
  content: Answer[];
}

/**
 * 댓글 타입
 */
export interface Comment {
  id: string;
  displayName?: string;
  formTitle?: string;
  formId: string;
  uid: string;
  content: string;
  createdAt?: number;
}

export type { Form };
