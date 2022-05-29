import {createContext, useState, useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser} from "../../utils/firebase/firebase.utils";

// The actual value we want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener( (user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}