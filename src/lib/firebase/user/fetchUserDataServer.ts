// users docs에서 선택적으로 데이터 조합하여 반환

import { getServerUid } from "@/lib/firebase/auth/getServerUid";
import type { Form } from "@/types";
import type {
  User,
  UserActivityFields,
  UserField,
  UserParticipationFields,
  UserProfileFields,
} from "@/types/userType";
import { FirebaseError } from "firebase/app";

import { adminFirestore } from "@/lib/firebase/firebaseAdminConfig";
import { handleActivity } from "./server/handler/handleActivity";
import { handleAnsweredFormIds } from "./server/handler/handleAnsweredFormIds";
import { handleCreatedForms } from "./server/handler/handleCreatedForms";
import { handleDrafts } from "./server/handler/handleDrafts";
import { handleParticipation } from "./server/handler/handleParticipation";
import { handleProfile } from "./server/handler/handleProfile";

type FetchUserParams = {
  uid?: string;
  field?: UserField;
};

export const fetchUserDataServer = async ({
  uid,
  field = "all",
}: FetchUserParams): Promise<
  User | string[] | Form[] | UserProfileFields | UserParticipationFields | UserActivityFields | null
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
        return await handleProfile(resolvedUid);

      case "createdForms":
        return await handleCreatedForms(resolvedUid);

      case "participation":
        return await handleParticipation(resolvedUid, data.bookmarks ?? []);

      case "drafts":
        return await handleDrafts(resolvedUid);

      case "myForms":
        return await handleActivity(resolvedUid);

      case "answeredFormIds":
        return await handleAnsweredFormIds(resolvedUid);

      default: {
        const { responses, drafts, comments, ...filteredUser } = data;
        return { ...filteredUser, uid: userSnap.id } as User;
      }
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
