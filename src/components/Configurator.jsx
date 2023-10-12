import React, {useContext,} from 'react';
import PartDisplay from "./PartDisplay";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


import { Separator } from "@/components/ui/separator"

import Adjustments from "./Adjustments";
import {LightsaberContext} from "../LightsaberContext.jsx";
import LightsaberColor from "@/components/LightsaberColor.jsx";


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
        <div className={active?"basis-1/4 overflow-auto h-[calc(100vh-50px)] border-l p-2" :"basis-0 overflow-auto h-[calc(100vh-50px)]"}>
            {/*<h2>Emitter</h2>*/}
            <Accordion type="single" collapsible className="">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Emitter</AccordionTrigger>
                    <AccordionContent className="">
                        <div className="flex flex-wrap justify-evenly py-2">
                        {
                            getMeshByUserDataValue(lightsaberObject.scene, "type", "emitter").map((item, index) => <PartDisplay
                                lightsaberConfig={lightsaberConfig}
                                key={index}
                                object={item} part="emitter"/>)

                        }
                        </div>
                        <Separator/>
                        <Adjustments part="emitter"/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Switch</AccordionTrigger>
                    <AccordionContent className="">
                        <div className="flex flex-wrap justify-evenly py-2">
                            {
                                getMeshByUserDataValue(lightsaberObject.scene, "type", "switch").map((item, index) => <PartDisplay
                                    lightsaberConfig={lightsaberConfig}
                                    key={index}
                                    object={item} part="switch"/>)

                            }
                        </div>
                        <Separator/>
                        <Adjustments part="switch"/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Grip</AccordionTrigger>
                    <AccordionContent className="">
                        <div className="flex flex-wrap justify-evenly py-2">
                            {
                                getMeshByUserDataValue(lightsaberObject.scene, "type", "grip").map((item, index) => <PartDisplay
                                    lightsaberConfig={lightsaberConfig}
                                    key={index}
                                    object={item} part="grip"/>)

                            }
                        </div>
                        <Separator/>
                        <Adjustments part="grip"/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Pommel</AccordionTrigger>
                    <AccordionContent className="">
                        <div className="flex flex-wrap justify-evenly py-2">
                            {
                                getMeshByUserDataValue(lightsaberObject.scene, "type", "pommel").map((item, index) => <PartDisplay
                                    lightsaberConfig={lightsaberConfig}
                                    key={index}
                                    object={item} part="pommel"/>)

                            }
                        </div>
                        <Separator/>
                        <Adjustments part="pommel"/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Beam color</AccordionTrigger>
                    <AccordionContent className="">
                        <Separator/>
                        <LightsaberColor/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            {/*<h2>Switch</h2>*/}
            {/*<div className="configurator__container">*/}
            {/*    {*/}
            {/*        getMeshByUserDataValue(lightsaberObject.scene, "type", "switch").map((item, index) => <PartDisplay*/}
            {/*            lightsaberConfig={lightsaberConfig}*/}
            {/*            key={index}*/}
            {/*            object={item} part="switch"/>)*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<Adjustments part="switch"/>*/}
            {/*<h2>Grip</h2>*/}
            {/*<div className="configurator__container">*/}
            {/*    {*/}
            {/*        getMeshByUserDataValue(lightsaberObject.scene, "type", "grip").map((item, index) => <PartDisplay*/}
            {/*            lightsaberConfig={lightsaberConfig}*/}
            {/*            key={index}*/}
            {/*            object={item} part="grip"/>)*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<Adjustments part="grip"/>*/}
            {/*<h2>Pommel</h2>*/}
            {/*<div className="configurator__container">*/}
            {/*    {*/}
            {/*        getMeshByUserDataValue(lightsaberObject.scene, "type", "pommel").map((item, index) => <PartDisplay*/}
            {/*            lightsaberConfig={lightsaberConfig}*/}
            {/*            key={index}*/}
            {/*            object={item} part="pommel"/>)*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<Adjustments part="pommel"/>*/}
        </div>
    );
};

export default Configurator;