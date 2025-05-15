"use client";

import CommonList from "@/components/list/commonList";
import { useParams } from "next/navigation";

const RecruitList = () => {
  const params = useParams();
  const paramCategory = params.category || "all";
  return <CommonList topic={"recruit"} category={paramCategory} />;
};

export default RecruitList;
