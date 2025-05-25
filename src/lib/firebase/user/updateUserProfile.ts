import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";

interface ProfileData {
  university?: string;
  major?: string;
  grade?: string;
  gender?: string;
  region?: string;
  age?: string;
}

interface UpdatePayload {
  school?: {
    university?: string;
    major?: string;
    grade?: string;
  };
  gender?: string;
  region?: string;
  age?: number;
}

export async function updateUserProfile(data: ProfileData, uid: string) {
  const userRef = adminFirestore.collection("users").doc(uid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    return { status: false, error: "사용자를 찾을 수 없습니다." };
  }

  const userData = userSnap.data();
  if (!userData || userData.uid !== uid) {
    return { status: false, error: "본인 정보만 수정할 수 있습니다." };
  }

  const updatePayload: UpdatePayload = {};

  // 기존 값과 비교 후 변경된 경우에만 포함
  const originalSchool = userData.school || {};

  const schoolUpdates: UpdatePayload["school"] = {};
  if (data.university && data.university !== originalSchool.university) {
    schoolUpdates.university = data.university;
  }
  if (data.major && data.major !== originalSchool.major) {
    schoolUpdates.major = data.major;
  }
  if (data.grade && data.grade !== originalSchool.grade) {
    schoolUpdates.grade = data.grade;
  }
  if (Object.keys(schoolUpdates).length > 0) {
    updatePayload.school = schoolUpdates;
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
