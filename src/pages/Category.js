import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Vocabulary from "./Vocabulary";
import { categories } from "./Utils";
import AudioRecorderComponent from '../AudioRecorder';

import '../styles/category.css'

const colours = ["#EDAA6C", "#ea7f3d", "#D83E27", "#193963", "#1F6E8E", "#2C8B98", "#82A8A0", "#bda5b7", "#c2b4a8", "#6a6a6a"];

const Category = () => {

    const [option, setOption] = useState("");

    const handleOption = (category) => {
        setOption(category);
    };

    let element = categories.map(function(object, index) { // for each element in the Roles array, display it https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
        return (
            <button className='category-button' 
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

	return (
        <div>
      {(() => {
        if (option === "Food") {
          return (
            <Vocabulary 
                category = {option}
            /> 
          )
        } else if (option === "Fruits & Vegetables") {
          return (
            <Vocabulary 
                category = {option}
            /> 
          )
        } else if (option === "Time") {
            return (
              <Vocabulary 
                  category = {option}
              /> 
            )
        } else if (option === "Money") {
            return (
              <Vocabulary 
                  category = {option}
              /> 
        )
        } else {
          return (
            <div className="category-container">{element}</div>
          )
        }
      })()}
    </div>
	);
};

export default Category;
