const LoginFormPassword = () =>{
    return (
        <div>
                <label htmlFor="password" className="block text-sm font-bold text-hvba-dark mb-2">Wachtwoord</label>
                <div className="relative">
                    <input type="password" id="password" placeholder="Voer uw wachtwoord in" 
                           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hvba-blue focus:border-transparent text-gray-700 placeholder-gray-400"/>
                    
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>
    )
}

export default LoginFormPassword;