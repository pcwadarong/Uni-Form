import { auth, firestore } from '@/lib/firebase/firebaseConfig';
import type { User } from '@/types';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(firestore, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
        } else {
          console.error('User document does not exist');
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, logout };
};

export default useAuth;
