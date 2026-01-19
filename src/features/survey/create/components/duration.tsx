"use client";

import { Button } from "@/features/shared/ui/button";
import Calendar from "@/features/shared/ui/calendar";
import TimePicker from "@/features/shared/ui/timePicker";
import { useSurveyStore } from "@/features/survey/create/store/survey";
import formatDate from "@/lib/utils/formateDate";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * 분을 30분 단위로 반올림
 * @param date - 반올림할 날짜
 * @returns 반올림된 날짜
 */
const roundMinutes = (date: Date) => {
  const minutes = date.getMinutes();
  if (minutes < 30) {
    date.setMinutes(30);
  } else {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
  }
  return date;
};

/**
 * 설문 기간 설정 컴포넌트
 * 시작일시 및 종료일시 설정 UI 제공
 */
const SetDuration = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [isOpened, setIsOpened] = useState(false);
  const [beginVisible, setBeginVisible] = useState(false);
  const [beginDateVisible, setBeginDateVisible] = useState(false);
  const [beginTimeVisible, setBeginTimeVisible] = useState(false);
  const [finishVisible, setFinishVisible] = useState(false);
  const [finishDateVisible, setFinishDateVisible] = useState(false);
  const [finishTimeVisible, setFinishTimeVisible] = useState(false);

  const initialBeginDate = roundMinutes(new Date());
  const initialFinishDate = roundMinutes(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  const [beginDate, setBeginDate] = useState<Date | undefined>(initialBeginDate);
  const [finishDate, setFinishDate] = useState<Date | undefined>(initialFinishDate);

  // 모달 제어 및 body 고정 로직 통합
  useEffect(() => {
    if (isOpened) {
      setBeginDate(roundMinutes(new Date()));
      setFinishDate(roundMinutes(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  // 시작/종료 날짜 선택창 상호 배타적 노출 제어 (하나로 통합)
  useEffect(() => {
    if (beginDateVisible && finishDateVisible) {
      setFinishDateVisible(false);
    }
  }, [beginDateVisible, finishDateVisible]);

  /**
   * 모달 토글 핸들러
   * 모든 하위 상태 초기화
   */
  const toggleModal = useCallback(() => {
    setIsOpened((prev) => !prev);
    [
      setBeginVisible,
      setBeginDateVisible,
      setBeginTimeVisible,
      setFinishVisible,
      setFinishDateVisible,
      setFinishTimeVisible,
    ].forEach((fn) => fn(false));
  }, []);

  /**
   * 기간 저장 핸들러
   * 선택된 시작일시 및 종료일시를 설문 정보에 저장
   */
  const saveDuration = useCallback(() => {
    const begin = beginVisible && beginDate ? beginDate.getTime() : 0;
    const finish = finishVisible && finishDate ? finishDate.getTime() : 0;

    setSurveyInfo({
      ...surveyInfo,
      startDate: begin,
      endDate: finish,
    });
    setIsOpened(false);
  }, [beginVisible, finishVisible, beginDate, finishDate, setSurveyInfo, surveyInfo]);

  /**
   * 시간 변경 핸들러
   * @param type - 시작 또는 종료 구분
   * @param period - AM/PM
   * @param hours - 시
   * @param minutes - 분
   */
  const handleTimeChange = useCallback(
    (type: "begin" | "finish", period: string, hours: number, minutes: number) => {
      const targetDate = type === "begin" ? beginDate : finishDate;
      if (!targetDate) return;

      const newDate = new Date(targetDate);
      let adjustedHours = hours;

      if (period === "PM" && hours !== 12) adjustedHours += 12;
      else if (period === "AM" && hours === 12) adjustedHours = 0;

      newDate.setHours(adjustedHours);
      newDate.setMinutes(minutes);

      // 시간 순서 검증
      if (type === "finish" && beginDate && newDate < beginDate) {
        alert("종료 시간은 시작 시간보다 이를 수 없습니다.");
        return;
      }

      if (type === "begin") setBeginDate(newDate);
      else setFinishDate(newDate);
    },
    [beginDate, finishDate],
  );

  const CalendarMemo = useMemo(() => {
    return Calendar;
  }, []);

  const TimePickerMemo = useMemo(() => {
    return TimePicker;
  }, []);

  return (
    <>
      {/* 날짜 버튼 */}
      <div className="mb-4 px-2">
        <span className="subtitle mr-2">설문 기간</span>
        <button
          type="button"
          className="rounded-full bg-gray-1 p-2 text-gray-4"
          onClick={toggleModal}
        >
          {surveyInfo.startDate === 0
            ? "바로 시작"
            : formatDate(surveyInfo.startDate).split(" / ")[0]}
          {" ~ "}
          {surveyInfo.endDate === 0 ? "제한 없음" : formatDate(surveyInfo.endDate).split(" / ")[0]}
        </button>
      </div>

      {/* 모달 */}
      {isOpened && (
        <>
          {/* Backdrop */}
          <div className="fixed top-0 left-0 z-30 h-full w-full bg-dark/70" aria-hidden="true" />

          {/* Dialog */}
          <div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            aria-modal="true"
          >
            <div className="flex w-fit flex-col gap-4 rounded-2xl bg-surface p-8 sm:w-85">
              <h3 className="title3 text-center">설문 기간</h3>

              {/* 시작일 설정 */}
              <div className="flex">
                <span className="font-semibold text-gray-4">시작</span>
                <div>
                  <input
                    type="radio"
                    name="begin"
                    id="begin-immediate"
                    className="ml-4"
                    onClick={() => setBeginVisible(false)}
                    defaultChecked
                  />
                  <label className="mr-4 ml-2" htmlFor="begin-immediate">
                    바로 시작
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="begin"
                    id="begin-custom"
                    onClick={() => setBeginVisible(true)}
                  />
                  <label className="ml-2" htmlFor="begin-custom">
                    직접 설정
                  </label>
                </div>
              </div>

              {beginVisible && (
                <div className="relative flex flex-col items-start">
                  <button
                    type="button"
                    onClick={() => setBeginDateVisible(!beginDateVisible)}
                    aria-expanded={beginDateVisible}
                    className="mb-2 w-full rounded-lg border border-gray-2 px-3 py-2 text-left"
                  >
                    {beginDate ? formatDate(beginDate.getTime()).split(" / ")[0] : "날짜 선택"}
                  </button>
                  {beginDateVisible && (
                    <CalendarMemo
                      mode="single"
                      selected={beginDate}
                      onDayClick={setBeginDate}
                      fromDate={new Date()}
                      className="top-11 z-50 rounded-2xl bg-content xl:absolute xl:shadow-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setBeginTimeVisible(!beginTimeVisible)}
                    aria-expanded={beginTimeVisible}
                    className="w-full rounded-lg border border-gray-2 px-3 py-2 text-left"
                  >
                    {beginDate ? formatDate(beginDate.getTime()).split(" / ")[1] : "시간 선택"}
                  </button>
                  {beginTimeVisible && (
                    <TimePickerMemo type="begin" date={beginDate} onChange={handleTimeChange} />
                  )}
                </div>
              )}

              {/* 종료일 설정 */}
              <div className="flex">
                <span className="font-semibold text-gray-4">종료</span>
                <div>
                  <input
                    type="radio"
                    name="finish"
                    id="endless"
                    className="ml-4"
                    onClick={() => setFinishVisible(false)}
                    defaultChecked
                  />
                  <label className="mr-4 ml-2" htmlFor="endless">
                    제한 없음
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="finish"
                    id="finish-custom"
                    onClick={() => setFinishVisible(true)}
                  />
                  <label className="ml-2" htmlFor="finish-custom">
                    직접 설정
                  </label>
                </div>
              </div>

              {finishVisible && (
                <div className="relative flex flex-col items-start">
                  <button
                    type="button"
                    onClick={() => setFinishDateVisible(!finishDateVisible)}
                    aria-expanded={finishDateVisible}
                    className="mb-2 w-full rounded-lg border border-gray-2 px-3 py-2 text-left"
                  >
                    {finishDate ? formatDate(finishDate.getTime()).split(" / ")[0] : "날짜 선택"}
                  </button>
                  {finishDateVisible && (
                    <CalendarMemo
                      mode="single"
                      selected={finishDate}
                      onDayClick={setFinishDate}
                      fromDate={beginDate}
                      className="top-11 z-50 rounded-2xl bg-content xl:absolute xl:shadow-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setFinishTimeVisible(!finishTimeVisible)}
                    aria-expanded={finishTimeVisible}
                    className="w-full rounded-lg border border-gray-2 px-3 py-2 text-left"
                  >
                    {finishDate ? formatDate(finishDate.getTime()).split(" / ")[1] : "시간 선택"}
                  </button>
                  {finishTimeVisible && (
                    <TimePickerMemo type="finish" date={finishDate} onChange={handleTimeChange} />
                  )}
                </div>
              )}

              <div className="flex justify-center gap-2">
                <Button
                  type="button"
                  className="flex-1 bg-green-50 text-green-400"
                  onClick={toggleModal}
                >
                  취소
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-green-400 text-white"
                  onClick={saveDuration}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SetDuration;
