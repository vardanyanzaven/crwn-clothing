import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNXb6Brz7Z8DWR-BmA-ggBiKPrSp0xzQI",
  authDomain: "crwn-clothing-db-26860.firebaseapp.com",
  projectId: "crwn-clothing-db-26860",
  storageBucket: "crwn-clothing-db-26860.appspot.com",
  messagingSenderId: "835278840430",
  appId: "1:835278840430:web:1d5084f7ae18d2d2973c7f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error) {
            console.log("Error creating the user", error.message);
        }

        return userDocRef;
    }

    // if user data exists
    // return userDocRef

    // if user data does NOT exist
    // create/set the document with user data from userAuth in my collection
} 
