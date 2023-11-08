import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from "@ramonak/react-progress-bar";
import { shuffleArray, vocab } from './Utils';
import ShowItem from '../components/ShowItem';
import MatchSoundToWord from '../components/MatchSoundToWord'
import SpellWord from '../components/SpellWord';
import appReducer from '../components/reducers';

import '../styles/showItem.css'

const Learn = () => {

    const dispatch = useDispatch()
    const isBoolean = useSelector((state) => state.appReducer.isBoolean);
    const showMatchSoundToWord = useSelector((state) => state.appReducer.showMatchSoundToWord);
    const category = useSelector((state) => state.appReducer.category);
    const filteredVocab = useSelector((state) => state.appReducer.filteredVocab);
    const shuffledDilteredVocab = useSelector((state) => state.appReducer.shuffledDilteredVocab);
    const indexNotPickedYet = useSelector((state) => state.appReducer.indexNotPickedYet);
    
    const [randomIndex, setRandomIndex] = useState(0);
    const [item, setItem] = useState(shuffledDilteredVocab[randomIndex]);
    // const [indexNotPickedYet, setIndexNotPickedYet] = useState(Array.from(Array(filteredVocab.length).keys()));

    useEffect(() => {
        let index = indexNotPickedYet.indexOf(randomIndex);
        if (index !== -1) {
            indexNotPickedYet.splice(index, 1);
        }
        dispatch({ type: 'UPDATE_INDEX_NOT_PICKED', payload: indexNotPickedYet });
      }, [randomIndex]);

    const pickRandomItem = () => {
        // Pick random index
        if(indexNotPickedYet.length > 0){
            let random = indexNotPickedYet[Math.floor(Math.random() * indexNotPickedYet.length)];
            console.log("indexNotPickedYet", indexNotPickedYet)
            console.log("randomIndex", randomIndex)
            setRandomIndex(random);
        }
    }

    useEffect(() => {
        if(showMatchSoundToWord && indexNotPickedYet.length > 0){
            // console.log("before isBoolean", isBoolean)
            pickRandomItem();
            // dispatch({ type: 'BOOLEAN_FALSE', payload: false });
            // console.log("after isBoolean", isBoolean)
        }
    }, [showMatchSoundToWord]);

    const handleNextClick = () => {
        if (showMatchSoundToWord) {
            dispatch({ type: 'UPDATE_SHOW_MATCH_SOUND_TO_WORD', payload: false });
        //   setShowComponent1(false); // Switch to Component2
        } else {
          // Update "item" and switch back to Component1
          setItem(shuffledDilteredVocab[randomIndex]);
          dispatch({ type: 'UPDATE_SHOW_MATCH_SOUND_TO_WORD', payload: true });
        //   setShowComponent1(true);
        }
    };

	return (
		<div>
            {/* <SpellWord /> */}
            <ProgressBar completed = {((filteredVocab.length - indexNotPickedYet.length) / filteredVocab.length)*100} bgColor = "#80bd80" isLabelVisible = {false} />
            {showMatchSoundToWord ? (
                <MatchSoundToWord item={item} randomIndex={randomIndex} onNextClick={handleNextClick} />
            ) : (
                <ShowItem item={item} onNextClick={handleNextClick} />
            )}
		</div>
	);
};

export default Learn;