'use client';

import { useSearchParams } from 'next/navigation';
import SearchedList from '@/components/list/searchedList';

const SurveyList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <section className="mt-10 w-full flex flex-col items-center justify-center">
      <div className='w-full 2xl:w-min'>
        <h3 className='ml-5 2xl:m-0 title2'>Surveys</h3>
        <SearchedList query={query} topic={'survey'} />
      </div>
      <div className='w-full 2xl:w-min'>
        <h3 className='ml-5 2xl:m-0 title2'>Recruits</h3>
        <SearchedList query={query} topic={'recruit'} />
      </div>
    </section>
  );
};

export default SurveyList;
