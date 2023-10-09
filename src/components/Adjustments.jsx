import React, {useContext} from 'react';
import {LightsaberContext} from "../LightsaberContext.jsx";

const Adjustments = ({part}) => {

    const {lightsaberConfig, updateLightsaberConfig}= useContext(LightsaberContext)

const handleOnChange = (e, property)=> {
    updateLightsaberConfig(part, property, e.target.value)
}

    return (
        <div className="adjustments">
            <div className="adjustments__input-container">
                <p className="adjustments__input-label">Color:</p>
                <input type="color" value={lightsaberConfig[part].color} onChange={e=>handleOnChange(e, "color")}/>
            </div>
            <div className="adjustments__input-container">
                <p className="adjustments__input-label">Metalness:</p>
                <input type="range" min={0} max={1} step={0.01} value={lightsaberConfig[part].metalness} onChange={e=>handleOnChange(e, "metalness")}/>
            </div>
            <div className="adjustments__input-container">
                <p className="adjustments__input-label">Roughness:</p>
                <input type="range" min={0} max={1} step={0.01} value={lightsaberConfig[part].roughness} onChange={e=>handleOnChange(e, "roughness")}/>
            </div>
            <div className="adjustments__input-container">
                <p className="adjustments__input-label">Width:</p>
                <input type="range" min={0.5} max={2} step={0.01} value={lightsaberConfig[part].width} onChange={e=>handleOnChange(e, "width")}/>
            </div>
            <div className="adjustments__input-container">
                <p className="adjustments__input-label">Length:</p>
                <input type="range" min={0.5} max={2} step={0.01} value={lightsaberConfig[part].length} onChange={e=>handleOnChange(e, "length")}/>
            </div>
        </div>
    );
};

export default Adjustments;