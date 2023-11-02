import React, { Component } from 'react';
import * as Phaser from 'phaser';
import Handler from "./scenes/HandlerScene.js";
import MenuScene from "./scenes/MenuScene.js";
import FruitGameScene from "./scenes/FruitGameScene.js";
import FruitGameLevelTwoScene from "./scenes/FruitGameLevelTwoScene.js";
import MoneyGameScene from "./scenes/MoneyGameScene.js";
import FruitVocabularyScene from "./scenes/FruitVocabularyScene.js";
import MoneyVocabularyScene from "./scenes/MoneyVocabularyScene.js";
import TimeVocabularyScene from "./scenes/TimeVocabularyScene.js";
import FruitQuizScene from "./scenes/FruitQuizScene.js";

// Aspect Ratio 16:9 - Portrait
const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 540
const SIZE_HEIGHT_SCREEN = 960

class Game extends Component {

    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            // width: 800,
            // height: 600,
            scale: {
                mode: Phaser.Scale.RESIZE,
                parent: 'game',
                width: SIZE_WIDTH_SCREEN,
                height: SIZE_HEIGHT_SCREEN,
                min: {
                    width: MIN_SIZE_WIDTH_SCREEN,
                    height: MIN_SIZE_HEIGHT_SCREEN
                },
                max: {
                    width: MAX_SIZE_WIDTH_SCREEN,
                    height: MAX_SIZE_HEIGHT_SCREEN
                }
            },
            dom: {
                createContainer: true
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: [
                Handler,
                MenuScene,
                FruitGameScene,
                FruitGameLevelTwoScene,
                MoneyGameScene,
                FruitVocabularyScene,
                MoneyVocabularyScene,
                TimeVocabularyScene,
                FruitQuizScene
            ]
        };
  
      this.game = new Phaser.Game(config);

      // Global
    this.game.debugMode = true
    this.game.embedded = false // game is embedded into a html iframe/object

    this.game.screenBaseSize = {
        maxWidth: MAX_SIZE_WIDTH_SCREEN,
        maxHeight: MAX_SIZE_HEIGHT_SCREEN,
        minWidth: MIN_SIZE_WIDTH_SCREEN,
        minHeight: MIN_SIZE_HEIGHT_SCREEN,
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN
    }

    this.game.orientation = "portrait"
    }
  
    preload() {
      // Preload game assets here
    }
  
    create() {
      // Initialize game objects here
    }
  
    update() {
      // Update game logic here
    }
  
    render() {
      return <div id="game-container"></div>;
    }
  }
  
  export default Game;

// const config = {
//     type: Phaser.AUTO,
//     // width: 800,
//     // height: 600,
//     scale: {
//         mode: Phaser.Scale.RESIZE,
//         parent: 'game',
//         width: SIZE_WIDTH_SCREEN,
//         height: SIZE_HEIGHT_SCREEN,
//         min: {
//             width: MIN_SIZE_WIDTH_SCREEN,
//             height: MIN_SIZE_HEIGHT_SCREEN
//         },
//         max: {
//             width: MAX_SIZE_WIDTH_SCREEN,
//             height: MAX_SIZE_HEIGHT_SCREEN
//         }
//     },
//     dom: {
//         createContainer: true
//     },
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 300 },
//             debug: false
//         }
//     },
//     scene: [
//         Handler,
//         MenuScene,
//         FruitGameScene,
//         FruitGameLevelTwoScene,
//         MoneyGameScene,
//         FruitVocabularyScene,
//         MoneyVocabularyScene,
//         TimeVocabularyScene,
//         FruitQuizScene
//     ]
// };

// const game = new Phaser.Game(config)