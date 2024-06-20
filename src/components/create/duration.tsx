import { useSurveyStore } from '@/store';
import Calendar from '../ui/calendar';
import { useState, useEffect } from 'react';
import Button from '../common/button';
import formatDate from '@/utils/formatDate';

const SetDuration = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const [isOpened, setIsOpened] = useState(false);
  const [startVisible, setStartVisible] = useState(false);
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [endDateVisible, setEndDateVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);

  // startDuration should always be after than now
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(Date.now() + 30 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ); // 1 week later

  // update startDuration every toggling
  useEffect(() => {
    if (isOpened) {
      setStartDate(new Date(Date.now() + 30 * 60 * 1000));
    }
  }, [isOpened]);

  const toggleModal = () => {
    setIsOpened(!isOpened);
  };

  const handleTimeChange = (
    type: 'start' | 'end',
    period: string,
    hours: number,
    minutes: number,
  ) => {
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

      // If end date is selected, ensure it's not earlier than start date
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
  };


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
            <div className="bg-white p-8 rounded-2xl w-lg flex flex-col gap-4">
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
                <div className="flex flex-col items-start">
                  <button
                    onClick={() => setStartDateVisible(!startDateVisible)}
                    aria-expanded={startDateVisible}
                    className="py-2 px-3 border-[1px] w-full border-gray-2 rounded-lg text-left mb-2"
                  >
                    {formatDate(startDate).split(' / ')[0]}
                  </button>
                  {startDateVisible && (
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onDayClick={setStartDate}
                      className="rounded-2xl"
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
                    <div id="start-time" className="flex items-center w-full text-center p-2 gap-3">
                      <select
                        className="flex-1"
                        onChange={(e) =>
                          handleTimeChange(
                            'start',
                            e.target.value,
                            startDate ? new Date(startDate).getHours() % 12 : 0,
                            startDate ? new Date(startDate).getMinutes() : 0,
                          )
                        }
                      >
                        <option value="AM">오전</option>
                        <option value="PM">오후</option>
                      </select>
                      <select
                        className="flex-1"
                        onChange={(e) =>
                          handleTimeChange(
                            'start',
                            startDate ? (new Date(startDate).getHours() < 12 ? 'AM' : 'PM') : 'AM',
                            Number(e.target.value),
                            startDate ? new Date(startDate).getMinutes() : 0,
                          )
                        }
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <span>:</span>
                      <select
                        className="flex-1"
                        onChange={(e) =>
                          handleTimeChange(
                            'start',
                            startDate ? (new Date(startDate).getHours() < 12 ? 'AM' : 'PM') : 'AM',
                            startDate ? new Date(startDate).getHours() % 12 : 0,
                            Number(e.target.value),
                          )
                        }
                      >
                        <option value="00">00</option>
                        <option value="30">30</option>
                      </select>
                    </div>
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
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => setEndDateVisible(!endDateVisible)}
                    aria-expanded={endDateVisible}
                    className="py-2 px-3 border-[1px] w-full border-gray-2 rounded-lg text-left mb-2"
                  >
                    {formatDate(endDate).split(' / ')[0]}
                  </button>
                  {endDateVisible && (
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onDayClick={setEndDate}
                      className="rounded-2xl"
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
                    <div id="end-time" className="flex items-center w-full text-center p-2 gap-3">
                      <select
                        className="flex-1"
                        onChange={(e) =>
                          handleTimeChange(
                            'end',
                            e.target.value,
                            endDate ? new Date(endDate).getHours() % 12 : 0,
                            endDate ? new Date(endDate).getMinutes() : 0,
                          )
                        }
                      >
                        <option value="AM">오전</option>
                        <option value="PM">오후</option>
                      </select>
                      <select
                        className="flex-1"
                        onChange={(e) =>
                          handleTimeChange(
                            'end',
                            endDate ? (new Date(endDate).getHours() < 12 ? 'AM' : 'PM') : 'AM',
                            Number(e.target.value),
                            endDate ? new Date(endDate).getMinutes() : 0,
                          )
                        }
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <span>:</span>
                      <select
                        className="flex-1"
                        onChange={(e) =>
                          handleTimeChange(
                            'end',
                            endDate ? (new Date(endDate).getHours() < 12 ? 'AM' : 'PM') : 'AM',
                            endDate ? new Date(endDate).getHours() % 12 : 0,
                            Number(e.target.value),
                          )
                        }
                      >
                        <option value="00">00</option>
                        <option value="30">30</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-center gap-2">
                <Button
                  text={'취소'}
                  className={'bg-green-light text-font flex-1'}
                  onClick={() => setIsOpened(false)}
                />
                <Button
                  text={'확인'}
                  className={'bg-primary text-white flex-1'}
                  onClick={toggleModal}
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

// 토글 다시 했을 때 시간 리셋되는 거 고치기 value 할당
// timePicker로 빼고 리팩토링
// 다른 요소 클릭되었을 때 visible 사라지게 (날짜와 시간 중 하나만, end와 start 중 하나만)
// 제일 처음 열었을 때 바로 시작에 체크되어 있게
// 확인 눌렀을 때 데이터 저장 setSurveyInfo