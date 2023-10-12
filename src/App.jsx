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
                console.log(user)
            } else {
                setCurrentUser("")
            }
        })
    }, []);

    // const shaders = [
    //     "https://draft.nodetoy.co/Ck1Qng4nnhoN81Uk",
    //     "https://draft.nodetoy.co/HkLu6MWAP3q5HBeb",
    //     // "https://draft.nodetoy.co/SVg74z0XkVqHMScD",
    //     // "https://draft.nodetoy.co/HeLVix1RN5dTXcke"
    // ]

    const lightsaberObject = useLoader(GLTFLoader, './models/Lightsaber.glb');


    // const [loaded, setLoaded] = useState(false);
    // const [emitters, setEmitters] = useState([]);
    // const [switches, setSwitches] = useState([]);
    // const [grips, setGrips] = useState([]);
    // const [pommels, setPommels] = useState([]);
    //
    // useEffect(() => {
    //     lightsaber.scene.traverse(o => {
    //         if (o.name.includes("Emitter")) {
    //             setEmitters(prev=>([...prev, o]))
    //         }
    //         if (o.name.includes("Switch")) {
    //             setSwitches(prev=>([...prev, o]))
    //         }
    //         if (o.name.includes("Grip")) {
    //             setGrips(prev=>([...prev, o]))
    //         }
    //         if (o.name.includes("Pommel")) {
    //             setPommels(prev=>([...prev, o]))
    //         }
    //     });

    // const emitters = useRef([]);
    // const switches = useRef([]);
    // const grips = useRef([]);
    // const pommels = useRef([]);
    //
    //
    // useEffect(() => {
    //     lightsaber.scene.traverse(o => {
    //         if (o.name.includes("Emitter")) {
    //             emitters.current.push(o);
    //         }
    //         if (o.name.includes("Switch")) {
    //             switches.current.push(o);
    //         }
    //         if (o.name.includes("Grip")) {
    //             grips.current.push(o);
    //         }
    //         if (o.name.includes("Pommel")) {
    //             pommels.current.push(o);
    //         }
    //     });
    //
    //     setLoaded(true)
    //
    // }, []);

    const [currentUser, setCurrentUser] = useState('');


    return (
        // <div className="app">
        //     {loaded ?
        //         <Lightsaber lightsaberConfig={lightsaberConfig} emitters={emitters.current} switches={switches.current}
        //                     grips={grips.current} pommels={pommels.current}/> : null}
        //     {loaded ? <Configurator lightsaberConfig={lightsaberConfig} setLightsaberConfig={setLightsaberConfig}
        //                             emitters={emitters.current} switches={switches.current} grips={grips.current}
        //                             pommels={pommels.current}/> : null}
        // </div>

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
