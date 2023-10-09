import {useReducer} from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case "setLightsaberConfig":
            return {
                ...state,lightsaberConfig: action.value
            };
        case "updateLightsaberConfig":
            return {
                ...state,lightsaberConfig: {...state.lightsaberConfig,[action.part]: {...state.lightsaberConfig[action.part], [action.property]: action.value}}
            };
        case "resetLightsaberConfig":
            return {
                ...state, lightsaberConfig: initialState.lightsaberConfig
            };
        case "setLightsaberConfigArray":
            return {...state, lightsaberConfigArray: action.payload};
        default:
            throw Error('Unknown action: ' + action.type);
    }
}

export const initialState = {
    lightsaberConfig: {
        emitter: {
            color: '#cccccc',
            metalness: 0.5,
            roughness: 0.5,
            width: 1,
            length: 1,
            position: 0,
            name: 'Emitter_1'
        },
        switch: {
            color: '#cccccc',
            metalness: 0.5,
            roughness: 0.5,
            width: 1,
            length: 1,
            position: 0,
            name: 'Switch_1'
        },
        grip: {
            color: '#cccccc',
            metalness: 0.5,
            roughness: 0.5,
            width: 1,
            length: 1,
            position: 0,
            name: 'Grip_1'
        },
        pommel: {
            color: '#cccccc',
            metalness: 0.5,
            roughness: 0.5,
            width: 1,
            length: 1,
            position: 0,
            name: 'Pommel_1'
        },
        id: "",
        name: ""

    },
    lightsaberConfigArray: [],


}

export default reducer;