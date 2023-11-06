import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { vocab, shuffleArray, playAudio } from '../pages/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LearnCategory from '../pages/LearnCategory'

import '../styles/MatchSoundToWord.css'

const MatchSoundToWord = ( { item, randomIndex, onNextClick } ) => {

    const dispatch = useDispatch()
    const exit = useSelector((state) => state.exit);
    const filteredVocab = useSelector((state) => state.filteredVocab);
    const shuffledDilteredVocab = useSelector((state) => state.shuffledDilteredVocab);
    const indexNotPickedYet = useSelector((state) => state.indexNotPickedYet);
    const isBoolean = useSelector((state) => state.isBoolean);
    
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answeredCorrect, setAnsweredCorrect] = useState(false);
    const [answerChoices, setAnswerChoices] = useState(shuffledDilteredVocab.slice(0,3));

    // const incorrectAnswers = filteredItemsShuffled.slice(0, 2);
    // incorrectAnswers.push(item);
    // const answerChoices = shuffleArray(incorrectAnswers);

    // console.log("randomIndex", randomIndex, "filteredItems", filteredItems);

    useEffect(() => {
        if(filteredVocab.length > 0){
            playAudio(item);
            // console.log("item", item)
            let allItemsWithoutCurrent = shuffledDilteredVocab.filter((value, index) => randomIndex !== index);
            let allItemsWithoutCurrentShuffled = shuffleArray(allItemsWithoutCurrent);
            const incorrectAnswers = allItemsWithoutCurrentShuffled.slice(0, 2);
            incorrectAnswers.push(item);
            setAnswerChoices(shuffleArray(incorrectAnswers));
            console.log("item", item, "randomIndex", randomIndex)
        }
        // console.log("shuffledDilteredVocab", shuffledDilteredVocab)
        // console.log("allItemsWithoutCurrent", allItemsWithoutCurrent)
        // console.log("answerChoices", answerChoices)
    }, [item])

    function handleSelectAnswer(event) {
        setSelectedAnswer(event.target.value);
        if(event.target.value === item.cree){
            setAnsweredCorrect(true);
        }
    };

    const handleGoBack = () => {
        dispatch({ type: 'BOOLEAN_FALSE', payload: false });
        dispatch({ type: 'UPDATE_EXIT', payload: true });
        dispatch({ type: 'UPDATE_SHOW_MATCH_SOUND_TO_WORD', payload: true });
        dispatch({ type: 'UPDATE_CATEGORY', payload: "" });
        dispatch({ type: 'UPDATE_RANDOM_INDEX', payload: 0 });
        dispatch({ type: 'UPDATE_FILTERED_VOCAB', payload: [] });
        dispatch({ type: 'UPDATE_SHUFFLED_FILTERED_VOCAB', payload: [] });
        dispatch({ type: 'UPDATE_INDEX_NOT_PICKED', payload: [] });
    }

    const handleNext = () => {
        if(answeredCorrect){
            onNextClick();
        }else{
            console.log("incorrect");
        }
        // console.log("shuffledDilteredVocab", shuffledDilteredVocab)
        // console.log("indexNotPickedYet", indexNotPickedYet)
        setSelectedAnswer("");
        setAnsweredCorrect(false);
        console.log((filteredVocab.length - indexNotPickedYet.length) / filteredVocab.length)
      };

	return (
        <div>
            {
            exit 
            ? <LearnCategory /> 
            : 
            <div>
                <button type="button" className='btn shadow-none' onClick={handleGoBack}><FontAwesomeIcon icon={faXmark} size='xl'/></button>
                <div className='matchSound-container'>
                
                    <div className='matchSound-item'>
                    
                        <img className='img' src={`/assets/flashcards/${item.english}.jpg`} onClick={(e) => playAudio(item)}></img>
                        {/* <img className='img' src={`/assets/flashcards/placeholder.jpg`} onClick={(e) => playAudio(item)}></img> */}

                        <div className="input-container">
                            <div className='soundToWord-button-wrap'>
                                <div className='soundToWord-button-label'>
                                    <input type="radio" id="control_01" name="select" value={answerChoices[0].cree} onChange={handleSelectAnswer} checked={(selectedAnswer == answerChoices[0].cree)}/>
                                    <label for="control_01">
                                        <span>{answerChoices[0].cree}</span>
                                    </label>
                                </div>
                                <div>
                                <input type="radio" id="control_02" name="select" value={answerChoices[1].cree} onChange={handleSelectAnswer} checked={(selectedAnswer == answerChoices[1].cree)}/>
                                <label for="control_02">
                                    <span>{answerChoices[1].cree}</span>
                                </label>
                                </div>
                                <div>
                                <input type="radio" id="control_03" name="select" value={answerChoices[2].cree} onChange={handleSelectAnswer} checked={(selectedAnswer == answerChoices[2].cree)}/>
                                <label for="control_03">
                                    <span>{answerChoices[2].cree}</span>
                                </label>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
                <div className='next-container'>
                    <button className='btn primary' onClick={handleNext} disabled={selectedAnswer === ""}>Next</button>
                </div>
            </div>
            }
        </div>
	);
};

export default MatchSoundToWord;
