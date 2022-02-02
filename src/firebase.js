// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `AIzaSyDSx3F77OhD7OSB-7DuwbtkGEeyrMBHpCs`,
  authDomain: "crypto-tracker-ca82a.firebaseapp.com",
  projectId: "crypto-tracker-ca82a",
  storageBucket: "crypto-tracker-ca82a.appspot.com",
  messagingSenderId: "871972173620",
  appId: "1:871972173620:web:075f6abc9ecb28dd8fd761",
  measurementId: "G-8J7P0LM8KJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth()
const providerGoogle = new GoogleAuthProvider();

export {db, auth, providerGoogle};