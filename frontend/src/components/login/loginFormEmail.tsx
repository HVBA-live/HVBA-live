const LoginFormEmail = () =>{
    return (
        <div>
                <label htmlFor="email" className="block text-sm font-bold text-hvba-dark mb-2">E-mail</label>
                <input type="email" id="email" placeholder="uwmail@mail.be" 
                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hvba-blue focus:border-transparent text-gray-700 placeholder-gray-400"/>
            </div>
    )
}

export default LoginFormEmail;