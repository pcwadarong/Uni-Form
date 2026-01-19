import SectionHeader from "@/features/shared/ui/sectionHeader";
import FormCardItem from "@/features/survey/form/components/formCardItem";
import { fetchUserDataServer } from "@/lib/firebase/user/fetchUserDataServer";
import type { UserActivityFields } from "@/types/userType";

export default async function Page() {
  const { createdForms, drafts } = (await fetchUserDataServer({
    field: "myForms",
  })) as UserActivityFields;

  return (
    <>
      <section>
        <SectionHeader title="내가 만든 설문과 공고" linkHref="/created" />
        <ul>
          {createdForms.length > 0 ? (
            createdForms.map((item) => {
              const type = item.id.startsWith("survey") ? "survey" : "recruit";
              return (
                <li key={item.id}>
                  <FormCardItem type={type} item={item} />
                </li>
              );
            })
          ) : (
            <p>
              생성한 설문이 없습니다. <br /> 새롭게 만들어보세요!
            </p>
          )}
        </ul>
      </section>

      <section>
        <SectionHeader title="임시 저장한 설문과 공고" linkHref="/draft" />
        <ul>
          {drafts.length > 0 ? (
            drafts.map((item) => {
              const type = item.id.startsWith("survey") ? "survey" : "recruit";
              return (
                <li key={item.id}>
                  <FormCardItem type={type} item={item} />
                </li>
              );
            })
          ) : (
            <p>
              임시 저장된 설문이 없습니다. <br /> 작성을 시작해보세요!
            </p>
          )}
        </ul>
      </section>
    </>
  );
}
