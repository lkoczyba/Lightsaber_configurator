// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0w-iAbSxR4ZgXlSRWPb5GvTo5vcc4UFA",
    authDomain: "lightsaber-configurator.firebaseapp.com",
    projectId: "lightsaber-configurator",
    storageBucket: "lightsaber-configurator.appspot.com",
    messagingSenderId: "70775321944",
    appId: "1:70775321944:web:5728bb117ab0f27995e12d",
    measurementId: "G-6W3P9Z2JNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
