import React, {useContext, useEffect, useRef} from 'react';
import {Canvas, dispose} from "@react-three/fiber";
import {Center, Clone, Environment} from "@react-three/drei";
import {LightsaberContext} from "../LightsaberContext.jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import * as renderer from "@react-three/fiber";
import {LightsaberPart} from "@/components/LightsaberPart.jsx";
import * as THREE from 'three';
import { useThree } from "@react-three/fiber";

const PartDisplay = ({object, part}) => {


    const {lightsaberConfig, updateLightsaberConfig} = useContext(LightsaberContext);

    const handleClick = () => {

        updateLightsaberConfig(part, "name", object.name);
    }



    return (
        <Card onClick={handleClick} className={ lightsaberConfig[part].name === object.name ? "m-1 overflow-hidden  border-primary border-2 w-[100px] h-[50px]" : "m-1 overflow-hidden border-2  w-[100px] h-[50px]"}>
        {/*<div onClick={handleClick} className={`partDisplay ${lightsaberConfig[part].name === object.name ? "partDisplay__Active" : ""}`}>*/}
            <Canvas camera={{position: [0, 0, 0.75], near: 0.025}}>
                <Center>
                    <Clone object={object}  material-color={lightsaberConfig[part].color} material-roughness={lightsaberConfig[part].roughness} material-metalness={lightsaberConfig[part].metalness}/>
                </Center>
                <color attach="background" args={["#1e293b"]}/>
                <Environment preset={"studio"}/>
                {/*<OrbitControls/>*/}
            </Canvas>
        </Card>
    );
};

export default PartDisplay;