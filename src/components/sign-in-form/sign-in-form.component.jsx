import {useState, useContext} from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import {UserContext} from "../contexts/user.context";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.component.scss';


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User not found, please register!');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect Password for email');
                    break;
                default:
                    alert('user creation encountered an error', error);
            }
        }
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    inputOptions={{
                        type: 'email',
                        required: true,
                        onChange: handleChange,
                        name: 'email',
                        value: email
                    }}
                />

                <FormInput
                    label='Password'
                    inputOptions={{
                        type: 'password',
                        required: true,
                        onChange: handleChange,
                        name: 'password',
                        value: password
                    }}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>

    )
}

export default SignInForm;