import React, { useState } from 'react';
import { shuffleArray, vocab } from '../pages/Utils';

import '../styles/lesson.css'

const ShowItem = ( {item} ) => {

    const [category, setCategory] = useState('Food')
    const [mediaItem, setMediaItem] = useState(item[0]);
    const [index, setIndex] = useState(0);

    React.useEffect(() => {
        const timerId = setInterval(
          () => setIndex((i) => (i + 1) % item.length), // <-- increment index
          2000
        );
        return () => clearInterval(timerId);
      }, []);
    
      React.useEffect(() => {
        setMediaItem(item[index]); // <-- update media state when index updates
      }, [index]);
    

	return (
		<div>
			<div className='showItem-container'>
                <div className='showItem-item'>
                    <img src={`/assets/flashcards/${item.english}.jpg`}></img>
                    <div className="showItem-text">
                        <div className='showItem-text-cree'>{item.cree}</div>
                        <div className='showItem-text-eng'>{item.english}</div>
                    </div>
                </div>        
            </div>
		</div>
	);
};

export default ShowItem;
