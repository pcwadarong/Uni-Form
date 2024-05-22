import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

const useHandleLogout = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    router.push('/');
  };

  return handleLogout;
};

export default useHandleLogout;
