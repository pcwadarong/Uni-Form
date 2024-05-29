export const commonTemplate: { [key: string]: string } = {
  '직접 만들기': '/',
  객관식: '/template/1',
  '주관식 서술형': '/template/2',
  별점형: '/template/3',
} as const;

export const surveyTemplate: { [key: string]: string } = {
  '제품 인식': '/template/4',
  감정: '/template/5',
  브랜드: '/template/6',
  '시설 이용': '/template/7',
  '경험/체험': '/template/8',
} as const;

export const recruitTemplate: { [key: string]: string } = {
  '학업 동아리': '/template/9',
  '과 동아리': '/template/10',
  '문화 동아리': '/template/11',
  스터디: '/template/12',
  '팀 프로젝트': '/template/13',
} as const;
