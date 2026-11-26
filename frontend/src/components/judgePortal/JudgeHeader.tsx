/*const JudgeHeader = () => {
  const date = new Date();
  const currentDate = date.toLocaleDateString("nl-BE");
  return (
    <div className="w-full mb-6 p-3">
      <h2 className="flex justify-center items-center text-xl font-bold text-[#003d66]">
        {currentDate}
      </h2>
    </div>
  );
};

export default JudgeHeader;*/

const JudgeHeader = () => {
  const date = new Date();
  const currentDate = date.toLocaleDateString("nl-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full mb-6 p-3">
      <h2 className="flex justify-center items-center gap-2.5 text-xl font-bold text-[#005a9c]">
        {/* Hamer-icoon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10" />
          <path d="m16 16 6-6" />
          <path d="m8 8 6-6" />
          <path d="m9 7 8 8" />
          <path d="m21 11-8-8" />
        </svg>
        <span>{currentDate}</span>
      </h2>
    </div>
  );
};

export default JudgeHeader;