import PasswordResetHeader from "../components/passwordReset/passwordResetHeader";
import PasswordResetForm from "../components/passwordReset/passwordResetForm";
import PasswordResetFooter from "../components/passwordReset/passwordResetFooter";

const PasswordReset = () => {
    return (
        <div className="bg-[#edf2f7] min-h-screen bg-linear-to-br from-hvba-blue via-[#a3b8cc] to-[#ffffff]  flex items-center justify-center p-0 sm:p-4 font-sans">
            <div className="bg-white w-full max-w-md rounded-none sm:rounded-lg shadow-none sm:shadow-[0_0_15px_rgba(0,0,0,0.05)] p-5 sm:p-8 border-0 sm:border border-gray-100">
                {/*Header*/}
                <PasswordResetHeader/>
                {/*layout form*/}
                <PasswordResetForm/>
                {/*Footer*/}
                <PasswordResetFooter/>               
            </div>
        </div>
    )
}

export default PasswordReset;