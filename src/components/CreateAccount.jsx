import React, {useState} from 'react';
import {createUserWithEmailAndPassword,signInWithPopup, signOut} from "firebase/auth"
import {auth, googleAuthProvider} from "../config/firebase"

import {Link} from "react-router-dom";

const CreateAccount = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const createAccount = async (e) => {
        e.preventDefault();

        if (password===confirmPassword){
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.error(err);
                alert("nieprawidłowy email lub hasło")
            }
        }else{
            alert("passwords don't match")
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
                <input type="password" placeholder="confirm password" onChange={e => setConfirmPassword(e.target.value)}
                       value={confirmPassword}/>
                <button onClick={createAccount}>Create account</button>
            </form>
            <Link to="/login">Already have account? Sign In</Link>
        </div>
    );
};

export default CreateAccount;