const PoliceHeader = () => {
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
        {/* Schild-icoon */}
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
        <span>{currentDate}</span>
      </h2>
    </div>
  );
};

export default PoliceHeader;