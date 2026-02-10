#!/usr/bin/env node

/**
 * Firestore에 목 데이터를 생성/업로드하는 스크립트다.
 * - forms, formQuestions, comments, responses 컬렉션에 데이터를 작성한다.
 * - 기존 동일 ID 문서가 있으면 덮어쓴다.
 */

const admin = require("firebase-admin");

/**
 * 서비스 계정 초기화를 수행한다.
 * 환경변수 `FIREBASE_SERVICE_ACCOUNT_JSON`이 있으면 JSON으로 파싱한다.
 * 없으면 Application Default Credentials를 사용한다.
 */
function initFirebaseAdmin() {
  if (admin.apps.length > 0) return;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
    });
    return;
  }

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

/**
 * 질문 목 데이터를 생성한다.
 * 다양한 질문 타입을 섞어서 생성한다.
 * @param {string} formId 폼 ID
 */
function buildQuestions(formId) {
  return {
    id: formId,
    questions: [
      {
        id: 1,
        type: "radio",
        timestamp: `${formId}-q1`,
        title: "현재 학년은 어떻게 되시나요?",
        description: "해당되는 학년을 선택해주세요.",
        isEssential: true,
        options: [
          { id: 1, value: "1학년" },
          { id: 2, value: "2학년" },
          { id: 3, value: "3학년" },
          { id: 4, value: "4학년 이상" },
        ],
      },
      {
        id: 2,
        type: "checkbox",
        timestamp: `${formId}-q2`,
        title: "평소 자주 이용하는 학습 도구를 모두 선택해주세요.",
        isEssential: false,
        options: [
          { id: 1, value: "노션" },
          { id: 2, value: "구글 문서" },
          { id: 3, value: "종이 노트" },
          { id: 4, value: "AI 도구" },
        ],
      },
      {
        id: 3,
        type: "dropdown",
        timestamp: `${formId}-q3`,
        title: "주 사용 기기를 선택해주세요.",
        isEssential: true,
        options: [
          { id: 1, value: "노트북" },
          { id: 2, value: "태블릿" },
          { id: 3, value: "스마트폰" },
          { id: 4, value: "데스크톱" },
        ],
      },
      {
        id: 4,
        type: "short answer",
        timestamp: `${formId}-q4`,
        title: "최근 가장 흥미롭게 들은 수업명을 입력해주세요.",
        isEssential: false,
      },
      {
        id: 5,
        type: "long answer",
        timestamp: `${formId}-q5`,
        title: "캠퍼스 생활에서 개선되면 좋겠는 점을 자유롭게 작성해주세요.",
        isEssential: false,
      },
      {
        id: 6,
        type: "participant",
        timestamp: `${formId}-q6`,
        title: "참여자 기본 정보를 수집합니다.",
        isEssential: true,
      },
      {
        id: 7,
        type: "star",
        timestamp: `${formId}-q7`,
        title: "전체 만족도를 평가해주세요.",
        isEssential: true,
        ratingStep: 1,
      },
      {
        id: 8,
        type: "file",
        timestamp: `${formId}-q8`,
        title: "관련 자료가 있다면 파일을 업로드해주세요.",
        isEssential: false,
      },
    ],
  };
}

/**
 * 댓글 목 데이터를 생성한다.
 * 댓글 수를 0개/3개/10개 이상으로 분포시킨다.
 */
function buildComments(forms) {
  const comments = [];
  const now = Date.now();

  forms.forEach((form, index) => {
    let count = 0;
    if (index % 5 === 1) count = 3;
    if (index % 5 === 2) count = 11;

    for (let i = 0; i < count; i += 1) {
      comments.push({
        id: `comment-${form.id}-${i + 1}`,
        formId: form.id,
        uid: `mock-user-${(i % 4) + 1}`,
        content: `${form.title}에 대한 의견 ${i + 1}번입니다. 설문 구성이 명확해서 좋았습니다.`,
        createdAt: admin.firestore.Timestamp.fromMillis(now - i * 60_000),
      });
    }

    form.commentsCount = count;
  });

  return comments;
}

/**
 * 응답 목 데이터를 생성한다.
 */
