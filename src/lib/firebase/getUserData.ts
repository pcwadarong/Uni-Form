import type { User } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

type UserField =
  | 'all'
  | 'nickname'
  | 'email'
  | 'responses'
  | 'comments'
  | 'draft';

export const fetchUserData = async (
  uid: string,
  fields: UserField = 'all',
): Promise<User | null> => {
  try {
    const userDoc = doc(firestore, 'users', uid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      switch (fields) {
        case 'nickname':
          return userData.nickname;

        case 'email':
          return userData.email;

        case 'responses':
          return userData.responses;

        case 'all':
        default:
          return userData as User;
      }
    } else {
      console.error('User not found:', uid);
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};
