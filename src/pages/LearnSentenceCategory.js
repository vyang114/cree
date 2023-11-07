import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Vocabulary from "./Vocabulary";
import Learn from "./Learn";
import { categories, sentenceCategories, vocab, shuffleArray } from "./Utils";
import AudioRecorderComponent from './AudioRecorder';

import '../styles/category.css'

const colours = ["#EDAA6C", "#ea7f3d", "#D83E27", "#7f605c", "#193963", "#1F6E8E", "#2C8B98", "#82A8A0", "#bda5b7", "#6a6a6a"]; // "#ad9a8a"

const LearnSentenceCategory = () => {

    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(false);

    const sentenceReducer = useSelector((state) => state.sentenceReducer);

    const filteredVocab = useSelector((state) => state.filteredVocab);
    const shuffledDilteredVocab = useSelector((state) => state.shuffledDilteredVocab);
    const indexNotPickedYet = useSelector((state) => state.indexNotPickedYet);
    const isBoolean = useSelector((state) => state.isBoolean);

    const handleOption = (category) => {
        let filtered = vocab.filter(obj => obj.category.includes(category)).map(obj => ({"audio":obj.audio, "category":obj.category, "cree":obj.cree, "english":obj.english}));
        setSelectedCategory(true);
        console.log("UPDATE_CATEGORY", category)
        dispatch({ type: 'BOOLEAN_FALSE', payload: false });
        dispatch({ type: 'UPDATE_EXIT', payload: false });
        dispatch({ type: 'UPDATE_SENTENCE_CATEGORY', payload: category });
        dispatch({ type: 'UPDATE_FILTERED_VOCAB', payload: filtered});
        dispatch({ type: 'UPDATE_SHUFFLED_FILTERED_VOCAB', payload: shuffleArray(filtered)});
        dispatch({ type: 'UPDATE_INDEX_NOT_PICKED', payload: Array.from(Array(filtered.length).keys())});
    };

    // console.log("LearnCategory", filteredVocab, shuffledDilteredVocab, indexNotPickedYet)

    let element = sentenceCategories.map(function(object, index) { // for each element in the Roles array, display it https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
        return (
            <button className='category-button'
                    component={Link}
                    style={{ background: `${colours[index]}` }}
                    onClick={(e) => handleOption(`${object.category}`)}
            >
            {/* <div className='category-item'> */}
                    <div className="category-item-text">
                    {/* <div className="category-header" style={{ background: `${colours[index]}` }}> */}
                        <div className='category-item-icon'>
                            <FontAwesomeIcon icon={object.icon} size='2xl'/>
                        </div>
                        <div className='category-item-text'>{object.category}</div>
                    </div>
                    {/* </div> */}
                {/* <button onClick={(e) => playAudio(`${object.english}`)}>{ object.english }</button> */}
            </button>
        );
      })

      console.log("element", element)

	return (
        <div>
        {
            sentenceReducer.sentenceCategory ?
            <Learn />
            :
            <div className="category-container">{element}</div>
        }
{/* 
      {(() => {
        if (option === "Food") {
          return (
            <Learn 
                category = {option}
            /> 
          )
        } else if (option === "Greetings") {
          return (
            <Learn 
                category = {option}
            /> 
          )
        } else if (option === "Action Verbs") {
            return (
              <Learn 
                  category = {option}
              /> 
            ) 
        } else if (option === "Time") {
            return (
              <Learn 
                  category = {option}
              /> 
            )
        } else if (option === "Money") {
            return (
              <Learn 
                  category = {option}
              /> 
        )
        } else {
          return (
            <div className="category-container">{element}</div>
          )
        }
      })()} */}
    </div>
	);
};

export default LearnSentenceCategory;
