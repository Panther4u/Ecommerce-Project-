// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBjdNVTFxAIW2SABArA7zM_xqerxPiWR9o",
    authDomain: "ecommerce-project-425410.firebaseapp.com",
    projectId: "ecommerce-project-425410",
    storageBucket: "ecommerce-project-425410.appspot.com",
    messagingSenderId: "744223957530",
    appId: "1:744223957530:web:ae5ee93736065d5380a7a3",
    measurementId: "G-W6XQRFJ3WP"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, getAuth, GoogleAuthProvider, signInWithPopup, signOut };
export { auth };
