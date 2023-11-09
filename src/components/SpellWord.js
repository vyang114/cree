import React, { useState, useEffect } from 'react';
import { vocab, playAudio, shuffleArray } from '../pages/Utils'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from "@ramonak/react-progress-bar";

import '../styles/spellWord.css'

function SpellWord() {
  

  const wordToSpell = vocab[20].creeSyllables;
  const [userSelection, setUserSelection] = useState('');
  const [selectedSyllables, setSelectedSyllables] = useState([]);
  const [shuffledSyllables, setShuffledSyllables] = useState(shuffleArray(wordToSpell));
  const isWordSpelled = userSelection === wordToSpell;

//   const handleLetterClick = (letter) => {
//     setUserSelection(userSelection + letter);
//   };

 const handleLetterClick = (letter) => {
    setSelectedSyllables(oldArray => [...oldArray, letter]);
    // let newSelectedList = new Array();
    // newSelectedList = selectedSyllables;
    // newSelectedList.push(letter)
    // console.log("newSelectedList", newSelectedList, newSelectedList.join());
    // setSelectedSyllables(newSelectedList);
    // setUserSelection(newSelectedList.join());
  };

  const handleUndo = () => {
    // if (userSelection.length > 0) {
    //   setUserSelection(userSelection.slice(0, -1));
    // }
    if (selectedSyllables.length > 0) {
        setSelectedSyllables((previousArr) => (previousArr.slice(0, -1)));
        // setUserSelection(newSelectedList.pop());
      }
  };

  const renderLetterButtons = () => {
    return shuffledSyllables.map((letter, index) => (
      <button className='btn primary' key={index} onClick={() => handleLetterClick(letter)} disabled={isWordSpelled}>
        {letter}
      </button>
    ));
  };

  useEffect(() => {
    console.log(userSelection)
  })

  return (
    <div>

  <ProgressBar completed = {60} bgColor = "#80bd80" isLabelVisible = {false} />
    <div className='header'>
      <button type="button" className='exit-button btn shadow-none' ><FontAwesomeIcon icon={faXmark} size='xl'/></button>
      <div className='title'>Spell the item</div>
    </div>
    
    
    <div className="spell-container">
      <div className='spell-item'>

        <img className='img' src={`/assets/flashcards/apple.jpg`}></img>
        
        <div className='input-area'>
          <div className='input'>{selectedSyllables.join("")}</div>
        </div>

        <div className="word-button-wrap">
          {renderLetterButtons()}
        </div>
        <div className='next-container'>
          <button className='btn primary' onClick={handleUndo} disabled={isWordSpelled}>Undo</button>
          <button className='btn primary' disabled={selectedSyllables.length === 0}>Enter</button>
        </div>
      </div>
  
      {isWordSpelled && <p>Word spelled correctly: {wordToSpell}</p>}
    </div>
    </div>
  );
}

export default SpellWord;
