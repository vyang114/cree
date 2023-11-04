import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot, faCircleDollarToSlot, faClock, faComments, faHandshake, faHome, faIceCream, faPaw, faPersonRunning, faTrain } from '@fortawesome/free-solid-svg-icons'
import AudioRecorderComponent from '../AudioRecorder';

import '../styles/category.css'

const categories = [
    {
        category: "Greetings",
        icon: faHandshake,
    },
    {
        category: "Action Verbs",
        icon: faPersonRunning,
    },
    {
        category: "Phrases",
        icon: faComments,
    },
    {
        category: "Fruits & Vegetables",
        icon: faCarrot,
    },
    {
        category: "Food",
        icon: faIceCream,
    },
    {
        category: "Places & Transportation",
        icon: faTrain,
    },
    {
        category: "Home",
        icon: faHome,
    },
    {
        category: "Animals",
        icon: faPaw,
    },
    {
        category: "Time",
        icon: faClock,
    },
    // {
    //     category: "Time",
    //     icon: "Intermediate",
    // },
    {
        category: "Money",
        icon: faCircleDollarToSlot,
    },
    // {
    //     category: "Money",
    //     icon: "Intermediate",
    // },
]

const colours = ["#EDAA6C", "#ea7f3d", "#D83E27", "#193963", "#1F6E8E", "#2C8B98", "#82A8A0", "#bda5b7", "#c2b4a8", "#6a6a6a"];

const Category = () => {

    let element = categories.map(function(object, index) { // for each element in the Roles array, display it https://stackoverflow.com/questions/37997893/promise-error-objects-are-not-valid-as-a-react-child
        return (
            <button className='category-button' style={{ background: `${colours[index]}` }}>
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
        <>
        <div className="category-container">
            {element}
        </div>
        </>
	);
};

export default Category;
