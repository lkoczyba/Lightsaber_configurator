import React, {useContext,} from 'react';
import PartDisplay from "./PartDisplay";





import Adjustments from "./Adjustments";
import {LightsaberContext} from "../LightsaberContext.jsx";


const Configurator = ({lightsaberObject, active}) => {

    const {lightsaberConfig} = useContext(LightsaberContext);


    const getMeshByUserDataValue = (scene, name, value) => {
        const meshes = [];

        scene.traverse((node) => {
            if (node.userData[name] === value) {
                meshes.push(node);
            }
        });

        return meshes;
    };


    return (
        <div className={`configurator ${active ? "": "configurator--collapsed"}`}>
            <h2>Emitter</h2>
            <div className="configurator__container">
                {
                    getMeshByUserDataValue(lightsaberObject.scene, "type", "emitter").map((item, index) => <PartDisplay
                        lightsaberConfig={lightsaberConfig}
                        key={index}
                        object={item} part="emitter"/>)
                }
            </div>
            <Adjustments part="emitter"/>
            <h2>Switch</h2>
            <div className="configurator__container">
                {
                    getMeshByUserDataValue(lightsaberObject.scene, "type", "switch").map((item, index) => <PartDisplay
                        lightsaberConfig={lightsaberConfig}
                        key={index}
                        object={item} part="switch"/>)
                }
            </div>
            <Adjustments part="switch"/>
            <h2>Grip</h2>
            <div className="configurator__container">
                {
                    getMeshByUserDataValue(lightsaberObject.scene, "type", "grip").map((item, index) => <PartDisplay
                        lightsaberConfig={lightsaberConfig}
                        key={index}
                        object={item} part="grip"/>)
                }
            </div>
            <Adjustments part="grip"/>
            <h2>Pommel</h2>
            <div className="configurator__container">
                {
                    getMeshByUserDataValue(lightsaberObject.scene, "type", "pommel").map((item, index) => <PartDisplay
                        lightsaberConfig={lightsaberConfig}
                        key={index}
                        object={item} part="pommel"/>)
                }
            </div>
            <Adjustments part="pommel"/>
        </div>
    );
};

export default Configurator;