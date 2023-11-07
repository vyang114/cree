import React, { useState, useEffect } from 'react';
import '../styles/spellWord.css';

const words = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'orange', 'pear', 'strawberry', 'watermelon'];

function SpellWord() {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledLetters, setScrambledLetters] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getRandomWord();
  }, []);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setCurrentWord(word);
    setScrambledLetters(shuffleWord(word));
  };

  const shuffleWord = (word) => {
    const wordArray = word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join('');
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkSpelling = () => {
    if (userInput.toLowerCase() === currentWord) {
      setMessage('Correct!');
    } else {
      setMessage('Incorrect. Try again.');
    }
  };

  return (
    <div className="spell-word">
      <h1>Spelling Game</h1>
      <p>Unscramble the letters to spell the word:</p>
      <div className="word-container">
        <p className="scrambled-word">{scrambledLetters}</p>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button onClick={checkSpelling}>Check</button>
      </div>
      <p className="message">{message}</p>
      <button onClick={getRandomWord}>Next Word</button>
    </div>
  );
}

export default SpellWord;
