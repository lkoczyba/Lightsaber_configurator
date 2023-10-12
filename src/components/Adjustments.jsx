import React, {useContext} from 'react';
import {LightsaberContext} from "../LightsaberContext.jsx";


const Adjustments = ({part}) => {

    const {lightsaberConfig, updateLightsaberConfig}= useContext(LightsaberContext)

const handleOnChange = (e, property)=> {
    updateLightsaberConfig(part, property, e.target.value)
}

    return (
        <div className="my-2">
            <div className="flex items-center">
                <p className="basis-1/3">Color:</p>
                <input className="appearance-none border-none outline-none bg-transparent rounded-sm w-[30px] h-[30px]" type="color" value={lightsaberConfig[part].color} onChange={e=>handleOnChange(e, "color")}/>
            </div>
            <div className="flex">
                <p className="basis-1/3">Metalness:</p>
                <input type="range" min={0} max={1} step={0.01} value={lightsaberConfig[part].metalness} onChange={e=>handleOnChange(e, "metalness")}/>
            </div>
            <div className="flex">
                <p className="basis-1/3">Roughness:</p>
                <input type="range" min={0} max={1} step={0.01} value={lightsaberConfig[part].roughness} onChange={e=>handleOnChange(e, "roughness")}/>
            </div>
            <div className="flex">
                <p className="basis-1/3">Width:</p>
                <input type="range" min={0.5} max={2} step={0.01} value={lightsaberConfig[part].width} onChange={e=>handleOnChange(e, "width")}/>
            </div>
            <div className="flex">
                <p className="basis-1/3">Length:</p>
                <input type="range" min={0.5} max={2} step={0.01} value={lightsaberConfig[part].length} onChange={e=>handleOnChange(e, "length")}/>
            </div>
        </div>
    );
};

export default Adjustments;