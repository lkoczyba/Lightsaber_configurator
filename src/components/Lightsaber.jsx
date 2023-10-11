import React, {useContext, useEffect, useState} from 'react';
import {Canvas, useLoader} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {Button} from "@/components/ui/button"
import {LightsaberPart} from "./LightsaberPart";
import {LightsaberContext} from "../LightsaberContext.jsx";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../config/firebase";
import Configurator from "./Configurator";
import {useParams} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile, faFloppyDisk, faPenToSquare} from '@fortawesome/free-solid-svg-icons'

const Lightsaber = ({lightsaberObject}) => {

    const { edit } = useParams();

    const {lightsaberConfig,updateLightsaberConfig,setLightsaberConfig, resetLightsaberConfig} = useContext(LightsaberContext);

    const [editMode, setEditMode] = useState(true);

    const calcLightsaberLength = () => {
        const emitterLength = lightsaberConfig.emitter.length * lightsaberObject.scene.getObjectByName(lightsaberConfig.emitter.name).geometry.boundingBox.max.x;
        const switchLength = lightsaberConfig.switch.length * lightsaberObject.scene.getObjectByName(lightsaberConfig.switch.name).geometry.boundingBox.max.x
        const gripLength = lightsaberConfig.grip.length * lightsaberObject.scene.getObjectByName(lightsaberConfig.grip.name).geometry.boundingBox.max.x;
        const pommelLength = lightsaberConfig.pommel.length * lightsaberObject.scene.getObjectByName(lightsaberConfig.pommel.name).geometry.boundingBox.max.x
        const lightsaberLength = emitterLength + switchLength + gripLength + pommelLength;
        const emitterPosition = -lightsaberLength / 2;
        const switchPosition = emitterPosition + emitterLength;
        const gripPosition = switchPosition + switchLength;
        const pommelPosition = gripPosition + gripLength;

        updateLightsaberConfig("emitter", "position", emitterPosition);
        updateLightsaberConfig("switch", "position", switchPosition);
        updateLightsaberConfig("grip", "position", gripPosition);
        updateLightsaberConfig("pommel", "position", pommelPosition);

    }

    useEffect(() => {

        calcLightsaberLength();

    }, [lightsaberConfig.emitter.length, lightsaberConfig.switch.length, lightsaberConfig.grip.length, lightsaberConfig.pommel.length, lightsaberConfig.emitter.name, lightsaberConfig.switch.name, lightsaberConfig.grip.name, lightsaberConfig.pommel.name, lightsaberConfig.id]);

    useEffect(() => {

        calcLightsaberLength();

    }, []);

    const handleSave = async () => {
        const name = prompt("Lightsaber name");
        setLightsaberConfig({...lightsaberConfig, name: name});
        const collectionRef = collection(db, "lightsaberConfigurator");
        await addDoc(collectionRef, {...lightsaberConfig, name: name});
    }

    const handleEdit = ()=>{
        setEditMode(prevState => !prevState);
    }

    const handleNew = ()=>{
        resetLightsaberConfig();
        calcLightsaberLength();
    }

    useEffect(() => {
        if(edit==="EditOff"){
            setEditMode(false);
        }
        if(edit==="EditOn"){
            setEditMode(true);
        }

    }, [edit]);



    return (
        <>
            <div className={editMode?"basis-3/4 shrink grow overflow-hidden h-[calc(100vh-50px)]":"basis-full overflow-hidden shrink grow h-[calc(100vh-50px)]" }>
                <div className="absolute z-10">
                    <Button className="m-1" variant="secondary" size="icon" onClick={handleSave}><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                    <Button className="m-1" variant="secondary" size="icon" onClick={handleEdit}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                    <Button className="m-1" variant="secondary" size="icon" onClick={handleNew}><FontAwesomeIcon icon={faFile} /></Button>
                </div>
                <Canvas camera={{position: [0, 0, 3], near: 0.025}}>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="emitter"/>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="switch"/>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="grip"/>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="pommel"/>
                    {/*<mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-0.3}>*/}
                    {/*    <planeGeometry args={[170, 170]}/>*/}
                    {/*    <MeshReflectorMaterial*/}
                    {/*        blur={[300, 100]}*/}
                    {/*        resolution={2048}*/}
                    {/*        mixBlur={1}*/}
                    {/*        mixStrength={40}*/}
                    {/*        roughness={1}*/}
                    {/*        depthScale={1.2}*/}
                    {/*        minDepthThreshold={0.4}*/}
                    {/*        maxDepthThreshold={1.4}*/}
                    {/*        color="#010101"*/}
                    {/*        metalness={0.5}*/}
                    {/*    />*/}
                    {/*</mesh>*/}


                    <color attach="background" args={["#020817"]}/>
                    {/*<fog attach="fog" args={["#111111", 10, 20]}/>*/}
                    <Environment preset={"studio"}/>
                    <OrbitControls/>
                    {/*<Stats/>*/}
                </Canvas>
            </div>

            <Configurator lightsaberObject={lightsaberObject} active={editMode}/>
        </>
    );
};

export default Lightsaber;