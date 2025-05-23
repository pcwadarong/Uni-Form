import FormCardItem from "@/components/form/formCardItem";
import { fetchSimilarForms } from "@/lib/firebase/form/getFormServer";
import type { Form } from "@/types/types";

export default async function SimilarForms({
  itemId,
  category,
}: { itemId: string; category: string }) {
  const docType = itemId.startsWith("survey") ? "surveys" : "recruits";
  const itemType = docType === "surveys" ? "survey" : "recruit";
  const similarForms = (await fetchSimilarForms(itemId, docType, category)) ?? [];

  return (
    <section>
      <h3 className="body1">비슷한 설문</h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3 md:gap-8">
        {similarForms?.map((form: Form) => (
          <FormCardItem key={form.id} item={form} type={itemType} />
        ))}
      </ul>
    </section>
  );
}
