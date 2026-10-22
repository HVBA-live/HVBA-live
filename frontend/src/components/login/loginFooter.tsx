const LoginFooter = () =>{
    return (
        <footer className="mt-8 text-center flex flex-col space-y-8">
            <a href="password-forgotten" className="text-sm font-bold text-hvba-blue hover:underline">
                Wachtwoord vergeten?
            </a>
            
            <p className="text-sm text-gray-500">
                Heeft u nog geen account? 
                <a href="register" className="font-bold text-hvba-blue hover:underline">Hier registreren</a>
            </p>
        </footer>
    )
}

export default LoginFooter;