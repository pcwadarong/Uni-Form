import { decrypt } from '@/utils/crypotoUtils';
import { useRouter } from 'next/router';

const AnalyzePage = () => {
  const { query } = useRouter();
  const encryptedId = query.id as string;

  const itemId = encryptedId ? decrypt(encryptedId) : '';
  return <div>Analyze Page for Item ID: {itemId}</div>;
};

export default AnalyzePage;
