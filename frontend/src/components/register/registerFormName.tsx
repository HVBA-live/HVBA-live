const RegisterFormName = () =>{
    return (
        <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#003d66] mb-0.5">
                Voornaam <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Jan"
                className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#003d66] mb-0.5">
                Achternaam <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Janssen"
                className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>
    )
}

export default RegisterFormName;