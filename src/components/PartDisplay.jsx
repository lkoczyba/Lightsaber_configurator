import React, {useContext} from 'react';
import {Canvas} from "@react-three/fiber";
import {Center, Clone, Environment} from "@react-three/drei";
import {LightsaberContext} from "../LightsaberContext.jsx";


const PartDisplay = ({object, part}) => {

    const {lightsaberConfig, updateLightsaberConfig} = useContext(LightsaberContext);

    const handleClick = () => {

        updateLightsaberConfig(part, "name", object.name);
    }

    return (
        <div onClick={handleClick} className={`partDisplay ${lightsaberConfig[part].name === object.name ? "partDisplay__Active" : ""}`}>
            <Canvas camera={{position: [0, 0, 0.75], near: 0.025}}>
                <Center>
                    <Clone object={object} dispose={null} material-color={lightsaberConfig[part].color} material-roughness={lightsaberConfig[part].roughness} material-metalness={lightsaberConfig[part].metalness}/>
                </Center>
                <color attach="background" args={["#555555"]}/>
                <Environment preset={"studio"}/>
                {/*<OrbitControls/>*/}
            </Canvas>
        </div>
    );
};

export default PartDisplay;