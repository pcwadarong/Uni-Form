# 아! 맞다 (A-right)
- [Notion](https://www.notion.so/chaen-notio/714d57f7e7d44aa59e3e2c890af34a6f?pvs=4)
## Overview
- 프로젝트 **아 맞다! (A!right)** 은, 매일의 일정에 따라 필요한 체크리스트를 간편하게 설정하고 관리할 수 있는 서비스를 제공합니다.
- 프로젝트의 주요 대상은 다음과 같습니다. 이 서비스를 통해 사용자들은 자신만의 체크리스트를 웹 사이트에서 편리하게 관리할 수 있습니다.
    - 일정에 맞춰 소지품을 체크해야 하는 사용자
    - 체크리스트를 처음부터 구성하기 어려워 추천을 받고 싶은 사용자
    - 커스텀한 체크리스트를 저장하고 재사용하고 싶어하는 사용자
    - 일정을 함께하는 사람들과 체크리스트를 공유하고 싶어하는 사용자
      
  <br/>
  
- Project **A!right** provides a service where users can easily set up and manage checklists tailored to their daily schedules.
- The primary target audience for the project includes:
  - Users who need to check items according to their daily schedules.
  - Users who find it difficult to create checklists from scratch and seek recommendations.
  - Users who want to save custom checklists for reuse.
  - Users who want to share checklists with others participating in the same schedule.

  <br/>
    
## 프로젝트 진행 기간
2024.04.05 ~ 2024.04.ing..

 <br/>
 
## Development Stack
### Design
- Figma : 와이어 프레임 및 디자인 시안 제작
- Adobe Illustrator : 로고 및 소스 제작
- Adobe After Effect : 애니메이션 GIF 제작
  
### FrontEnd
- React : JavaScript 라이브러리
- Next.js :SSR Rendering 프레임워크
- tailwindcss : CSS 프레임워크
- shadcn/ui : 깔끔한 UI 라이브러리
- react-loader-spinner : pre-loader 라이브러리
- Tiptap : 텍스트 에디터 라이브러리

### BackEnd
- Firebase Authentication, Next-auth?
- Firebase Cloud Firestore
- Firebase Storage
- Vercel

### State, Api
- axois
- Zustand
- date-fns
  
### Others
- VS code
- Git
- Notion

 <br/>
 
## Features
### Design
- Responsive Design : 반응형 디자인
- Dark/light theme switch mode : 다크/라이트 테마 모드 지원
- Customize personal UI : 개인이 커스터마이징할 수 있는 UI 지원

### Authentication
- login, login with social account, login-out : 로그인, 소셜 로그인, 로그아웃
- create account, delete account : 회원 가입, 회원 탈퇴
- Restrict access according to personal setting : 설정에 따른 외부인의 페이지 접근 제한

### Make Checklist
- ing...

### 각 페이지 별 기능 작성

 <br/>
 
## Further plans
- Web Application : '어플리케이션' 을 기본으로 한 구현
- Google Calendar: 사용자의 구글 캘린더와 연동할 수 있는 기능 지원
