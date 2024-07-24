import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';

export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(firestore, 'users', user.uid), {
      nickname,
      email,
      role: 'user',
      createdSurveys: [],
      responses: [],
      comments: [],
    });

    console.log('Sign up successful');
    return true;
  } catch (error) {
    console.error('Error signing up:', error);
    return false;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Passord reset email sent');
    return true;
  } catch (error) {
    console.error('Error sending password reset email', error);
    return false;
  }
};
