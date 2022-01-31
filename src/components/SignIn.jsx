import close_img from "../assets/close.png";
import "./signin.css"
import { auth, providerGoogle } from "../firebase";
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import googleIconStatic from "../assets/google_icon_static.png"

const SignIn = ({ dontWantToSignIn }) => {

    const [user] = useAuthState(auth);
    const [isSignIn, setisSignIn] = useState(true);

    const handleDontWantToSignIn = () => {
        dontWantToSignIn(false);
    };

    function signInWithGoogle() {
        signInWithPopup(auth, providerGoogle);
    }

    const switchSignInSignOut = () => {
      setisSignIn(!isSignIn);
    }
    
    return (
        <div className="popup">
            <button className="close-btn" onClick={handleDontWantToSignIn}>
                {user ? handleDontWantToSignIn() : ""}
                <img src={close_img} alt="" />
            </button>
            
            <div className="auth-box">
                <div className="email-login">
                  {isSignIn ? <SignInSubComp changeState={switchSignInSignOut} /> : <SignUpSubComp changeState={switchSignInSignOut}/>}
                </div>
                
                <div className="other-logins">
                <img src={googleIconStatic} onClick={signInWithGoogle} alt="google-icon" />
                <button className="btn_glob" onClick={signInWithGoogle}>Sign In With Google</button>
                </div>
            </div>
        </div>
    );
};

function SignInSubComp(props) {
    function authEmailAndPassword(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password);
    }

    return (
        <>
            <h2 className="heading">Login</h2>
            <form onSubmit={authEmailAndPassword}>
                <input type="text" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit" className="btn_glob">
                    Sign In
                </button>
            </form>
            <p>New User? <strong onClick={props.changeState}>Sign Up</strong> to continue.</p>
        </>
    );
}

function SignUpSubComp(props) {
    function createAuthEmailAndPassword(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(auth, email, password);
    }
    return (
        <>
            <h2 className="heading">Sign Up</h2>
            <form onSubmit={createAuthEmailAndPassword}>
                <input type="text" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit" className="btn_glob">
                    Sign Up
                </button>
            </form>
            <p>Existing User? <strong onClick={props.changeState}>Sign In</strong> to continue.</p>
        </>
    );
}

export default SignIn;
