import PasswordResetFormPassword from "./passwordResetFormPassword";
import PasswordResetFormSubmit from "./passwordResetFormSubmit";

const PasswordResetForm = () => {
    return (
        <form action="#" method ="POST" className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
            <PasswordResetFormPassword confirm = {false}/>
            <PasswordResetFormPassword confirm = {true}/>
            <PasswordResetFormSubmit/>
        </form>
    )
}

export default PasswordResetForm;