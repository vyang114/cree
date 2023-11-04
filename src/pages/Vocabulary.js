import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/fontawesome-free-solid'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Category from './Category';
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

const vocab = [
    {
        audio: "apple.wav",
        english: "apple",
        cree: "kaspimin",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "apples.wav",
        english: "apples",
        cree: "kaspimina",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "orange.wav",  
        english: "orange",
        cree: "osawimin",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "oranges.wav",  
        english: "oranges",
        cree: "osawimina",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "watermelon.wav",  
        english: "watermelon",
        cree: "nipiwimin",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "watermelons.wav",  
        english: "watermelons",
        cree: "nipiwimina",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "pear.wav",  
        english: "pear",
        cree: "cipomin",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "pears.wav",  
        english: "pears",
        cree: "cipomina",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "peach.wav",  
        english: "peach",
        cree: "mithawimin",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "peaches.wav",  
        english: "peaches",
        cree: "mithawimina",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "carrot.wav",  
        english: "carrot",
        cree: "oskatask",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "carrots.wav",  
        english: "carrots",
        cree: "oskataskwa",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "onion.wav",  
        english: "onion",
        cree: "wihcikaskosiy",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "onions.wav",  
        english: "onions",
        cree: "wihcikaskosiya",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "potato.wav",  
        english: "potato",
        cree: "askipwa",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "potatoes.wav",  
        english: "potatoes",
        cree: "askipwawa",
        category: "Fruits & Vegetables",
        
    },
    {
        audio: "bread.wav",  
        english: "bread",
        cree: "pahkwísikan",
        category: "Food",
        
    },
    {
        audio: "butter.wav",  
        english: "butter",
        cree: "osawipimiy",
        category: "Food",
        
    },
    {
        audio: "cheese.wav",  
        english: "cheese",
        cree: "tohtosapohkan",
        category: "Food",
        
    },
    {
        audio: "egg.wav",  
        english: "egg",
        cree: "wawi",
        category: "Food",
        
    },
    {
        audio: "ice cream.wav",  
        english: "ice cream",
        cree: "ka tahkak",
        category: "Food",
        
    },
    {
        audio: "jello.wav",  
        english: "jello",
        cree: "astohcikan",
        category: "Food",
        
    },
    {
        audio: "juice.wav",  
        english: "juice",
        cree: "minisapoya",
        category: "Food",
        
    },
    {
        audio: "milk.wav",  
        english: "milk",
        cree: "tohtosapwiy",
        category: "Food",
        
    },
    {
        audio: "pepper.wav",  
        english: "pepper",
        cree: "pípaw",
        category: "Food",
        
    },
    {
        audio: "rice.wav",  
        english: "rice",
        cree: "wapihikominak",
        category: "Food",
        
    },
    {
        audio: "salt.wav",  
        english: "salt",
        cree: "siwitakan",
        category: "Food",
        
    },
    {
        audio: "soup.wav",  
        english: "soup",
        cree: "micimapoy",
        category: "Food",
        
    },
    {
        audio: "sugar.wav",  
        english: "sugar",
        cree: "siwinikan",
        category: "Food",
        
    },
    {
        audio: "tea.wav",  
        english: "tea",
        cree: "maskihkiwapwiy",
        category: "Food",
        
    },
    {
        audio: "wine.wav",  
        english: "wine",
        cree: "sominapoy",
        category: "Food",
        
    },
    {
        audio: "morning.wav",  
        english: "morning",
        cree: "kikisipayaw",
        category: "Time",
        
    },
    {
        audio: "in the morning.wav",  
        english: "in the morning",
        cree: "kíkisipayaki",
        category: "Time",
        
    },
    {
        audio: "night.wav",  
        english: "night",
        cree: "tipiskaw",
        category: "Time",
        
    },
    {
        audio: "tonight.wav",  
        english: "tonight",
        cree: "tipisikaki",
        category: "Time",
        
    },
    {
        audio: "last evening.wav",  
        english: "last evening",
        cree: "otakosihk",
        category: "Time",
        
    },
    {
        audio: "last night.wav",  
        english: "last night",
        cree: "tipiskohk",
        category: "Time",
        
    },
    {
        audio: "later tonight.wav",  
        english: "later tonight",
        cree: "otakosiki",
        category: "Time",
        
    },
    {
        audio: "tomorrow.wav",  
        english: "tomorrow",
        cree: "wapahki",
        category: "Time",
        
    },
    {
        audio: "tomorrow morning.wav",  
        english: "tomorrow morning",
        cree: "wapahki kikisípayaki",
        category: "Time",
        
    },
    {
        audio: "day after tomorrow.wav",  
        english: "day after tomorrow",
        cree: "awasiwahpahki",
        category: "Time",
        
    },
    {
        audio: "noon.wav",  
        english: "noon",
        cree: "apihtáwi kisikaw",
        category: "Time",
        
    },
    {
        audio: "at noon.wav",  
        english: "at noon",
        cree: "apihtaaw wikisikaawki",
        category: "Time",
        
    },
    {
        audio: "midnight.wav",  
        english: "midnight",
        cree: "apihtatipiskaw",
        category: "Time",
        
    },
    {
        audio: "at midnight.wav",  
        english: "at midnight",
        cree: "apihtatipiskaki",
        category: "Time",
        
    },
    {
        audio: "past midnight.wav",  
        english: "past midnight",
        cree: "poni Apihtatipiskaaw",
        category: "Time",
        
    },
    {
        audio: "after midnight.wav",  
        english: "after midnight",
        cree: "poni Apihtatipiskaaki",
        category: "Time",
        
    },
]

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
                    <button type="button" className='btn shadow-none' onClick={handleGoBack}><i class="fa fa-chevron-left"></i></button>
                    <div className="vocab-container">
                        {element}
                    </div>
                </div>
            }

            
        </div >
    );
};

export default Vocabulary;