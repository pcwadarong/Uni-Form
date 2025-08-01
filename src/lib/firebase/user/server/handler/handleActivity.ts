// my drafts, my forms

import type { UserActivityFields } from "@/types/userType";
import { handleCreatedForms } from "./handleCreatedForms";
import { handleDrafts } from "./handleDrafts";

export const handleActivity = async (uid: string): Promise<UserActivityFields> => {
  const [createdForms, drafts] = await Promise.all([handleCreatedForms(uid), handleDrafts(uid)]);

  return {
    createdForms,
    drafts,
  };
};
