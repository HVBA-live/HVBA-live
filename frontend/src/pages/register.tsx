import RegisterFooter from "../components/register/registerFooter";
import RegisterForm from "../components/register/registerForm";
import RegisterHeader from "../components/register/registerHeader";


const Register = () => {
  return (
    <div className="bg-[#edf2f7] bg-linear-to-br from-hvba-blue via-[#a3b8cc] to-[#ffffff] min-h-screen flex items-center justify-center p-2 sm:p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-none sm:rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.05)] p-5 sm:p-6 border-0 sm:border border-gray-100">
        <RegisterHeader/>
        <RegisterForm/>
        <RegisterFooter/>
      </div>
    </div>
  );
};

export default Register;