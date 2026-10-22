import RegisterFormButton from "./registerFormButton";
import RegisterFormEmail from "./registerFormEmail";
import RegisterFormName from "./registerFormName";
import RegisterFormPassword from "./registerFormPassword";
import RegisterFormPrivacy from "./registerFormPrivacy";

const RegisterForm = () =>{
    return(
        <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
          <RegisterFormName/>

          <RegisterFormEmail/>

          <RegisterFormPassword confirm={false}/>
          <RegisterFormPassword confirm={true}/>

          <RegisterFormPrivacy/>

          <RegisterFormButton/>
        </form>
    )
}

export default RegisterForm;