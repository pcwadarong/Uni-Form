import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { getAuth } from "firebase-admin/auth";
import { updateProfile } from "firebase/auth";
import { getServerUid } from "../auth/getServerUid";

interface ProfileData {
  university?: string;
  major?: string;
  grade?: string;
  gender?: string;
  region?: string;
  age?: string;
}

export async function updateUserProfile(data: ProfileData, uid: string) {
  const userRef = adminFirestore.collection("users").doc(uid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    return { status: false, error: "사용자를 찾을 수 없습니다." };
  }

  const userData = userSnap.data();
  if (!userData || userSnap.id !== uid) {
    return { status: false, error: "본인 정보만 수정할 수 있습니다." };
  }

  const updatePayload: Record<string, unknown> = {};

  const originalSchool = userData.school || {};

  if (data.university && data.university !== originalSchool.university) {
    updatePayload.school = { ...(updatePayload.school as object), university: data.university };
  }
  if (data.major && data.major !== originalSchool.major) {
    updatePayload.school = { ...(updatePayload.school as object), major: data.major };
  }
  if (data.grade && data.grade !== originalSchool.grade) {
    updatePayload.school = { ...(updatePayload.school as object), grade: data.grade };
  }

  if (data.gender && data.gender !== userData.gender) {
    updatePayload.gender = data.gender;
  }

  if (data.region && data.region !== userData.region) {
    updatePayload.region = data.region;
  }

  if (
    data.age &&
    !Number.isNaN(Number(data.age)) &&
    Number.parseInt(data.age, 10) !== userData.age
  ) {
    updatePayload.age = Number.parseInt(data.age, 10);
  }

  if (Object.keys(updatePayload).length === 0) {
    return { status: false, error: "변경된 항목이 없습니다." };
  }

  await userRef.update(updatePayload);

  return { status: true };
}

export async function updateDisplayName(displayName: string, uid: string) {
  const userRef = adminFirestore.collection("users").doc(uid);
  const userSnap = await userRef.get();
  const currentUid = await getServerUid();

  // firestore의 users doc / auth의 user 정보
  if (!userSnap.exists) return { status: false, error: "사용자를 찾을 수 없습니다." };
  if (!currentUid) return { status: false, error: "로그인이 필요합니다." };
  if (userSnap.id !== uid || uid !== currentUid)
    return { status: false, error: "본인 정보만 수정할 수 있습니다." };

  // Firestore 업데이트
  await userRef.update({ displayName });

  // Auth 업데이트 (firebase-admin)
  await getAuth().updateUser(uid, { displayName });
  return { status: true };
}
