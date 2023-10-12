import React, {useContext} from 'react';
import {LightsaberContext} from "@/LightsaberContext.jsx";

const LightsaberColor = () => {

    const {lightsaberConfig, updateLightsaberConfig}= useContext(LightsaberContext)

    const handleColor = (e, index)=>{
    updateLightsaberConfig("beam", "color", colorArray[index]);
    }

    const colorArray = ["#ff0000", "#00ff00", "#ff00ff", "#4d91ff", "#ffff00", "#00ffcc", "#ffae00", "#FFFFFF",]
    // const colorArray = ["bg-[#ff0000]", "bg-[#00ff00]", "bg-[#ff00ff]", "bg-[#4d91ff]", "bg-[#ffff00]", "bg-[#00ffcc]", "bg-[#ffae00]", "bg-[#FFFFFF]",]

    return (
        <div className="flex flex-wrap">
            {
                colorArray.map((color, index)=><div onClick={e=>handleColor(e, index)} className={"cursor-pointer border-2 border-secondary rounded-full m-2 w-[30px] h-[30px] hover:scale-110 " +`bg-[${color}]`}  key={index}></div>)
            }
        </div>
    );
};

export default LightsaberColor;