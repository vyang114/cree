import React from 'react';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/fontawesome-free-solid'

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
        category: "fruit",
        type: "singular"
    },
    {
        audio: "apples.wav",
        english: "apples",
        cree: "kaspimina",
        category: "fruit",
        type: "plural"
    },
    {
        audio: "orange.wav",  
        english: "orange",
        cree: "osawimin",
        category: "fruit",
        type: "singular"
    },
    {
        audio: "oranges.wav",  
        english: "oranges",
        cree: "osawimina",
        category: "fruit",
        type: "plural"
    },
    {
        audio: "watermelon.wav",  
        english: "watermelon",
        cree: "nipiwimin",
        category: "fruit",
        type: "singular"
    },
    {
        audio: "watermelons.wav",  
        english: "watermelons",
        cree: "nipiwimina",
        category: "fruit",
        type: "plural"
    },
    {
        audio: "pear.wav",  
        english: "pear",
        cree: "cipomin",
        category: "fruit",
        type: "singular"
    },
    {
        audio: "pears.wav",  
        english: "pears",
        cree: "cipomina",
        category: "fruit",
        type: "plural"
    },
    {
        audio: "peach.wav",  
        english: "peach",
        cree: "mithawimin",
        category: "fruit",
        type: "singular"
    },
    {
        audio: "peaches.wav",  
        english: "peaches",
        cree: "mithawimina",
        category: "fruit",
        type: "plural"
    },
    {
        audio: "carrot.wav",  
        english: "carrot",
        cree: "oskatask",
        category: "vegetable",
        type: "singular"
    },
    {
        audio: "carrots.wav",  
        english: "carrots",
        cree: "oskataskwa",
        category: "vegetable",
        type: "plural"
    },
    {
        audio: "onion.wav",  
        english: "onion",
        cree: "wihcikaskosiy",
        category: "vegetable",
        type: "singular"
    },
    {
        audio: "onions.wav",  
        english: "onions",
        cree: "wihcikaskosiya",
        category: "vegetable",
        type: "plural"
    },
    {
        audio: "potato.wav",  
        english: "potato",
        cree: "askipwa",
        category: "vegetable",
        type: "singular"
    },
    {
        audio: "potatoes.wav",  
        english: "potatoes",
        cree: "askipwawa",
        category: "vegetable",
        type: "plural"
    },
    {
        audio: "bread.wav",  
        english: "bread",
        cree: "pahkwísikan",
        category: "food",
        type: "singular"
    },
    {
        audio: "butter.wav",  
        english: "butter",
        cree: "osawipimiy",
        category: "food",
        type: "singular"
    },
    {
        audio: "cheese.wav",  
        english: "cheese",
        cree: "tohtosapohkan",
        category: "food",
        type: "singular"
    },
    {
        audio: "egg.wav",  
        english: "egg",
        cree: "wawi",
        category: "food",
        type: "singular"
    },
    {
        audio: "ice cream.wav",  
        english: "ice cream",
        cree: "ka tahkak",
        category: "food",
        type: "singular"
    },
    {
        audio: "jello.wav",  
        english: "jello",
        cree: "astohcikan",
        category: "food",
        type: "singular"
    },
    {
        audio: "juice.wav",  
        english: "juice",
        cree: "minisapoya",
        category: "food",
        type: "singular"
    },
    {
        audio: "milk.wav",  
        english: "milk",
        cree: "tohtosapwiy",
        category: "food",
        type: "singular"
    },
    {
        audio: "pepper.wav",  
        english: "pepper",
        cree: "pípaw",
        category: "food",
        type: "singular"
    },
    {
        audio: "rice.wav",  
        english: "rice",
        cree: "wapihikominak",
        category: "food",
        type: "singular"
    },
    {
        audio: "salt.wav",  
        english: "salt",
        cree: "siwitakan",
        category: "food",
        type: "singular"
    },
    {
        audio: "soup.wav",  
        english: "soup",
        cree: "micimapoy",
        category: "food",
        type: "singular"
    },
    {
        audio: "sugar.wav",  
        english: "sugar",
        cree: "siwinikan",
        category: "food",
        type: "singular"
    },
    {
        audio: "tea.wav",  
        english: "tea",
        cree: "maskihkiwapwiy",
        category: "food",
        type: "singular"
    },
    {
        audio: "wine.wav",  
        english: "wine",
        cree: "sominapoy",
        category: "food",
        type: "singular"
    },
    {
        audio: "morning.wav",  
        english: "morning",
        cree: "kikisipayaw",
        category: "time",
        type: ""
    },
    {
        audio: "in the morning.wav",  
        english: "in the morning",
        cree: "kíkisipayaki",
        category: "time",
        type: ""
    },
    {
        audio: "night.wav",  
        english: "night",
        cree: "tipiskaw",
        category: "time",
        type: ""
    },
    {
        audio: "tonight.wav",  
        english: "tonight",
        cree: "tipisikaki",
        category: "time",
        type: ""
    },
    {
        audio: "last evening.wav",  
        english: "last evening",
        cree: "otakosihk",
        category: "time",
        type: ""
    },
    {
        audio: "last night.wav",  
        english: "last night",
        cree: "tipiskohk",
        category: "time",
        type: ""
    },
    {
        audio: "later tonight.wav",  
        english: "later tonight",
        cree: "otakosiki",
        category: "time",
        type: ""
    },
    {
        audio: "tomorrow.wav",  
        english: "tomorrow",
        cree: "wapahki",
        category: "time",
        type: ""
    },
    {
        audio: "tomorrow morning.wav",  
        english: "tomorrow morning",
        cree: "wapahki kikisípayaki",
        category: "time",
        type: ""
    },
    {
        audio: "day after tomorrow.wav",  
        english: "day after tomorrow",
        cree: "awasiwahpahki",
        category: "time",
        type: ""
    },
    {
        audio: "noon.wav",  
        english: "noon",
        cree: "apihtáwi kisikaw",
        category: "time",
        type: ""
    },
    {
        audio: "at noon.wav",  
        english: "at noon",
        cree: "apihtaaw wikisikaawki",
        category: "time",
        type: ""
    },
    {
        audio: "midnight.wav",  
        english: "midnight",
        cree: "apihtatipiskaw",
        category: "time",
        type: ""
    },
    {
        audio: "at midnight.wav",  
        english: "at midnight",
        cree: "apihtatipiskaki",
        category: "time",
        type: ""
    },
    {
        audio: "past midnight.wav",  
        english: "past midnight",
        cree: "poni Apihtatipiskaaw",
        category: "time",
        type: ""
    },
    {
        audio: "after midnight.wav",  
        english: "after midnight",
        cree: "poni Apihtatipiskaaki",
        category: "time",
        type: ""
    },
]

const options = [
    '', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'
  ];

const Vocabulary = () => {

    const [category, setCategory] = useState('fruit');

    const playAudio = (item) => {
        let audio = new Audio("/assets/sounds/" + item + ".wav")
        audio.play()
        // console.log(item);
    }

    let element = vocab.map(function(object) { // for each element in the Roles array, display it https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
        return (
            <div className='vocab-item'>
                <img className = 'vocab-item-image' src={`../assets/flashcards/${object.english}.jpg`} onClick={(e) => playAudio(`${object.english}`)}></img>

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

    return (
        < div >
            <h1>Vocabulary</h1>
            {/* <select id="cat" value={category} onChange={handleFilterInput}>
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option> 
            </select>  */}
            {/* <button onClick={start}>Play</button> */}
            <div className="vocab-container">
                {element}
            </div>
        </div >
    );
};

export default Vocabulary;