const RegisterFormEmail = () =>{
    return (
        <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#003d66] mb-0.5">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="uwmail@email.be"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-sky-400"
            />
          </div>
    )
}

export default RegisterFormEmail;