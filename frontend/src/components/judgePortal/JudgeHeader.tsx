import logo from "../../assets/HVBALogo.png";
const JudgeHeader = () =>{
    const date = new Date();
    const currentDate = date.toLocaleDateString("nl-BE")
    return(
        <div className="w-full mb-6 p-3" >
         <div className="flex items-center pb-3 border-b border-gray-200">
          <img 
            src={logo} 
            alt="HVBA Logo" 
            className="h-10 object-contain"
          />
          <h1 className="text-xl font-bold  pl-3 pt-3 text-[#003d66]">
            HVBA Live
          </h1>
        </div>
        <div>
        </div>
          <h2 className="flex justify-center items-center text-xl font-bold text-[#003d66]">{currentDate}</h2>
        </div>
    )
}

export default JudgeHeader;

