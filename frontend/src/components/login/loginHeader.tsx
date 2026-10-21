import logo from "../../assets/HVBALogo.png";

const LoginHeader = () => {
    return(
        <div className="text-center mb-6">
            <img src={logo} alt="HVBA Logo" className="mx-auto h-20 object-contain mb-2"/>
            <h1 className="text-2xl text-hvba-dark mb-4">HVBA Live</h1>
                
            <hr className="border-gray-200 mb-6"/>
                
            <h2 className="text-2xl font-bold text-hvba-dark mb-6">Inloggen</h2>
        </div>
    )
}

export default LoginHeader;