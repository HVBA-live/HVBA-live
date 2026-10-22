const RegisterFormPrivacy = () =>{
    return(
        <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="privacy"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400"
            />
            <label htmlFor="privacy" className="text-xs text-[#003d66] leading-tight">
              Door je aan te melden ga je akkoord met de{" "}
              <a href="#" className="underline font-semibold text-[#003d66]">
                Privacy-voorwaarden
              </a>
              , inclusief het gebruik van cookies.<span className="text-red-500">*</span>
            </label>
          </div>
    )
}

export default RegisterFormPrivacy;