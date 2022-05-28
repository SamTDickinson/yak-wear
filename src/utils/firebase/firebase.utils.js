import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC5pTUHiymluY3yAc31kGAGRt3hhUA9ILg",
    authDomain: "yak-wear-db.firebaseapp.com",
    projectId: "yak-wear-db",
    storageBucket: "yak-wear-db.appspot.com",
    messagingSenderId: "509585521406",
    appId: "1:509585521406:web:f004b35aacd503261483af",
    measurementId: "G-YVE8QGX6HE"
};

// Initialize Firebase
const firebasaeApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}