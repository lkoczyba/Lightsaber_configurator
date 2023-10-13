import {useEffect,useState} from "react";
import {useLoader} from "@react-three/fiber";
import {onAuthStateChanged} from "firebase/auth";

import {auth,} from "./config/firebase"

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import Lightsaber from "./components/Lightsaber";


import {
    HashRouter,
    Route,
    Routes,

} from 'react-router-dom';
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp.jsx";
import {LightsaberProvider} from "./LightsaberContext.jsx";
import CreateAccount from "./components/CreateAccount";


export default function App() {


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser("")
            }
        })
    }, []);
    const lightsaberObject = useLoader(GLTFLoader, './models/Lightsaber.glb');

    const [currentUser, setCurrentUser] = useState('');


    return (

        <HashRouter>
            <LightsaberProvider>
                <Navigation currentUser={currentUser}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='createLightsaber'>
                        <Route path=':edit' element={<div className="flex">
                            <Lightsaber lightsaberObject={lightsaberObject} currentUser={currentUser}/>
                        </div>}/>
                    </Route>
                    <Route path='gallery' element={<Gallery lightsaberObject={lightsaberObject} currentUser={currentUser}/>}/>
                    <Route path='login' element={<SignUp/>}/>
                    <Route path='createAccount' element={<CreateAccount/>}/>
                </Routes>
            </LightsaberProvider>
        </HashRouter>


    );
}
