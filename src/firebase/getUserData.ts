import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebasConfig';

const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(firestore, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such user!');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export { getUserData };
