import { collection, getDocs, doc, getDoc, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from './firebasConfig';
import { Survey, SurveyInfoType, SortType } from '@/types';

export const getSurveys = async (
  queryType: SortType,
): Promise<Survey[]> => {
  try {
    const surveysRef = collection(firestore, 'surveys');
    let q;

    switch (queryType) {
      case 'public':
        q = surveysRef;
        break;
      case 'latest':
        q = query(surveysRef, orderBy('comments.createdDate', 'desc'), limit(4));
        break;
      case 'special':
        q = query(surveysRef, orderBy('point', 'desc'), limit(4));
        break;
      case 'popular':
        q = query(
          surveysRef,
          orderBy('response', 'desc'),
          orderBy('comments.length', 'desc'),
          limit(4),
        );
        break;
      case 'latestComments':
        q = query(surveysRef, orderBy('comments.createdDate', 'desc'), limit(4));
        break;

      default:
        throw new Error('Unsupported query type');
    }

    const querySnapshot = await getDocs(q);

    const surveys: Survey[] = querySnapshot.docs.map((item) => {
      const data = item.data();
      return {
        id: item.id,
        title: data.title,
        info: data.info,
        img: data.img,
        duration: data.duration,
        point: data.point,
        response: data.response,
        comments: data.comments || [],
        category: data.category,
      };
    });

    return surveys;
  } catch (error) {
    console.error(`Error getting ${queryType} surveys:`, error);
    return [];
  }
};



export const getSurveyDetail = async (id: string): Promise<SurveyInfoType | null> => {
  try {
    const surveyRef = doc(firestore, 'surveys', id);
    const surveyDoc = await getDoc(surveyRef);
    if (surveyDoc.exists()) {
      const data = surveyDoc.data();
      return {
        questions: data.questions || [],
        imageUrl: data.imageUrl || '',
        title: data.title || '',
        description: data.description || '',
        duration: data.duration || '',
        mode: data.mode || 'viewing',
        isPublic: data.isPublic,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting survey detail:', error);
    return null;
  }
};
