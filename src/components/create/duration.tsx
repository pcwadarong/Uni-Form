"use client";

import formatDate from "@/lib/utils/formateDate";
import { useSurveyStore } from "@/store/survey";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Calendar from "../ui/calendar";
import TimePicker from "../ui/timePicker";

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

  useEffect(() => {
    if (beginDateVisible && finishDateVisible) {
      setBeginDateVisible(false);
    }
  }, [finishDateVisible]);

  useEffect(() => {
    if (beginDateVisible && finishDateVisible) {
      setFinishDateVisible(false);
    }
  }, [beginDateVisible]);

  const toggleModal = useCallback(() => {
    setIsOpened(!isOpened);
    setBeginVisible(false);
    setBeginDateVisible(false);
    setBeginTimeVisible(false);
    setFinishVisible(false);
    setFinishDateVisible(false);
    setFinishTimeVisible(false);
  }, [isOpened]);

  const saveDuration = useCallback(() => {
    let begin = "바로 시작";
    let finish = "제한 없음";

    if (beginVisible)
      begin = `${formatDate(beginDate).split(" / ")[0]}. ${formatDate(beginDate).split(" / ")[1]}`;
    if (finishVisible)
      finish = `${formatDate(finishDate).split(" / ")[0]}. ${formatDate(finishDate).split(" / ")[1]}`;

    setSurveyInfo({ ...surveyInfo, startDate: begin, endDate: finish });
    setIsOpened(!isOpened);
  }, [beginVisible, finishVisible, beginDate, finishDate, setSurveyInfo, surveyInfo]);

  const handleTimeChange = useCallback(
    (type: "begin" | "finish", period: string, hours: number, minutes: number) => {
      const date = type === "begin" ? beginDate : finishDate;
      if (date) {
        const newDate = new Date(date);

        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }
        newDate.setHours(hours);
        newDate.setMinutes(minutes);

        if (type === "finish" && beginDate) {
          const beginTime = new Date(beginDate);
          if (
            newDate.toDateString() === beginTime.toDateString() &&
            newDate.getTime() < beginTime.getTime()
          ) {
            alert("종료 시간은 시작 시간보다 이를 수 없습니다.");
            return;
          }
        }
        if (type === "begin") {
          setBeginDate(newDate);
        } else {
          setFinishDate(newDate);
        }
      }
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
      <div className="px-2 mb-4">
        <span className="subtitle mr-2">설문 기간</span>
        <button
          type="button"
          className="bg-gray-1 p-2 rounded-full text-gray-4"
          onClick={toggleModal}
        >
          {`${surveyInfo.startDate} ~ ${surveyInfo.endDate}`}
        </button>
      </div>

      {/* 모달 */}
      {isOpened && (
        <>
          {/* Backdrop */}
          <div className="fixed top-0 left-0 w-full h-full bg-dark/70 z-30" aria-hidden="true" />

          {/* Dialog */}
          <div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            aria-modal="true"
          >
            <div className="w-fit sm:w-[340px] bg-surface p-8 rounded-2xl flex flex-col gap-4">
              <h3 className="title3 text-center">설문 기간</h3>

              {/* 시작일 설정 */}
              <div className="flex">
                <span className="text-gray-4 font-semibold">시작</span>
                <div>
                  <input
                    type="radio"
                    name="begin"
                    id="begin-immediate"
                    className="ml-4"
                    onClick={() => setBeginVisible(false)}
                    defaultChecked
                  />
                  <label className="ml-2 mr-4" htmlFor="begin-immediate">
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
                    className="mb-2 w-full rounded-lg border border-gray-2 py-2 px-3 text-left"
                  >
                    {formatDate(beginDate).split(" / ")[0]}
                  </button>
                  {beginDateVisible && (
                    <CalendarMemo
                      mode="single"
                      selected={beginDate}
                      onDayClick={setBeginDate}
                      fromDate={new Date()}
                      className="z-50 rounded-2xl bg-content xl:absolute top-11 xl:shadow-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setBeginTimeVisible(!beginTimeVisible)}
                    aria-expanded={beginTimeVisible}
                    className="w-full rounded-lg border border-gray-2 py-2 px-3 text-left"
                  >
                    {formatDate(beginDate).split(" / ")[1]}
                  </button>
                  {beginTimeVisible && (
                    <TimePickerMemo type="begin" date={beginDate} onChange={handleTimeChange} />
                  )}
                </div>
              )}

              {/* 종료일 설정 */}
              <div className="flex">
                <span className="text-gray-4 font-semibold">종료</span>
                <div>
                  <input
                    type="radio"
                    name="finish"
                    id="endless"
                    className="ml-4"
                    onClick={() => setFinishVisible(false)}
                    defaultChecked
                  />
                  <label className="ml-2 mr-4" htmlFor="endless">
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
                    className="mb-2 w-full rounded-lg border border-gray-2 py-2 px-3 text-left"
                  >
                    {formatDate(finishDate).split(" / ")[0]}
                  </button>
                  {finishDateVisible && (
                    <CalendarMemo
                      mode="single"
                      selected={finishDate}
                      onDayClick={setFinishDate}
                      fromDate={beginDate}
                      className="z-50 rounded-2xl bg-content xl:absolute top-11 xl:shadow-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setFinishTimeVisible(!finishTimeVisible)}
                    aria-expanded={finishTimeVisible}
                    className="w-full rounded-lg border border-gray-2 py-2 px-3 text-left"
                  >
                    {formatDate(finishDate).split(" / ")[1]}
                  </button>
                  {finishTimeVisible && (
                    <TimePickerMemo type="finish" date={finishDate} onChange={handleTimeChange} />
                  )}
                </div>
              )}

              {/* 버튼 */}
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
