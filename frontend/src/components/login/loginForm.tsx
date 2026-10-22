import LoginFormEmail from "./loginFormEmail";
import LoginFormPassword from "./loginFormPassword";
import LoginFormSubmit from "./loginFormSubmit";

const LoginForm = () =>{
    return (
        <form action="#" method="POST" className="space-y-6">
            <LoginFormEmail/>

            <LoginFormPassword/>
            <LoginFormSubmit/>
        </form>
    )
}
export default LoginForm;