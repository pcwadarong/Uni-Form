import { redirect } from "next/navigation";

export default function RedirectToProfile() {
  redirect("/user/profile");
}
