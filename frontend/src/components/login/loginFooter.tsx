const LoginFooter = () =>{
    return (
        <footer className="mt-8 text-center flex flex-col space-y-8">
            <a href="#" className="text-sm font-bold text-[#1d4ed8] hover:underline">
                Wachtwoord vergeten?
            </a>
            
            <p className="text-sm text-gray-500">
                Heeft u nog geen account? 
                <a href="#" className="font-bold text-[#1d4ed8] hover:underline">Hier registreren</a>
            </p>
        </footer>
    )
}

export default LoginFooter;