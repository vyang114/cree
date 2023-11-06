import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { playAudio, shuffleArray, vocab } from '../pages/Utils';
import LearnCategory from '../pages/LearnCategory'

import '../styles/lesson.css'

const ShowItem = ( { item, onNextClick } ) => {

  const dispatch = useDispatch();
  const exit = useSelector((state) => state.exit);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_DISPLAY_SHOWITEM', payload: false });
    dispatch({ type: 'BOOLEAN_FALSE', payload: true });
  };

  const handleGoBack = () => {
    dispatch({ type: 'UPDATE_EXIT', payload: true });
    dispatch({ type: 'UPDATE_SHOW_MATCH_SOUND_TO_WORD', payload: true });
    dispatch({ type: 'UPDATE_CATEGORY', payload: "" });
    dispatch({ type: 'UPDATE_RANDOM_INDEX', payload: 0 });
    dispatch({ type: 'UPDATE_FILTERED_VOCAB', payload: [] });
    dispatch({ type: 'UPDATE_SHUFFLED_FILTERED_VOCAB', payload: [] });
    dispatch({ type: 'UPDATE_INDEX_NOT_PICKED', payload: [] });
}

  playAudio(item);
  
	return (
      
        <div>
          {
            exit ? <LearnCategory /> 
            :
            <div>
              <button type="button" className='btn shadow-none' onClick={handleGoBack}><FontAwesomeIcon icon={faXmark} size='xl'/></button>
              <div className='showItem-container'>
                <div className='showItem-item'>
                    <img src={`/assets/flashcards/${item.english}.jpg`}></img>
                    <div className="showItem-text">
                        <div className='showItem-text-cree'>{item.cree}</div>
                        <div className='showItem-text-eng'>{item.english}</div>
                    </div>
                </div>        
              </div>
            <div className='next-container'>
              <button className='btn primary' onClick={onNextClick}>OK</button>
            </div>
          </div>
          }
        </div>
	);
};

export default ShowItem;
