import logo from "../assets/HVBALogo.PNG"

const Reset = () => {
    return (
        <div className="bg-[#edf2f7] min-h-screen bg-linear-to-br from-hvba-blue via-[#a3b8cc] to-[#ffffff]  flex items-center justify-center p-0 sm:p-4 font-sans">
            <div className="bg-white w-full max-w-md rounded-none sm:rounded-lg shadow-none sm:shadow-[0_0_15px_rgba(0,0,0,0.05)] p-5 sm:p-8 border-0 sm:border border-gray-100">
                {/*ResetHeader*/}
                <header className="text-center mb-6">
                    <img src={logo} alt="HVBA Logo" className="mx-auto h-20 object-contain mb-2"/>
                    <h1 className="text-2xl text-hvba-dark mb-4">HVBA Live</h1>                                
                    <hr className="border-gray-200 mb-6"/>                                
                    <h2 className="text-2xl font-bold text-hvba-dark mb-6">Wachtwoord resetten</h2>
                    <p className="text-sm text-gray-500">Vul uw e-mailadres in om een resetlink te ontvangen.</p> 
                </header>
                {/*layout form*/}
                <form action="#" method = "POST" className="space-y-6">
                    {/*Emailform*/}
                    <label htmlFor="email" className="block text-sm font-bold text-hvba-dark mb-2">Email</label>
                    <input type="email" id="email" placeholder = "uwmail@gmail.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hvba-blue focus:border-transparent text-gray-700 placeholder-gray-400"/>
                    {/*submit buttonform*/}
                    <button type = "submit" className="w-full bg-hvba-blue hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition duration-200">Verstuur resetlink</button>
                </form>
                {/*Footer*/}
                <footer className="mt-8 text-center flex flex-col space-y-8">
                    <a href="register" className="font-bold text-hvba-blue hover:underline">Terug naar inloggen</a>
                </footer>
            </div>
        </div>
    )
}

export default Reset;