import { useSurveyStore } from '@/store/survey';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const useSaveSurvey = () => {
  const { surveyInfo } = useSurveyStore();
  const auth = getAuth();
  const router = useRouter();

  const saveSurvey = async (category: string) => {
    const cat = category === '설문조사' ? 'surveys' : 'recruits';
    const date = new Date().toISOString();
    const id = `${category === '설문조사' ? 'survey' : 'recruit'}-${date}`;

    const user = auth.currentUser;
    const uid = user ? user.uid : 'unknown';

    const filteredSurveyInfo = {
      ...Object.fromEntries(Object.entries(surveyInfo).filter(([key]) => key !== 'questions')),
      id: id,
      uid: uid,
    };

    try {
      await setDoc(doc(firestore, cat, id), filteredSurveyInfo);
      await setDoc(doc(firestore, 'questions', id), {
        id: id,
        questions: surveyInfo.questions,
      });

      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Error Saving Document:', error.code, error.message);
      } else {
        console.error('Unknown error saving document:', error);
      }
      return null;
    }
  };

  return { saveSurvey };
};
