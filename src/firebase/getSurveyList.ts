import { collection, getDocs, doc, getDoc, limit, orderBy, query, where } from 'firebase/firestore';
import { firestore } from './firebasConfig';
import { Survey, Recruit, InfoType, SortType } from '@/types';
import parseDateString from '@/utils/parseDateString';

export const getSurveys = async (
  surveyType: 'survey' | 'recruit',
  queryType: SortType,
): Promise<Survey[] | Recruit[]> => {
  try {
    const ref =
      surveyType === 'survey'
        ? collection(firestore, 'surveys')
        : collection(firestore, 'recruits');
    let q;

    switch (queryType) {
      case 'public':
        q = ref;
        break;
      case 'latest':
        q = query(ref, orderBy('startDate', 'desc'), limit(4));
        break;
      case 'special':
        q = query(ref, orderBy('point', 'desc'), limit(4));
        break;
      case 'popular':
        q = query(ref, orderBy('response', 'desc'), orderBy('comments.length', 'desc'), limit(4));
        break;
      case 'latestComments':
        q = query(ref, orderBy('comments.createdDate', 'desc'), limit(4));
        break;
      case 'closing':
        q = query(
          ref,
          orderBy('endDate', 'asc'),
          where('endDate', '>=', parseDateString(new Date().toISOString())),
          limit(4),
        );
        break;
      default:
        throw new Error('Unsupported query type');
    }

    const querySnapshot = await getDocs(q);

    const results: (Survey | Recruit)[] = querySnapshot.docs.map((item) => {
      const data = item.data();
      const commonFields = {
        id: item.id,
        title: data.title,
        info: data.info ?? '',
        img: data.img ?? '',
        startDate: data.startDate,
        endDate: data.endDate,
        category: data.category,
      };
      if (surveyType === 'survey') {
        return {
          ...commonFields,
          point: data.point ?? 0,
          response: data.response ?? 0,
          comments: data.comments || [],
        } as Survey;
      } else {
        return {
          ...commonFields,
        } as Recruit;
      }
    });

    return results;
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
