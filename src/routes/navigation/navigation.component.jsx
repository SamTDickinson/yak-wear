import {Fragment, useContext} from "react";
import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../assets/img/crown.svg";
import {UserContext} from "../../components/contexts/user.context";
import './navigation.styles.scss'
import {Authentication} from "../authentication/authentication.component";
import {signOutUser} from "../../utils/firebase/firebase.utils";


const Navigation = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

    // console.log(currentUser);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className='nav-link' onClick={signOutHandler}>
              {' '}
                            SIGN OUT{' '}
            </span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;