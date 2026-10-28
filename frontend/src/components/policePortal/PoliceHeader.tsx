const PoliceHeader = () => {
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

export default PoliceHeader;