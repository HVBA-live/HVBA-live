import PasswordForgottenFormEmail from "./passwordForgottenFormEmail";
import PasswordForgottenFormSubmit from "./passwordForgottenFormSubmit";

const PasswordForgottenForm = () => {
    return (
        <form action="#" method = "POST" className="space-y-6">
            {/*Emailform*/}
            <PasswordForgottenFormEmail/>
            {/*submit buttonform*/}
            <PasswordForgottenFormSubmit/>
        </form>
    )
}

export default PasswordForgottenForm;