export interface FirebaseError {
  code: string;
  message: string;
}

export interface User {
  email: string;
  nickname: string;
  uid: string;
}

type Comment = {
  text: string;
  creator: string;
  createdDate: string;
};

export interface Survey {
  id: string;
  title: string;
  info: string;
  img?: string;
  duration: string;
  point: number;
  response: number;
  comments: Comment[];
  category: string;
}

export interface Option {
  id: number;
  value: string;
}

export interface Question {
  id: number;
  type: string;
  title: string;
  description?: string;
  options?: Option[];
  answer?: string | string[];
  isEssential: boolean;
}

export interface QuestionProps {
  question: Question;
  isEditing: boolean;
}

export interface SurveyInfo {
  questions: Question[];
  imageUrl: string;
  title: string;
  description: string;
}