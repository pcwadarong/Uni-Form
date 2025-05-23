import { fetchUserAuthInfo } from "./fetchUserAuthInfo";
import { fetchUserDataServer } from "./fetchUserDataServer";

export const fetchUserFullProfile = async (uid?: string) => {
  const [auth, firestore] = await Promise.all([
    fetchUserAuthInfo(uid),
    fetchUserDataServer({ uid, field: "profile" }),
  ]);

  if (!auth || !firestore) return null;

  return {
    ...auth, // displayName, photoURL, role, email
    ...firestore, // school, region, age, etc.
  };
};
