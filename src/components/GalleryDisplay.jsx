import React, {useContext} from 'react';
import {Canvas} from "@react-three/fiber";
import {LightsaberPart} from "./LightsaberPart";
import {Environment, OrbitControls} from "@react-three/drei";
import {LightsaberContext} from "../LightsaberContext.jsx";
import { useNavigate } from "react-router-dom";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../config/firebase";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
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
        <Card className="w-[200px] max-h-200px overflow-hidden m-3 group hover:scale-110" onClick={handleClick}>
            <CardContent className="overflow-hidden p-0 relative">
            <h2 className="absolute z-30 ml-2">{lightsaberConfig.name}</h2>
            <div className="absolute z-40 bottom-0 right-0 mr-2 invisible group-hover:visible">
                <Button className="m-1" variant="secondary" size="icon" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                <Button className="m-1" variant="secondary" size="icon" onClick={handleEdit}><FontAwesomeIcon icon={faPenToSquare} /></Button>
            </div>
            <Canvas camera={{position: [0, 0, 3], near: 0.025}}>
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="emitter" />
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="switch" />
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="grip" />
                <LightsaberPart lightsaberConfig={lightsaberConfig} part="pommel" />
                <color attach="background" args={["#1e293b"]}/>
                <Environment preset={"studio"}/>
                <OrbitControls/>
            </Canvas>
            </CardContent>
        </Card>
    );
};

export default GalleryDisplay;