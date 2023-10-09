import reducer, {initialState} from "./reducer";
import {createContext, useReducer} from "react";

export const LightsaberContext = createContext();

export const LightsaberProvider =({children})=> {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setLightsaberConfig = (value) => {
        dispatch({type:"setLightsaberConfig", value:value});
    }

    const updateLightsaberConfig = (part, property, value) => {
        dispatch({type:"updateLightsaberConfig", part:part, property:property, value:value});
    }
    const setLightsaberConfigArray = (value) => {
        dispatch({type:"setLightsaberConfigArray", payload:value});
    }
    const resetLightsaberConfig = () => {
        dispatch({type:"resetLightsaberConfig"});
    }

    const value = {
        lightsaberConfig: state.lightsaberConfig,
        lightsaberConfigArray: state.lightsaberConfigArray,
        updateLightsaberConfig,
        setLightsaberConfigArray,
        setLightsaberConfig,
        resetLightsaberConfig
    }

    return <LightsaberContext.Provider value={value}>
        {children}
    </LightsaberContext.Provider>

}