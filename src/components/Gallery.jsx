import React, {useContext, useEffect} from 'react';
import {LightsaberContext} from "../LightsaberContext.jsx";
import GalleryDisplay from "./GalleryDisplay";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../config/firebase";

const Gallery = () => {

    const {setLightsaberConfigArray}= useContext(LightsaberContext);

    useEffect(() =>
            onSnapshot(collection(db, "lightsaberConfigurator"), (snapshot)=> {
                    setLightsaberConfigArray(snapshot.docs.map(doc => ({...doc.data(), id:doc.id})));
                }
            )
        , []);

    const {lightsaberConfigArray}= useContext(LightsaberContext);

    console.log(lightsaberConfigArray);

    return (
        <div className="gallery">

            {
                lightsaberConfigArray?.map((lightsaber)=><GalleryDisplay lightsaberConfig={lightsaber} key={lightsaber.id}/>)
            }

        </div>
    );
};

export default Gallery;