import { getServerUid } from "@/lib/firebase/user/getServerUid";
import type { User } from "@/types";
import { getAuth } from "firebase-admin/auth";
import { FirebaseError } from "firebase/app";
import { adminFirestore } from "../firebaseAdminConfig";

export type UserField =
  | "all"
  | "profile"
  | "createdForms"
  | "participation"
  | "activity"
  | "drafts";

export type UserProfileFields = Pick<User, "uid" | "school" | "gender" | "age" | "region">;
export type UserParticipationFields = Pick<User, "bookmarks" | "responses">;
export type UserActivityFields = Pick<User, "createdForms" | "drafts" | "comments">;

export type UserFieldMap = Record<
  Exclude<UserField, "all">,
  string[] | UserProfileFields | UserParticipationFields | UserActivityFields
>;

type FetchUserParams = {
  uid?: string;
  field?: UserField;
};

export const fetchUserDataServer = async ({
  uid,
  field = "all",
}: FetchUserParams): Promise<
  User | string[] | UserProfileFields | UserParticipationFields | UserActivityFields | null
> => {
  try {
    const resolvedUid = uid || (await getServerUid());

    if (!resolvedUid) {
      console.error("로그인이 필요합니다.");
      return null;
    }

    const userRef = adminFirestore.collection("users").doc(resolvedUid);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      console.error("사용자를 찾을 수 없습니다:", resolvedUid);
      return null;
    }

    const data = userSnap.data();
    if (!data) return null;

    switch (field) {
      case "profile":
        return {
          school: data.school,
          gender: data.gender,
          age: data.age,
          region: data.region,
          uid: userSnap.id,
        };
      case "createdForms":
        return data.createdForms ?? [];
      case "participation":
        return {
          bookmarks: data.bookmarks ?? [],
          responses: data.responses ?? [],
        };
      case "drafts":
        return data.drafts ?? [];
      case "activity":
        return {
          createdForms: data.createdForms ?? [],
          drafts: data.drafts ?? [],
          comments: data.comments ?? [],
        };
      default:
        return { ...data, uid: userSnap.id } as User;
    }
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(`Firebase 에러: ${err.code}`);
    } else {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", err);
    }
    return null;
  }
};

export const fetchAuthUserInfo = async (uid?: string) => {
  try {
    const resolvedUid = uid || (await getServerUid());
    if (!resolvedUid) {
      console.error("로그인이 필요합니다.");
      return null;
    }

    const user = await getAuth().getUser(resolvedUid);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.customClaims?.role ?? "user",
    };
  } catch (err) {
    console.error("Auth 유저 정보 가져오기 실패:", err);
    return null;
  }
};

export const fetchUserFullProfile = async (uid?: string) => {
  const [auth, firestore] = await Promise.all([
    fetchAuthUserInfo(uid),
    fetchUserDataServer({ uid, field: "profile" }),
  ]);

  if (!auth || !firestore) return null;

  return {
    ...auth, // displayName, photoURL, role, email
    ...firestore, // school, region, age, etc.
  };
};

export const fetchCommentUserNickname = async (uid: string): Promise<string | null> => {
  try {
    const user = await getAuth().getUser(uid);
    return user.displayName ?? null;
  } catch (err) {
    console.error("댓글 작성자 닉네임 조회 실패:", err);
    return null;
  }
};
