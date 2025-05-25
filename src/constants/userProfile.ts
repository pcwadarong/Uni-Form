export const GENDER_OPTIONS = ["선택 안 함", "남성", "여성"] as [string, ...string[]];

export const GRADE_OPTIONS = [
  "선택 안 함",
  "1학년",
  "2학년",
  "3학년",
  "4학년",
  "5학년 이상",
  "휴학생",
  "대학원생",
  "교수자",
  "기타",
] as [string, ...string[]];

export const REGION_OPTIONS = [
  "선택 안 함",
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
] as [string, ...string[]];


// 타입으로 사용하기 위한 유니온 추출
export type GradeType = (typeof GRADE_OPTIONS)[number];
export type GenderType = (typeof GENDER_OPTIONS)[number];
export type RegionType = (typeof REGION_OPTIONS)[number];
