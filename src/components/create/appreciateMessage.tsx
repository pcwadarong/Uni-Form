import { useState } from 'react';

const AppreciateMessage = () => {
  const [appreciate, setAppreciate] = useState<string>('설문에 참여해주셔서 감사합니다.');

  return (
    <section className="bg-white rounded-2xl overflow-hidden p-2 shadow-md">
      <input
        type="text"
        value={appreciate}
        placeholder="설문에 참여해주셔서 감사합니다."
        onChange={(e) => setAppreciate(e.target.value)}
        className="p-2 w-full focus:outline-none hover:border-b-[1px] focus:border-b-[1px] hover:border-gray-3 focus:border-primary"
      />
    </section>
  );
};

export default AppreciateMessage;
