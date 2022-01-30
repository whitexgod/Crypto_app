import close_img from "../assets/close.png";
import {auth, providerGoogle} from "../firebase"
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"

export const SignIn = ({dontWantToSignIn}) => {

  const [user] = useAuthState(auth)

    const handleDontWantToSignIn = () => {
        dontWantToSignIn(false);
    };

    function signInWithGoogle(){
      signInWithPopup(auth, providerGoogle);
    }

    function createAuthEmailAndPassword(e) {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      createUserWithEmailAndPassword(auth, email, password)
    }
    function authEmailAndPassword(e) {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      signInWithEmailAndPassword(auth, email, password)
    }

  return (
    <div className="popup">
      <button className="close-btn" onClick={handleDontWantToSignIn} >
      {user? handleDontWantToSignIn() : ""}
        <img src={close_img} alt="" />
      </button>
      <div className="details-box">
        <h2>Sign In Here</h2>
        <div className="Email-login">
      <h6>Existing User?</h6>
        <form onSubmit={authEmailAndPassword}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name='password' placeholder="password" />
          <button type="submit" className="">Sign In</button>
        </form>
        <h6>New User? Sign Up to continue.</h6>
        <form onSubmit={createAuthEmailAndPassword}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name='password' placeholder="password" />
          <button type="submit" className="">Sign Up</button>
        </form>
      </div>
      <h3>or</h3>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </div>
    </div>
  );
};
