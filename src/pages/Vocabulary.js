import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/fontawesome-free-solid'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Category from './Category';
import { vocab } from './Utils';
import soundfile from '../assets/sounds/apple.wav'

import '../styles/vocabulary.css'

// const audio_filenames = [
//     "after midnight.wav",
//     "apple.wav",
//     "apples.wav",
//     "at midnight.wav",
//     "at noon.wav",
//     "bread.wav",
//     "butter.wav",
//     "carrot.wav",
//     "carrots.wav",
//     "cheese.wav",
//     "day after tomorrow.wav",
//     "dime.wav",
//     "egg.wav",
//     "eight dollars.wav",
//     "fifty dollars.wav",
//     "five dollars.wav",
//     "four dollars.wav",
//     "ice cream.wav",
//     "in the morning.wav",
//     "jello.wav",
//     "juice.wav",
//     "last evening.wav",
//     "last night.wav",
//     "later tonight.wav",
//     "midnight.wav",
//     "milk.wav",
//     "morning.wav",
//     "nickel.wav",
//     "night.wav",
//     "nine dollars.wav",
//     "noon.wav",
//     "one dollar.wav",
//     "one hundred dollars.wav",
//     "onion.wav",
//     "onions.wav",
//     "orange.wav",
//     "oranges.wav",
//     "past midnight.wav",
//     "peach.wav",
//     "peaches.wav",
//     "pear.wav",
//     "pears.wav",
//     "pepper.wav",
//     "potato.wav",
//     "potatoes.wav",
//     "quarter.wav",
//     "rice.wav",
//     "salt.wav",
//     "seven dollars.wav",
//     "six dollars.wav",
//     "soup.wav",
//     "sugar.wav",
//     "tea.wav",
//     "ten dollars.wav",
//     "three dollars.wav",
//     "tomorrow.wav",
//     "tomorrow morning.wav",
//     "tonight.wav",
//     "twenty dollars.wav",
//     "two dollars.wav",
//     "water.wav",
//     "watermelon.wav",
//     "watermelons.wav",
//     "wine.wav"
// ]

const Vocabulary = ({ category }) => {

    const [goBack, setGoBack] = useState(false);

    const playAudio = (item) => {
        let audio = new Audio(`/assets/sounds/${item}.wav`)
        // let audio = new Audio('https://drive.google.com/file/d/1vDgM6Ps45Ppr5-1eS5pFYMYrCRtZJHf_/view?usp=drive_link');
        // audio.crossOrigin = "anonymous";
        audio.play()
        console.log(`/assets/sounds/${item}.wav`, audio);
    }

    const filteredVocab = vocab.filter(obj => obj.category.includes(category)).map(obj => ({"cree":obj.cree, "english":obj.english}));

    let element = filteredVocab.map(function(object) { // for each element in the Roles array, display it https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
        return (
            <div className='vocab-item'>
                <img className = 'vocab-item-image' src={`/assets/flashcards/${object.english}.jpg`} onClick={(e) => playAudio(`${object.english}`)}></img>

                <div className='text-audio'>
                    <div className="vocab-item-text">
                        <div className='vocab-item-text-cree'>{object.cree}</div>
                        <div className='vocab-item-text-eng'>{object.english}</div>
                        
                    </div>
                    <div className='vocab-item-audio'>
                        <FontAwesomeIcon className="faPlayCircle" icon={faPlayCircle} size='xl' onClick={(e) => playAudio(`${object.english}`)}/>
                    </div>
                </div>
                {/* <button onClick={(e) => playAudio(`${object.english}`)}>{ object.english }</button> */}
            </div>
        );
      })

    const handleGoBack = () =>{
        setGoBack(true);
    }
    
    return (
        < div >
            {/* <h1>Vocabulary</h1> */}
            {
                goBack 
                ? <Category /> 
                : 
                <div>
                    <button type="button" className='btn shadow-none' onClick={handleGoBack}><FontAwesomeIcon icon={faXmark} size='xl'/></button>
                    <div className="vocab-container">
                        {element}
                    </div>
                </div>
            }

            
        </div >
    );
};

export default Vocabulary;