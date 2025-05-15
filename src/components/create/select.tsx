import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionSelectProps {
  value: string;
  handleTypeChange: (value: string) => void;
}

const QuestionSelect: React.FC<QuestionSelectProps> = ({ value, handleTypeChange }) => {
  return (
    <Select defaultValue={value} onValueChange={handleTypeChange}>
      <SelectTrigger className="border-gray-2 mb-3">
        <SelectValue placeholder="질문의 유형을 선택해주세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="radio">단일 객관식</SelectItem>
          <SelectItem value="checkbox">복수 객관식</SelectItem>
          <SelectItem value="short answer">주관식 단답형</SelectItem>
          <SelectItem value="long answer">주관식 서술형</SelectItem>
          <SelectItem value="dropdown">드롭다운</SelectItem>
          {/* <option value="category">카테고리형</option> */}
          <SelectItem value="participant">참여자 정보(이름/연락처/주소/이메일)</SelectItem>
          {/* <option value="table">표형</option> */}
          <SelectItem value="star">별점형</SelectItem>
          {/* <option value="schedule">날짜/시간</option> */}
          {/* <option value="score">점수 선택형</option> */}
          <SelectItem value="file">이미지/파일</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QuestionSelect;
