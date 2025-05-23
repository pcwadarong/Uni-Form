// my comments, my drafts, my forms

import type { UserActivityFields } from "@/types/userType";
import { handleComments } from "./handleComments";
import { handleCreatedForms } from "./handleCreatedForms";
import { handleDrafts } from "./handleDrafts";

export const handleActivity = async (uid: string): Promise<UserActivityFields> => {
  const [createdForms, drafts, comments] = await Promise.all([
    handleCreatedForms(uid),
    handleDrafts(uid),
    handleComments(uid),
  ]);

  return {
    createdForms,
    drafts,
    comments,
  };
};
