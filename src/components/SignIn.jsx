import React, {useState} from 'react';
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import {auth, googleAuthProvider} from "../config/firebase"
import {Link} from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            alert("nieprawidłowy email lub hasło")
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={"sign-in"}>
            <form className="sign-in__form">
                <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}
                       value={password}/>
                <button onClick={signIn}>Sign In</button>
            </form>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={logout}>Sign Out</button>
            <Link to="/createAccount">Don't have account? Create account</Link>
        </div>
    );
};

export default SignIn;