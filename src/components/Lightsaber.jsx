import React, {useContext, useEffect, useState} from 'react';
import {Canvas, extend} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {Button} from "@/components/ui/button"
import {LightsaberPart} from "./LightsaberPart";
import {LightsaberContext} from "../LightsaberContext.jsx";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../config/firebase";
import Configurator from "./Configurator";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile, faFloppyDisk, faPenToSquare, faLightbulb} from '@fortawesome/free-solid-svg-icons'
import Beam from "@/components/Beam.jsx";
import {Effects} from '@react-three/drei'
import {UnrealBloomPass} from 'three-stdlib'
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass'
import * as THREE from 'three'

extend({UnrealBloomPass, OutputPass})

const Lightsaber = ({lightsaberObject, currentUser}) => {

    const onSound = new Audio("../../sounds/Lightsaber_On.wav");
    const offSound = new Audio("../../sounds/Lightsaber_Off.wav");

    const {edit} = useParams();

    const {
        lightsaberConfig,
        updateLightsaberConfig,
        setLightsaberConfig,
        resetLightsaberConfig
    } = useContext(LightsaberContext);

    const [editMode, setEditMode] = useState(true);
    const [beamOn, setBeamOn] = useState(false);

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

        if(currentUser) {
            const name = prompt("Lightsaber name");
            setLightsaberConfig({...lightsaberConfig, name: name});
            const collectionRef = collection(db, "lightsaberConfigurator");
            await addDoc(collectionRef, {...lightsaberConfig, name: name, userId: currentUser.uid});
        }else{
            alert("You must log in to save")
        }
    }

    const handleEdit = () => {
        setEditMode(prevState => !prevState);
    }

    const handleNew = () => {
        resetLightsaberConfig();
        calcLightsaberLength();
    }

    const handleBeamOn = () => {
        if (beamOn) {
            offSound.play();
        } else {
            onSound.play();
        }
        setBeamOn(prevState => !prevState);
    }

    useEffect(() => {
        if (edit === "EditOff") {
            setEditMode(false);
        }
        if (edit === "EditOn") {
            setEditMode(true);
        }

    }, [edit]);


    return (
        <>
            <div
                className={editMode ? "basis-3/4 shrink grow overflow-hidden h-[calc(100vh-50px)]" : "basis-full overflow-hidden shrink grow h-[calc(100vh-50px)]"}>
                <div className="absolute z-10">
                    <Button className="m-1" variant="secondary" size="icon" onClick={handleSave}><FontAwesomeIcon
                        icon={faFloppyDisk}/></Button>
                    <Button className="m-1" variant="secondary" size="icon" onClick={handleEdit}><FontAwesomeIcon
                        icon={faPenToSquare}/></Button>
                    <Button className="m-1" variant="secondary" size="icon" onClick={handleNew}><FontAwesomeIcon
                        icon={faFile}/></Button>
                    <Button className="m-1 ml-10" variant="secondary" size="icon"
                            onClick={handleBeamOn}><FontAwesomeIcon className={beamOn ? "text-card" : ""}
                                                                    icon={faLightbulb}/></Button>
                </div>

                <Canvas flat camera={{position: [0, 0, 3], near: 0.025}}>
                    <Effects disableGamma>
                        {/* threshhold has to be 1, so nothing at all gets bloom by default */}
                        <unrealBloomPass threshold={10000} strength={0.005} radius={0.2}/>
                        <outputPass args={[THREE.ACESFilmicToneMapping]}/>
                    </Effects>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="emitter"/>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="switch"/>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="grip"/>
                    <LightsaberPart lightsaberConfig={lightsaberConfig} part="pommel"/>
                    <Beam lightsaberConfig={lightsaberConfig} beamOn={beamOn}/>
                    <color attach="background" args={["#020817"]}/>
                    {/*<fog attach="fog" args={["#111111", 10, 20]}/>*/}
                    <Environment preset={"studio"}/>
                    {/*<ambientLight />*/}
                    {/*<pointLight position={[0,10,10]} intensity={2}></pointLight>*/}
                    <OrbitControls/>
                    {/*<Stats/>*/}
                </Canvas>
            </div>

            <Configurator lightsaberObject={lightsaberObject} active={editMode}/>
        </>
    );
};

export default Lightsaber;