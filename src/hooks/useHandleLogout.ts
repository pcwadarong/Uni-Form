import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useHandleLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/');
  }, [logout, router]);

  return handleLogout;
};

export default useHandleLogout;
