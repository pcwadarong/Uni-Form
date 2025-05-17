// import { fetchComments } from "@/lib/firebase/fetchDatas";
// import { fetchDetail } from "@/lib/firebase/fetchDatas";
// import { encrypt } from "@/lib/utils/crypoto";
// import formatDateUi from "@/lib/utils/formatDateUi";
// import { formatTextWithLineBreaks } from "@/lib/utils/formatTextWithLineBreaks";
// import { closeModal } from "@/lib/utils/handleModal";
// import parseDateString from "@/lib/utils/parseDateString";
// import type { Recruit, Survey } from "@/types";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { useQueryClient } from "@tanstack/react-query";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import Reaction from "../survey/reaction";
// import { Button } from "../ui/button";

// const DetailModal: React.FC<{ item: Survey | Recruit }> = ({ item }) => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const { data: commentsList } = useSuspenseQuery({
//     queryKey: ["comments", item.id],
//     queryFn: () => fetchComments(item.id),
//   });

//   const hasComments = "comments" in item;
//   const hasPublicProp = "isPublic" in item;

//   const currentDate = new Date();
//   const diffTime = parseDateString(item.id, item.endDate).getTime() - currentDate.getTime();
//   const type = item.id.startsWith("survey") ? "surveys" : "recruits";

//   const prefetchDetails = async () => {
//     await queryClient.prefetchQuery({
//       queryKey: ["selectedSurveyDetail", type, item.id],
//       queryFn: () => fetchDetail(type, item.id),
//     });
//   };

//   const moveToResultandComments = () => {
//     const encryptedId = encrypt(item.id);
//     router.push(`/analyze/${encryptedId}`);
//     closeModal();
//   };

//   useEffect(() => {
//     prefetchDetails();
//   }, [item.id]);

//   const moveToResponse = async () => {
//     const encryptedId = encrypt(item.id);
//     router.push(`/response/${encryptedId}`);
//     closeModal();
//   };

//   return (
//     <div className="z-50 relative p-4" aria-modal="true">
//       <div className="m-auto w-full flex flex-col gap-3 max-w-[600px] max-h-full overflow-auto bg-gray-1 rounded-2xl shadow-2xl p-7 pt-25px md:p-30px md:pt-35px md:max-w-470px sm:max-w-screen">
//         <button
//           type="button"
//           onClick={closeModal}
//           className="absolute right-10 top-10 text-gray-4 hover:text-dark p-4 -m-4"
//           aria-label="모달 닫기"
//         >
//           <Image src={"./cancel.svg"} alt="no comments" width="20" height="20" />
//         </button>
//         <h4 className="title3 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h4>
//         <hr className="-mt-3 w-full border-green-300" />
//         {item.description && (
//           <span className="overflow-visible">{formatTextWithLineBreaks(item.description)}</span>
//         )}
//         {hasComments && (
//           <>
//             <div className="flex justify-between">
//               <span className="caption text-gray-4 truncate">{`${formatDateUi(
//                 item.id,
//                 item.startDate,
//               )} ~ ${formatDateUi(item.id, item.endDate)}`}</span>
//               <Reaction responses={item.responses} comments={item.comments} />
//             </div>
//             <div className="overflow-hidden h-52 relative">
//               {commentsList && commentsList.length > 0 ? (
//                 <ul>
//                   <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-gray-1" />
//                   {commentsList.map((comment) => (
//                     <li
//                       key={comment.id}
//                       className="w-full p-3 rounded-xl mb-2 border-[1px] border-gray-2 bg-white"
//                     >
//                       <h5 className="font-semibold">{comment.nickname}</h5>
//                       <p>{comment.content}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="h-52 border-[1px] border-gray-2 bg-white rounded-xl text-gray-3 flex flex-col gap-3 justify-center items-center">
//                   <Image src={"./bubble-chat.svg"} alt="no comments" width="80" height="78" />
//                   <p>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</p>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//         <div className="flex justify-center gap-2 mt-4">
//           {hasPublicProp && item.isPublic && (
//             <Button
//               text={"결과보기"}
//               className={"bg-green-light text-green-400"}
//               onClick={moveToResultandComments}
//             />
//           )}
//           {diffTime && (
//             <Button
//               text={"참여하기"}
//               className={"bg-green-300 text-white"}
//               onClick={moveToResponse}
//             />
//           )}
//           {/* {item.isEditable && <Button text={'수정하기'} className={'bg-green-300 text-white'} />} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailModal;
