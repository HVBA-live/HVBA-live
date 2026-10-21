import logo from "../../assets/HVBALogo.png";
const RegisterHeader = () =>{
    return(
        <div className="text-center mb-4">
          <div className="border-b border-gray-200 pb-2 mb-3">
            <img 
              src={logo} 
              alt="HVBA Logo" 
              className="mx-auto h-12 object-contain mb-1"
            />
            <h1 className="text-xl font-medium text-[#003d66]">HVBA Live</h1>
          </div>
          <h2 className="text-xl font-bold text-[#003d66]">Account aanmaken</h2>
        </div>
    )
}

export default RegisterHeader;