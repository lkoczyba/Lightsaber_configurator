import React, {useContext} from 'react';
import {Canvas} from "@react-three/fiber";
import {LightsaberPart} from "./LightsaberPart";
import {Environment, OrbitControls} from "@react-three/drei";
import {LightsaberContext} from "../LightsaberContext.jsx";
import { useNavigate } from "react-router-dom";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../config/firebase";

const GalleryDisplay = ({lightsaberConfig}) => {

    let navigate =useNavigate();

    const {setLightsaberConfig}= useContext(LightsaberContext);

    const handleClick = ()=>{
        setLightsaberConfig(lightsaberConfig);
        navigate('/createLightsaber/EditOff');
    }
    const handleDelete = async (e) => {
        e.stopPropagation();
        const docRef = doc(db, "lightsaberConfigurator", lightsaberConfig.id);
        await deleteDoc(docRef);
    }
    const handleEdit = (e)=>{
        e.stopPropagation();
        setLightsaberConfig(lightsaberConfig);
        navigate('/createLightsaber/EditOn');
    }

    return (
        <div className="gallery-display" onClick={handleClick}>
            <h2 className="gallery-display__title">{lightsaberConfig.name}</h2>
            <div className="gallery-display__button-container">
                <button onClick={handleDelete} className="gallery-display__button">Delete</button>
                <button onClick={handleEdit} className="gallery-display__button">Edit</button>
            </div>
            <Canvas camera={{position: [0, 0, 3], near: 0.025}}>
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="emitter" />
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="switch" />
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="grip" />
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="pommel" />
                <color attach="background" args={["#06063b"]}/>
                <Environment preset={"studio"}/>
                <OrbitControls/>
            </Canvas>
        </div>
    );
};

export default GalleryDisplay;