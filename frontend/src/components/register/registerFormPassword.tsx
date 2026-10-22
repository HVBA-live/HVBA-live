interface ConfirmOrNot{
    confirm:boolean
}

const RegisterFormPassword = ({confirm=false}:ConfirmOrNot) =>{
    return(
        <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#003d66] mb-0.5">
              {confirm && "Bevestig"} Wachtwoord <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder={`${confirm? "Bevestig wachtwoord" : "Wachtwoord aanmaken"}`}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-sky-400 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
    )
}

export default RegisterFormPassword;