import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from '../firebasConfig';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { User } from '@/types';

const emailSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Email login successful');
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

    await setDoc(doc(firestore, 'users', user.uid), {
      email: user.email,
      nickname: nickname,
    });

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
    let nickname = 'uniform';

    if (method === 'email') {
      const userRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        nickname = userData.nickname;
      }
    } else if (method === 'google' && user.displayName) {
      const nicknameMatch = user.displayName.match(/\(([^)]+)\)/);
      nickname = nicknameMatch ? nicknameMatch[1] : user.displayName;
    }

    const userInfo: User = {
      email: user.email || '',
      nickname: nickname,
      uid: user.uid,
    };

    setUser(userInfo);
    sessionStorage.setItem('user', JSON.stringify(userInfo));
    return true;
  }
  return false;
};
