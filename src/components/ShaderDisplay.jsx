import React,from 'react';
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";




// console.log(camRef)
const ShaderDisplay = ({url}) => {
    return (
        <div className="shaderDisplay">
            <Canvas camera={{position: [0, 0, 25]}}>
                <mesh>
                    <sphereGeometry args={[15,32,16]}/>
                    <color attach="background" args={["#555555"]}/>
                    <Environment preset={"studio"}/>
                    <NodeToyMaterial url={url} />
                    {/*<NodeToyTick/>*/}
                    <OrbitControls />
                </mesh>
            </Canvas>
        </div>
    );
};

export default ShaderDisplay;