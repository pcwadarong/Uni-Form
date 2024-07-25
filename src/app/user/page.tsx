'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from '@/firebase/getUserData';
import { getAuth } from 'firebase/auth';
import Loading from '../loading';

const fetchUserDataForCurrentUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  return fetchUserData(user.uid, 'all');
};

const Account: React.FC = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserDataForCurrentUser,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return <div className="m-auto text-center">{data ? `안녕하세요 ${data.nickname}님` : '사용자 정보를 불러올 수 없습니다.'}</div>;
};

export default Account;
