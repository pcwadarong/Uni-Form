'use client';

import { useSurveyStore } from '@/store/survey';
import Calendar from '../ui/calendar';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Button from '../common/button';
import formatDate from '@/utils/formatDate';
import TimePicker from '../ui/timePicker';

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
  const [startVisible, setStartVisible] = useState(false);
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [endDateVisible, setEndDateVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  const initialStartDate = roundMinutes(new Date());
  const initialEndDate = roundMinutes(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);

  useEffect(() => {
    if (isOpened) {
      setStartDate(roundMinutes(new Date()));
      setEndDate(roundMinutes(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  useEffect(() => {
    if (startDateVisible && endDateVisible) {
      setStartDateVisible(false);
    }
  }, [endDateVisible]);

  useEffect(() => {
    if (startDateVisible && endDateVisible) {
      setEndDateVisible(false);
    }
  }, [startDateVisible]);

  const toggleModal = useCallback(() => {
    setIsOpened(!isOpened);
    setStartVisible(false);
    setStartDateVisible(false);
    setStartTimeVisible(false);
    setEndVisible(false);
    setEndDateVisible(false);
    setEndTimeVisible(false);
  }, [isOpened]);

  const saveDuration = useCallback(() => {
    let start = '바로 시작';
    let end = '제한 없음';

    if (startVisible)
      start = `${formatDate(startDate).split(' / ')[0]}. ${formatDate(startDate).split(' / ')[1]}`;
    if (endVisible)
      end = `${formatDate(endDate).split(' / ')[0]}. ${formatDate(endDate).split(' / ')[1]}`;

    const durationFormat = `${start} ~ ${end}`;
    setSurveyInfo({ ...surveyInfo, duration: durationFormat });
    setIsOpened(!isOpened);
  }, [startVisible, endVisible, startDate, endDate, setSurveyInfo, surveyInfo]);

  const handleTimeChange = useCallback(
    (type: 'start' | 'end', period: string, hours: number, minutes: number) => {
      const date = type === 'start' ? startDate : endDate;
      if (date) {
        const newDate = new Date(date);

        if (period === 'PM' && hours !== 12) {
          hours += 12;
        } else if (period === 'AM' && hours === 12) {
          hours = 0;
        }
        newDate.setHours(hours);
        newDate.setMinutes(minutes);

        if (type === 'end' && startDate) {
          const startTime = new Date(startDate);
          if (
            newDate.toDateString() === startTime.toDateString() &&
            newDate.getTime() < startTime.getTime()
          ) {
            alert('종료 시간은 시작 시간보다 이를 수 없습니다.');
            return;
          }
        }
        if (type === 'start') {
          setStartDate(newDate);
        } else {
          setEndDate(newDate);
        }
      }
    },
    [startDate, endDate],
  );

  const CalendarMemo = useMemo(() => {
    return Calendar;
  }, []);

  const TimePickerMemo = useMemo(() => {
    return TimePicker;
  }, []);

  return (
    <div className="px-2 mb-4">
      <span className="subtitle mr-2">설문 기간</span>
      <button className="bg-gray-1 p-2 rounded-full text-gray-4" onClick={toggleModal}>
        {surveyInfo.duration}
      </button>
      {isOpened && (
        <>
          <div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white p-8 rounded-2xl w-fit sm:w-[340px] flex flex-col gap-4">
              <h3 className="title3 text-center">설문 기간</h3>
              <div className="flex">
                <span className="text-gray-4 font-semibold">시작</span>
                <div>
                  <input
                    type="radio"
                    name="start"
                    id="start-immediate"
                    className="ml-4"
                    onClick={() => setStartVisible(false)}
                    defaultChecked
                  />
                  <label className="ml-2 mr-4" htmlFor="start-immediate">
                    바로 시작
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="start"
                    id="start-custom"
                    onClick={() => setStartVisible(true)}
                  />
                  <label className="ml-2" htmlFor="start-custom">
                    직접 설정
                  </label>
                </div>
              </div>
              {startVisible && (
                <div className="flex flex-col items-start relative">
                  <button
                    onClick={() => setStartDateVisible(!startDateVisible)}
                    aria-expanded={startDateVisible}
                    className="py-2 px-3 border-[1px] w-full border-gray-2 rounded-lg text-left mb-2"
                  >
                    {formatDate(startDate).split(' / ')[0]}
                  </button>
                  {startDateVisible && (
                    <CalendarMemo
                      mode="single"
                      selected={startDate}
                      onDayClick={setStartDate}
                      className="rounded-2xl bg-white xl:absolute top-11 xl:shadow-lg z-50"
                      fromDate={new Date()}
                    />
                  )}
                  <button
                    onClick={() => setStartTimeVisible(!startTimeVisible)}
                    aria-expanded={startTimeVisible}
                    className="py-2 px-3 border-[1px] w-full border-gray-2 rounded-lg text-left"
                  >
                    {formatDate(startDate).split(' / ')[1]}
                  </button>
                  {startTimeVisible && (
                    <TimePickerMemo type={'start'} date={startDate} onChange={handleTimeChange} />
                  )}
                </div>
              )}
              <div className="flex">
                <span className="text-gray-4 font-semibold">종료</span>
                <div>
                  <input
                    type="radio"
                    name="end"
                    id="endless"
                    className="ml-4"
                    onClick={() => setEndVisible(false)}
                    defaultChecked
                  />
                  <label className="ml-2 mr-4" htmlFor="endless">
                    제한 없음
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="end"
                    id="end-custom"
                    onClick={() => setEndVisible(true)}
                  />
                  <label className="ml-2" htmlFor="end-custom">
                    직접 설정
                  </label>
                </div>
              </div>
              {endVisible && (
                <div className="flex flex-col items-end relative">
                  <button
                    onClick={() => setEndDateVisible(!endDateVisible)}
                    aria-expanded={endDateVisible}
                    className="py-2 px-3 border-[1px] w-full border-gray-2 rounded-lg text-left mb-2"
                  >
                    {formatDate(endDate).split(' / ')[0]}
                  </button>
                  {endDateVisible && (
                    <CalendarMemo
                      mode="single"
                      selected={endDate}
                      onDayClick={setEndDate}
                      className="rounded-2xl bg-white xl:absolute top-11 xl:shadow-lg z-50"
                      fromDate={startDate}
                    />
                  )}
                  <button
                    onClick={() => setEndTimeVisible(!endTimeVisible)}
                    aria-expanded={endTimeVisible}
                    className="py-2 px-3 border-[1px] w-full border-gray-2 rounded-lg text-left"
                  >
                    {formatDate(endDate).split(' / ')[1]}
                  </button>
                  {endTimeVisible && (
                    <TimePickerMemo type={'end'} date={endDate} onChange={handleTimeChange} />
                  )}
                </div>
              )}
              <div className="flex justify-center gap-2">
                <Button
                  text={'취소'}
                  className={'bg-green-light text-font flex-1'}
                  onClick={toggleModal}
                />
                <Button
                  text={'확인'}
                  className={'bg-primary text-white flex-1'}
                  onClick={saveDuration}
                />
              </div>
            </div>
          </div>
          <div
            className="fixed top-0 left-0 w-full h-full bg-dark/70 z-30"
            aria-hidden="true"
          ></div>
        </>
      )}
    </div>
  );
};

export default SetDuration;
