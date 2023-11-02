import React from 'react';
import { Link, Outlet } from "react-router-dom";
import AudioRecorderComponent from '../AudioRecorder';

const Home = () => {
	return (
		<>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">game</Link>
          </li>
          <li>
            <Link to="/vocabulary">Vocabulary</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
	);
};

export default Home;
