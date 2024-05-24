export const SURVEY_CATEGORY: { [key: string]: string } = {
  전체보기: '/survey',
  '학업·커리어': '/survey/academic',
  '자기계발·운동': '/survey/development-exercise',
  '일정 관리': '/survey/schedule-management',
  기술: '/survey/technical',
  관계: '/survey/relationship',
  경제: '/survey/economy',
  '취업·진로': '/survey/career',
  문화: '/survey/culture',
  '취미·여가': '/survey/hobby-leisure',
  '환경·봉사': '/survey/environment-volunteer',
  반려동물: '/survey/pets',
  기타: '/survey/etc',
} as const;

export const RECRUIT_CATEGORY: { [key: string]: string } = {
  전체보기: '/recruit',
  동아리: '/recruit/club',
  소모임: '/recruit/group',
  스터디: '/recruit/study',
  '팀 프로젝트': '/recruit/project',
  기타: '/recruit/others',
} as const;
