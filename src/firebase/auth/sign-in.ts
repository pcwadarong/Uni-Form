import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebasConfig';
import { FirebaseError } from 'firebase/app';

export const emailSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Email login successful');
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Error logging in:', error.code, error.message);
    } else {
      console.error('Unknown error logging in:', error);
    }
    return false;
  }
};

export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log('Google login successful');
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Error logging in with Google:', error.code, error.message);
    } else {
      console.error('Unknown error logging in with Google:', error);
    }
    return false;
  }
};
