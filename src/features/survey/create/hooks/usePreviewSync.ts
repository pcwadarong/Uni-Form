"use client";

import { useSurveyStore } from "@/features/survey/create/store/survey";
import type { Detail } from "@/types";
import { BroadcastChannel } from "broadcast-channel";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * BroadcastChannel을 사용한 상태 동기화 훅
 * 새 창/탭 간의 설문 상태를 동기화
 * @returns 초기화 완료 여부
 */
export function useBroadcastSync() {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const broadcastRef = useRef<BroadcastChannel | null>(null);

  /**
   * BroadcastChannel 초기화 및 정리
   */
  useEffect(() => {
    broadcastRef.current = new BroadcastChannel("zustand_channel");
    return () => {
      broadcastRef.current?.close();
    };
  }, []);

  /**
   * 다른 창/탭에서 받은 메시지 처리
   * @param event - BroadcastChannel 이벤트
   */
  const handleMessage = useCallback(
    (event: Detail) => {
      const newState = event;
      if (JSON.stringify(newState) !== JSON.stringify(surveyInfo)) {
        setSurveyInfo(newState);
      }
    },
    [surveyInfo, setSurveyInfo],
  );

  /**
   * 메시지 리스너 등록
   */
  useEffect(() => {
    if (broadcastRef.current) {
      broadcastRef.current.onmessage = handleMessage;
    }
  }, [handleMessage]);
}

/**
 * 로컬 스토리지와의 동기화 훅
 * @returns 초기 로딩 완료 여부
 */
export function useLocalStorageSync() {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const pathname = usePathname();
  const isMount = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // preview 경로에서 부모 경로 추출 (/create/preview -> /create)
  const basePath = pathname.replace(/\/preview$/, "");

  /**
   * 로컬 스토리지에서 설문 데이터 로드
   */
  useEffect(() => {
    const storageKey = `survey-preview:${basePath}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) setSurveyInfo(JSON.parse(stored));
    setIsLoaded(true);
  }, [setSurveyInfo, basePath]);

  /**
   * 설문 상태 변경 시 로컬 스토리지에 저장
   */
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    const storageKey = `survey-preview:${basePath}`;
    localStorage.setItem(storageKey, JSON.stringify(surveyInfo));
  }, [surveyInfo, basePath]);

  return isLoaded;
}
