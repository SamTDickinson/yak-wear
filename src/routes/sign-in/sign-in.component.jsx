import {useEffect} from "react";
import {getRedirectResult} from 'firebase/auth';

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    //
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = getRedirectResult(auth);
    //         console.log(response)
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     fetchData();
    // }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <div>
                <h1> I am the Sign In Page</h1>
                <button onClick={logGoogleUser}>Sign in with Google Popup</button>
                {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
                <SignUpForm />
            </div>

        </div>
    )
}

export default SignIn;