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
