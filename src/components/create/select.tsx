interface QuestionSelectProps {
  value: string;
  onChangeQuestionType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const QuestionSelect: React.FC<QuestionSelectProps> = ({ value, onChangeQuestionType }) => {
  return (
    <select
      className="w-full border-[1px] border-gray-2 rounded-lg p-2 mb-3 focus:outline-none dark:bg-gray-900"
      onChange={onChangeQuestionType}
      value={value}
    >
      <option value="radio">단일 객관식</option>
      <option value="checkbox">복수 객관식</option>
      <option value="short answer">주관식 단답형</option>
      <option value="long answer">주관식 서술형</option>
      <option value="dropdown">드롭다운</option>
      {/* <option value="category">카테고리형</option> */}
      <option value="participant">참여자 정보(이름/연락처/주소/이메일)</option>
      {/* <option value="table">표형</option> */}
      <option value="star">별점형</option>
      {/* <option value="schedule">날짜/시간</option> */}
      {/* <option value="score">점수 선택형</option> */}
      <option value="file">이미지/파일</option>
    </select>
  );
};

export default QuestionSelect;
