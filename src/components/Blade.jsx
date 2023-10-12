import React, {useEffect, useRef, useState} from 'react';
import {Box, useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {MathUtils} from "three";





const Blade = ({beamOn}) => {
    const {nodes} = useGLTF('./models/Lightsaber.glb');

    const ref=useRef()

    useFrame((_,delta)=>{
        // ref.current.scale.x+=0.2*delta;
        ref.current.scale.x = beamOn
            ? MathUtils.lerp(ref.current.scale.x, 1, 0.025)
            : MathUtils.lerp(ref.current.scale.x, 0, 0.025)
    })



    return (

                <mesh ref={ref} geometry={nodes["Blade"].geometry} scale={[0,1,1]}>


                    <meshStandardMaterial
                        color="#ff0000"
                        emissive="#ff0000" emissiveIntensity={35000}
                        toneMapped={false}
                    />
                </mesh>
//         <mesh >
//
// <Box>
//     <meshStandardMaterial
//         color="red"
//         emissive="red" emissiveIntensity={6}
//         toneMapped={false}
//     />
// </Box>
//
//         </mesh>
    );
};
useGLTF.preload('./models/Lightsaber.glb');

export default Blade;