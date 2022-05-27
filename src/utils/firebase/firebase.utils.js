import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import  { ReactComponent as APIKeys} from "../../secrets/api-keys";

'../../secrets/api-keys'

const firebaseConfig = APIKeys;

// Initialize Firebase
const firebasaeApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);