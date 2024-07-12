import { http, HttpResponse } from 'msw';
import { getPublicSurveys } from '@/firebase/getSurveyList';
import { surveyData } from './surveyData';

const handlers = [
  http.get('/api/surveys', async () => {
    const surveys = await getPublicSurveys();
    if (surveys !== null) return HttpResponse.json(surveyData);
    return HttpResponse.text('Failed to fetch surveys', { status: 500 });
  }),
];

export default handlers;
