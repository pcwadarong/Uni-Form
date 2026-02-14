import { useState } from "react";

const AppreciateMessage = () => {
  const [appreciate, setAppreciate] = useState<string>("설문에 참여해주셔서 감사합니다.");

  return (
    <section className="overflow-hidden rounded-2xl bg-tone1 dark:bg-muted p-2 shadow-md">
      <input
        type="text"
        value={appreciate}
        placeholder="설문에 참여해주셔서 감사합니다."
        onChange={(e) => setAppreciate(e.target.value)}
        aria-label="감사 인사"
        className="w-full p-2 hover:border-gray-3 hover:border-b focus:border-green-300 focus:border-b focus:outline-none"
      />
    </section>
  );
};

export default AppreciateMessage;
