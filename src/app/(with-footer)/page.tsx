import ClosingRecruits from "@/features/survey/list/components/main/ClosingRecruits";
import LatestComments from "@/features/survey/list/components/main/LatestComments";
import RecentPopularSurveys from "@/features/survey/list/components/main/RecentPopularSurveys";
import SpecialSurveys from "@/features/survey/list/components/main/SpecialSurvey";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uniform",
  description: "대학생을 위한 폼 서비스",
  keywords: "대학생, 폼 서비스, 설문조사, 온라인 폼",
  icons: {
    icon: "/favicon.ico",
  },
  authors: {
    name: "chaen",
  },
  openGraph: {
    type: "website",
    title: "Uniform",
    description: "대학생을 위한 폼 서비스",
    images: [
      {
        url: "/preview.jpg",
        width: 800,
        height: 400,
        alt: "Uniform Logo",
      },
    ],
  },
  metadataBase: new URL("https://uni-form-chaen-chaens-projects.vercel.app/"),
};

const Home: React.FC = () => {
  return (
    <>
      <SpecialSurveys />
      <LatestComments />
      <RecentPopularSurveys />
      <ClosingRecruits />
    </>
  );
};

export default Home;
