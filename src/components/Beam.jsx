import React, {useRef} from 'react';
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {MathUtils} from "three";


const Beam = ({beamOn, lightsaberConfig}) => {
    const {nodes} = useGLTF('./models/Lightsaber.glb');

    const ref = useRef()

    useFrame(() => {
        ref.current.scale.x = beamOn
            ? MathUtils.lerp(ref.current.scale.x, 1, 0.025)
            : MathUtils.lerp(ref.current.scale.x, 0, 0.025)
    })

    return (

        <mesh ref={ref} geometry={nodes["Blade"].geometry} scale={[0, 1, 1]}>
            <meshStandardMaterial
                color={lightsaberConfig.beam.color}
                emissive={lightsaberConfig.beam.color} emissiveIntensity={35000}
                toneMapped={false}
            />
        </mesh>

    );
};
useGLTF.preload('./models/Lightsaber.glb');

export default Beam;