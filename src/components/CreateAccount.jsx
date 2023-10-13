import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../config/firebase"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button"

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
                alert("wrong e-mail or password")
            }
        }else{
            alert("passwords don't match")
        }


    }

    return (
        <Card className="w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CardHeader className="text-xl text-center font-bold">
                Create account
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-2 mb-4">
                    <Input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} value={email}/>
                    <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}
                           value={password}/>
                    <Input type="password" placeholder="confirm password"
                           onChange={e => setConfirmPassword(e.target.value)}
                           value={confirmPassword}/>
                    <Button onClick={createAccount}>Submit</Button>
                </form>
                <Link className="text-xs text-accent" to="/login">Already have an account? Sign In</Link>
            </CardContent>
        </Card>
    );
};

export default CreateAccount;