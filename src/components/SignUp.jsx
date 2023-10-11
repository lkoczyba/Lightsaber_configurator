import React, {useState} from 'react';
import {signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import {auth, googleAuthProvider} from "../config/firebase"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {

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
        <Card className="w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CardHeader className="text-xl text-center font-bold">
                Sign Up
            </CardHeader>
            <CardContent>

                <form className="flex flex-col gap-2 mb-4">
                    <Button onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} /> &nbsp;&nbsp;Sign In With Google</Button>
                    <p className="text-xs text-accent text-center">or Sign up with email</p>
                    <Input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} value={email}/>
                    <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}
                           value={password}/>
                    <Button onClick={signIn}>Submit</Button>
                </form>
                <Link className="text-xs text-accent block" to="/createAccount">Don't have an account? Create account</Link>
                <Button className="my-2" onClick={logout}>Sign Out</Button>

            </CardContent>
        </Card>
    );
};

export default SignUp;