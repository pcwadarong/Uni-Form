import {
  collection,
  getDocs,
  DocumentData,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from './firebasConfig';
import { Survey, Recruit, InfoType, Comment, SortType } from '@/types';

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
        break;
      case 'latest':
        const q1 = query(
          ref,
          where('startDate', '!=', '바로 시작'),
          orderBy('startDate', 'desc'),
          limit(4),
        );
        const q2 = query(ref, where('startDate', '==', '바로 시작'), limit(4));

        const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

        const results1 = querySnapshot1.docs.map((item) => mapDocumentToData(item, surveyType));
        const results2 = querySnapshot2.docs.map((item) => mapDocumentToData(item, surveyType));

        return [...results1, ...results2];
        break;
      case 'special':
        const q3 = query(ref, orderBy('point', 'desc'), limit(4));
        const querySnapshot3 = await getDocs(q3);
        return querySnapshot3.docs.map((item) => mapDocumentToData(item, surveyType));
      case 'popular':
        const q4 = query(
          ref,
          orderBy('responses.length', 'desc'),
          orderBy('comments.length', 'desc'),
          limit(4),
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
          limit(4),
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

// export const getSurveyDetail = async (id: string): Promise<InfoType | null> => {
//   try {
//     const surveyRef = doc(firestore, 'surveys', id);
//     const surveyDoc = await getDoc(surveyRef);
//     if (surveyDoc.exists()) {
//       const data = surveyDoc.data();
//       return {
//         questions: data.questions || [],
//         imageUrl: data.imageUrl || '',
//         title: data.title || '',
//         description: data.description || '',
//         duration: data.duration || '',
//         mode: data.mode || 'viewing',
//         isPublic: data.isPublic,
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Error getting survey detail:', error);
//     return null;
//   }
// };

export const fetchComments = async (id: string): Promise<Comment[]> => {
  const commentRef = collection(firestore, 'comments');
  const q = query(commentRef, where('surveyId', '==', id), orderBy('lastCommentId', 'desc'));
  const querySnapshot = await getDocs(q);

  const comments: Comment[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    surveyId: doc.data().surveyId,
    uid: doc.data().uid,
    content: doc.data().content,
  }));
  return comments;
};
