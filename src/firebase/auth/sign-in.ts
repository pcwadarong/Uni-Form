import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { User } from '@/types';

const emailSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Error logging in:', error.code, error.message);
    } else {
      console.error('Unknown error logging in:', error);
    }
    return null;
  }
};

const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    let nickname = 'uniform';
    if (user.displayName) {
      const nicknameMatch = user.displayName.match(/\(([^)]+)\)/);
      nickname = nicknameMatch ? nicknameMatch[1] : user.displayName;
    }

    await setDoc(
      doc(firestore, 'users', user.uid),
      {
        email: user.email,
        nickname: nickname,
        role: 'user',
        createdSurveys: [],
        responses: [],
        comments: [],
      },
      { merge: true },
    );

    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Error logging in with Google:', error.code, error.message);
    } else {
      console.error('Unknown error logging in with Google:', error);
    }
    return null;
  }
};

export const handleLogin = async (
  method: 'email' | 'google',
  email: string,
  password: string,
  setUser: (user: User | null) => void,
) => {
  let userCredential;

  switch (method) {
    case 'email':
      userCredential = await emailSignIn(email, password);
      break;
    case 'google':
      userCredential = await googleSignIn();
      break;
    default:
      console.error('Unknown login method:', method);
      return false;
  }

  if (userCredential) {
    const { user } = userCredential;
    const userRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as User;

      const userInfo: User = {
        uid: user.uid,
        nickname: userData.nickname,
        email: user.email || '',
        role: userData.role,
        createdSurveys: userData.createdSurveys,
        responses: userData.responses,
        comments: userData.comments,
      };

      setUser(userInfo);
      return true;
    } else {
      console.error('User document does not exist');
      return false;
    }
  }
  return false;
};
