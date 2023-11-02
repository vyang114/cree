import React from 'react';
import { Link, Outlet } from "react-router-dom";
import AudioRecorderComponent from '../AudioRecorder';

import '../styles/home.css'

const Home = () => {
	return (
		<div>
			<h1 className='home-title'>Cree Revitalization</h1>
{/* 
			<div className='container'>
				<div className='textbox-container'>
				<Link to="/game">
					<button variant="outlined">
						ChatBot
					</button>
				</Link>
				
				<Link to="/vocabulary">
					<button variant="outlined">
						Vocabulary
					</button>
				</Link>
				</div>
			</div> */}
		</div>
	);
};

export default Home;
