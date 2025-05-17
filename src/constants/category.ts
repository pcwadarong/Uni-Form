export const SURVEY_CATEGORY: { [key: string]: string } = {
  전체보기: "/all",
  학업·커리어: "/academic",
  취업·진로: "/career",
  취미·여가: "/hobby-leisure",
  자기계발·운동: "/development-exercise",
  관계: "/relationship",
  "일정 관리": "/schedule-management",
  문화: "/culture",
  기술: "/technical",
  경제: "/economy",
  환경·봉사: "/environment-volunteer",
  반려동물: "/pets",
  기타: "/etc",
} as const;

export const RECRUIT_CATEGORY: { [key: string]: string } = {
  전체보기: "/all",
  동아리: "/club",
  소모임: "/group",
  스터디: "/study",
  "팀 프로젝트": "/project",
  기타: "/others",
} as const;
