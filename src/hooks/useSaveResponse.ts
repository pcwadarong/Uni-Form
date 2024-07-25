import { useSurveyStore } from '@/store/survey';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Question, InfoType } from '@/types';

export const useSaveResponse = () => {
  const { surveyInfo, setSurveyInfo } = useSurveyStore();
  const auth = getAuth();
  const router = useRouter();

  const saveResponse = async (category: string) => {
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

    const validatedQuestions = surveyInfo.questions.map((question) => {
      const validatedQuestion: Partial<Question> = {};

      (Object.keys(question) as Array<keyof Question>).forEach((key) => {
        if (question[key] !== undefined) {
          (validatedQuestion[key] as Question[keyof Question]) = question[key];
        }
      });

      return validatedQuestion;
    });

    const questions = {
      id: id,
      questions: validatedQuestions,
    };

    const ititSurveyInfo: InfoType = {
      questions: [
        {
          id: 1,
          type: 'checkbox',
          timestamp: '',
          title: '',
          isEssential: true,
          options: [
            { id: 1, value: '' },
            { id: 2, value: '' },
          ],
        },
      ],
      id: '',
      uid: '',
      title: '',
      description: '',
      img: '',
      startDate: '바로시작',
      endDate: '제한없음',
      category: '',
      mode: 'editing',
      isEditable: false,
    };

    try {
      await setDoc(doc(firestore, cat, id), filteredSurveyInfo);
      await setDoc(doc(firestore, 'questions', id), questions);
      setSurveyInfo(ititSurveyInfo);
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

  return { saveResponse };
};
