import React, { useState } from 'react';
import { Slide, Zoom } from 'react-slideshow-image';
import SimpleImageSlider from "react-simple-image-slider";
import 'react-slideshow-image/dist/styles.css';
import AudioRecorder from './AudioRecorder';
import PythonAPI from './PythonAPI';

import '../styles/home.css'

const images = [
	'MedcineWheel2.jpg',
	'Rockalign.jpg',
	'logo512.png',
  ];

const Home = () => {
	const [audioBlob, setAudioBlob] = useState();

    const onRecordingComplete = (blob) => {
        setAudioBlob(blob);
    };

	return (
		<div>
			{/* <h1 className='home-title'>Cree Revitalization</h1> */}
		{/* <SimpleImageSlider
            width={"100%"}
            height={"100%"}
            images={images}
            showNavs={true}
			autoPlay={true}
			slideDuration={0.7}
			autoPlayDelay={2.5}
			
         /> */}

			<AudioRecorder onRecordingComplete={onRecordingComplete} />
		</div>
	);
};

export default Home;
