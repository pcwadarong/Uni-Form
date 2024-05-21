import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebasConfig';

const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(firestore, 'users', user.uid), {
      email,
      nickname,
    });

    console.log('Sign up successful');
    return true;
  } catch (error) {
    console.error('Error signing up:', error);
    return false;
  }
};

export { signUp };
