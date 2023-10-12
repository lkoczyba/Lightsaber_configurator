
import {useGLTF} from '@react-three/drei'
import React from "react";


export function LightsaberPart({part, lightsaberConfig}) {
    const {nodes, materials} = useGLTF('./models/Lightsaber.glb');

    return (
        <group dispose={null}>
            <mesh geometry={nodes[lightsaberConfig[part].name].geometry}
                  position={[lightsaberConfig[part].position, 0, 0]}
                  scale={[lightsaberConfig[part].length, lightsaberConfig[part].width, lightsaberConfig[part].width]}>
                <meshStandardMaterial
                    // color={lightsaberConfig[part].color}
                    color={lightsaberConfig[part].color}
                    roughness={lightsaberConfig[part].roughness}
                    metalness={lightsaberConfig[part].metalness}

                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/Lightsaber.glb')