import close_img from "../assets/close.png";
import "./auth.css"
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
                {isSignIn ? <SignInSubComp auth={auth} changeState={switchSignInSignOut} /> : <SignUpSubComp auth={auth} changeState={switchSignInSignOut} />}
                <div className="other-logins">
                    <img src={googleIconStatic} onClick={signInWithGoogle} alt="google-icon" />
                    <button className="btn_glob" onClick={signInWithGoogle}>Sign In With Google</button>
                </div>
            </div>
        </div>
    );
};

function SignInSubComp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [checks, setChecks] = useState({
        email: false,
        password: false
    });
    function authEmailAndPassword(e) {
        e.preventDefault();
        setChecks({ email: false, password: false });
        if (email === "") {
            setChecks({ email: true, password: checks.password });
            return;
        }
        if (password === "") {
            setChecks({ email: checks.email, password: true });
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                // for future use of user details

            }).catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setChecks({ email: true, password: false });
                } else if (error.code === "auth/wrong-password") {
                    setChecks({ email: false, password: true });
                }
            })
    }

    return (
        <div className="auth-form">
            <h2 className="heading">Login</h2>
            <form onSubmit={authEmailAndPassword}>
                <input className={checks.email ? "wrong" : ""}
                    type="email" name="email" id="email" placeholder="Email" value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setChecks({ email: false, password: checks.password })
                    }}
                />
                {checks.email ? <label className="email-label" htmlFor="email">{email ? "Email not found" : "Email cannot be empty"}</label> : ""}
                <input className={checks.password ? "wrong" : ""}
                    type="password" name="password" id="password" placeholder="Password" value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setChecks({ email: checks.email, password: false });
                    }}
                />
                {checks.password ? <label className="password-label" htmlFor="password">{password ? "Passowrd Incorrect" : "Password cannot be empty"}</label> : ""}
                <button type="submit" className="btn_glob">
                    Sign In
                </button>
            </form>
            <p>New User? <strong onClick={props.changeState}>Sign Up</strong> to continue.</p>
        </div>
    );
}

function SignUpSubComp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checks, setChecks] = useState({
        email: false,
        password: false
    });
    function createAuthEmailAndPassword(e) {
        e.preventDefault();
        setChecks({ email: false, password: false });
        if (email === "") {
            setChecks({ email: true, password: checks.password });
            return;
        }
        if (password === "") {
            setChecks({ email: checks.email, password: true });
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                // for future use of user details

            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setChecks({ email: true, password: false });
                }
                if (error.code === "auth/weak-password"){
                    setChecks({email: checks.email, password: true});
                }
            })
    }
    return (
        <div className="auth-form">
            <h2 className="heading">Sign Up</h2>
            <form onSubmit={createAuthEmailAndPassword}>
                <input className={checks.email ? "wrong" : ""} type="email" id="email" name="email" placeholder="Email" value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setChecks({ email: false, password: checks.password });
                    }}
                />
                {checks.email ? <label className="email-label" htmlFor="email">{email ? "Email already in use." : "Email cannot be empty."}</label> : ""}
                <input className={checks.password ? "wrong" : ""} type="password" id="password" name="password" placeholder="Password" value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setChecks({ email: checks.email, password: false });
                    }}
                />
                {checks.password ? <label className="password-label" htmlFor="password">{password?"Passwords must be at least 6 characters long.":"Password cannot be empty"}</label> : ""}
                <button type="submit" className="btn_glob">
                    Sign Up
                </button>
            </form>
            <p>Existing User? <strong onClick={props.changeState}>Sign In</strong> to continue.</p>
        </div>
    );
}

export default SignIn;
