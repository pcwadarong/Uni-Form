import { closeModal } from "@/lib/utils/handleModal";

const DetailModal = () => {
  return (
    <div className="z-50 relative p-4" aria-modal="true">
      <div className="m-auto w-full max-w-[600px] sm:max-w-screen md:max-w-470px max-h-full p-7 pt-25px md:p-30px md:pt-35px flex flex-col gap-3 overflow-auto bg-muted rounded-2xl shadow-2xl">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-10 top-10 text-gray-400 hover:text-green-300 p-4 -m-4"
          aria-label="모달 닫기"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
