export default async function createCommentsAction(
  _: unknown,
  formData: FormData,
): Promise<{ status: boolean; error?: string }>  {
  const id = formData.get("formId");
  const uid = formData.get("author");
  const context = formData.get("context");

  if (typeof id !== "string" || typeof uid !== "string" || typeof context !== "string")
    return { status: false, error: "입력값 오류" };

  return {
    status: true,
    error: "",
  };
}
