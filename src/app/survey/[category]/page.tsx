"use client";

import CommonList from "@/components/list/commonList";
import { useParams } from "next/navigation";

const SurveyList = () => {
  const params = useParams();
  const paramCategory = params.category || "all";
  return <CommonList topic={"survey"} category={paramCategory} />;
};

export default SurveyList;
