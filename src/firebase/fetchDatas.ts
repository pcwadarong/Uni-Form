import {
  collection,
  doc,
  getDoc,
  getDocs,
  DocumentData,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import { Survey, Recruit, InfoType, Comment, Response, SortType } from '@/types';
import { fetchUserNickname } from './getUserData';

const mapDocumentToData = (item: DocumentData, surveyType: 'survey' | 'recruit') => {
  const data = item.data();
  const commonFields = {
    id: item.id,
    uid: data.uid,
    title: data.title,
    description: data.description ?? '',
    img: data.img ?? '',
    startDate: data.startDate,
    endDate: data.endDate,
    category: data.category,
  };
  if (surveyType === 'survey') {
    return {
      ...commonFields,
      point: data.point ?? 0,
      responses: data.responses || [],
      comments: data.comments || [],
      lastCommentId: data.lastCommentId || '',
    } as Survey;
  } else {
    return {
      ...commonFields,
    } as Recruit;
  }
};

export const fetchSurveysOrRecruitsList = async (
  surveyType: 'survey' | 'recruit',
  queryType: SortType,
): Promise<Survey[] | Recruit[]> => {
  try {
    const ref =
      surveyType === 'survey'
        ? collection(firestore, 'surveys')
        : collection(firestore, 'recruits');

    switch (queryType) {
      case 'public':
        return await getDocs(ref).then((querySnapshot) => {
          return querySnapshot.docs.map((item) => mapDocumentToData(item, surveyType));
        });
      case 'latest':
        const q1 = query(
          ref,
          where('startDate', '!=', '바로 시작'),
          orderBy('startDate', 'desc'),
          limit(4),
        );
        const q2 = query(ref, where('startDate', '==', '바로 시작'), limit(2));

        const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

        const results1 = querySnapshot1.docs.map((item) => mapDocumentToData(item, surveyType));
        const results2 = querySnapshot2.docs.map((item) => mapDocumentToData(item, surveyType));

        return [...results1, ...results2];
      case 'special':
        const q3 = query(ref, orderBy('point', 'desc'), limit(4));
        const querySnapshot3 = await getDocs(q3);
        return querySnapshot3.docs.map((item) => mapDocumentToData(item, surveyType));
      case 'popular':
        const q4 = query(
          ref,
          orderBy('responses.length', 'desc'),
          orderBy('comments.length', 'desc'),
          limit(2),
        );
        const querySnapshot4 = await getDocs(q4);
        return querySnapshot4.docs.map((item) => mapDocumentToData(item, surveyType));
      case 'latestComments':
        const q5 = query(ref, orderBy('lastCommentId', 'desc'), limit(4));
        const querySnapshot5 = await getDocs(q5);
        return querySnapshot5.docs.map((item) => mapDocumentToData(item, surveyType));
      case 'closing':
        const q6 = query(
          ref,
          where('endDate', '!=', '제한 없음'),
          orderBy('endDate', 'desc'),
          limit(3),
        );
        const q7 = query(ref, where('endDate', '==', '제한 없음'), limit(4));

        const [querySnapshot6, querySnapshot7] = await Promise.all([getDocs(q6), getDocs(q7)]);

        const results3 = querySnapshot6.docs.map((item) => mapDocumentToData(item, surveyType));
        const results4 = querySnapshot7.docs.map((item) => mapDocumentToData(item, surveyType));

        return [...results3, ...results4];
      default:
        throw new Error('Unsupported query type');
    }
  } catch (error) {
    console.error(`Error getting ${queryType} ${surveyType}s:`, error);
    return [];
  }
};

export const fetchDetail = async (id: string): Promise<InfoType | null> => {
  try {
    const surveyRef = doc(firestore, 'surveys', id);
    const surveyDoc = await getDoc(surveyRef);
    if (surveyDoc.exists()) {
      const data = surveyDoc.data();
      return {
        questions: data.questions || [],
        id: data.id,
        uid: data.uid,
        title: data.title,
        description: data.description ?? '',
        img: data.img ?? '',
        startDate: data.startDate,
        endDate: data.endDate,
        category: data.category,
        mode: data.mode || 'viewing',
        isPublic: data.isPublic || false,
        isEditable: data.isEditable,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting survey detail:', error);
    return null;
  }
};

export const fetchComments = async (id: string): Promise<Comment[] | null> => {
  try {
    const commentRef = collection(firestore, 'comments');
    const q = query(commentRef, where('surveyId', '==', id));
    const querySnapshot = await getDocs(q);

    const commentsWithNicknames = await Promise.all(
      querySnapshot.docs.map(async (item) => {
        const commentData = item.data();
        const nickname = await fetchUserNickname(commentData.uid, 'nickname');

        return {
          id: item.id,
          surveyId: commentData.surveyId,
          uid: commentData.uid,
          content: commentData.content,
          nickname: typeof nickname === 'string' ? nickname : '',
        };
      }),
    );

    return commentsWithNicknames;
  } catch (error) {
    console.error('Error getting list of comments:', error);
    return null;
  }
};

export const fetchResponses = async (id: string): Promise<Response[] | null> => {
  try {
    const responseRef = collection(firestore, 'responses');
    const q = query(responseRef, where('surveyId', '==', id));
    const querySnapshot = await getDocs(q);

    const responses: Response[] = querySnapshot.docs.map((item) => ({
      id: item.id,
      surveyId: item.data().surveyId,
      uid: item.data().uid,
      content: item.data().content,
    }));
    return responses;
  } catch (error) {
    console.error('Error getting list of responses:', error);
    return null;
  }
};
