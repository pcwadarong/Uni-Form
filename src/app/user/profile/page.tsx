import { Suspense } from "react";
import ProfileSkeleton from "./skeleton";
import Wrapper from "./wrapper";

export default function Page() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <Wrapper />
    </Suspense>
  );
}