function buildResponses(forms) {
  const responses = [];
  const now = Date.now();

  forms.forEach((form, index) => {
    const count = (index % 4) + 1;
    form.responsesCount = count;

    for (let i = 0; i < count; i += 1) {
      responses.push({
        id: `response-${form.id}-${i + 1}`,
        formId: form.id,
        uid: `mock-user-${(i % 5) + 1}`,
        content: [
          { questionId: 1, timestamp: `${form.id}-q1`, response: "2학년" },
          { questionId: 7, timestamp: `${form.id}-q7`, response: 4 },
        ],
        createdAt: admin.firestore.Timestamp.fromMillis(now - i * 90_000),
      });
    }
  });

  return responses;
}

/**
 * 15개의 forms 목 데이터를 생성한다.
 * 진행 예정/진행 중/완료 상태와 survey/recruit 타입을 섞는다.
 */
function buildForms() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const surveyCategories = [
    "academic",
    "career",
    "hobby-leisure",
    "development-exercise",
    "relationship",
    "culture",
    "technical",
    "economy",
    "environment-volunteer",
    "pets",
  ];
  const recruitCategories = ["club", "group", "study", "project", "others"];

  const imagePool = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200",
  ];

  const forms = [];

  for (let i = 0; i < 15; i += 1) {
    const type = i % 4 === 0 ? "recruit" : "survey";
    const stateType = i % 3; // 0: 예정, 1: 진행중, 2: 완료

    let startDate = now - day;
    let endDate = now + day;

    if (stateType === 0) {
      startDate = now + (i + 1) * day;
      endDate = now + (i + 6) * day;
    } else if (stateType === 2) {
      startDate = now - (i + 12) * day;
      endDate = now - (i + 2) * day;
    }

    const formId = `mock-${type}-${String(i + 1).padStart(2, "0")}`;
    const category =
      type === "survey"
        ? surveyCategories[i % surveyCategories.length]
        : recruitCategories[i % recruitCategories.length];

    forms.push({
      id: formId,
      uid: `mock-user-${(i % 5) + 1}`,
      type,
      title:
        type === "survey" ? `캠퍼스 생활 개선 설문 ${i + 1}` : `학생 프로젝트 팀원 모집 ${i + 1}`,
      description:
        type === "survey"
          ? `학생들의 실제 경험을 바탕으로 캠퍼스 생활을 개선하기 위한 설문입니다. (${i + 1})`
          : `이번 학기 함께할 팀원을 모집합니다. 활동 내용과 일정 확인 후 지원해주세요. (${i + 1})`,
      img: imagePool[i % imagePool.length],
      createdAt: admin.firestore.Timestamp.fromMillis(now - i * 3 * 60 * 60 * 1000),
      startDate: admin.firestore.Timestamp.fromMillis(startDate),
      endDate: admin.firestore.Timestamp.fromMillis(endDate),
      category,
      isEditable: i % 2 === 0,
      isPublic: true,
      point: type === "survey" ? (i % 6) * 50 : 0,
      responsesCount: 0,
      commentsCount: 0,
    });
  }

  return forms;
}

/**
 * Firestore 배치 쓰기를 수행한다.
 */
async function seedMockData() {
  initFirebaseAdmin();
  const db = admin.firestore();

  const forms = buildForms();
  const comments = buildComments(forms);
  const responses = buildResponses(forms);
  const questions = forms.map((form) => buildQuestions(form.id));

  const batch = db.batch();

  forms.forEach((form) => {
    batch.set(db.collection("forms").doc(form.id), form);
  });

  questions.forEach((questionDoc) => {
    batch.set(db.collection("formQuestions").doc(questionDoc.id), questionDoc);
  });

  comments.forEach((comment) => {
    const { id, ...payload } = comment;
    batch.set(db.collection("comments").doc(id), payload);
  });

  responses.forEach((response) => {
    const { id, ...payload } = response;
    batch.set(db.collection("responses").doc(id), payload);
  });

  await batch.commit();
  console.log(
    `✅ Mock data uploaded: forms=${forms.length}, questions=${questions.length}, comments=${comments.length}, responses=${responses.length}`,
  );
}

seedMockData().catch((error) => {
  console.error("❌ Failed to upload mock data:", error);
  process.exit(1);
});
