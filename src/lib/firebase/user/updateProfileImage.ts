// storage를 이용하여 프로필 이미지 업로드 / 삭제

import type { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebaseConfig";

export async function syncProfileImage(
  userId: string,
  fileOrNull: File | null,
): Promise<string | null> {
  const path = `users/${userId}/profile.jpg`;
  const storageRef = ref(storage, path);
  const user = auth.currentUser;
  if (!user) return null;

  try {
    // 갱신된 file이 있을 경우
    if (fileOrNull) {
      await uploadBytes(storageRef, fileOrNull);
      const url = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: url });
      return url;
    }
    // 이미지 삭제
    await deleteObject(storageRef);
    await updateProfile(user, { photoURL: "" });
    return null;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    if (!fileOrNull && firebaseError.code === "storage/object-not-found") {
      console.warn("삭제할 이미지가 없습니다.");
      await updateProfile(user, { photoURL: "" });
      return null;
    }
    throw new Error("프로필 이미지 처리 중 오류가 발생했습니다.");
  }
}
