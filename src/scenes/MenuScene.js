import * as Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {

    width = null
    height = null
    handlerScene = null
    sceneStopped = false

    constructor() {
        super({ key: 'MenuScene' });
    }

    preload(){
        this.load.image('sky', '../assets/sky.png');
        this.load.image('guide', '../assets/540x960-guide.png')

        this.canvasWidth = this.sys.game.canvas.width
        this.canvasHeight = this.sys.game.canvas.height

        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height

        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'MenuScene'
        this.sceneStopped = false
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        this.cameras.main.setBackgroundColor('#727272')

        // this.add.image(width, height, 'sky').setOrigin(.5)
        // Add a title text
        // this.add.image(400, 300, 'sky');

        this.add.text(
            width / 2, 
            height*0 + 100, 
            'Cree Chatbot', 
            { 
                fontFamily: 'Arial', 
                fontSize: '48px', 
                color: '#000', 
            }).setOrigin(.5).setDepth(1)

        // Add a start button
        var startButton = this.add.text(
            width / 2, 
            height*0 + 300,
            'Game', 
            {
                fontFamily: 'Arial',
                fontSize: '40px',
                fill: '#fff'
            }).setOrigin(.5);

        startButton.setInteractive(); // Make the button clickable

        // Set up a click event for the start button
        startButton.on('pointerdown', function() {
            // Start the game scene (replace 'GameScene' with your actual game scene key)
            this.scene.start('FruitGameScene');

        }, this);

        // Add an options/settings button (can link to an options scene)
        // var vocabButton = this.add.text(
        //     width / 2, 
        //     height*0 + 400,
        //     'Vocabulary', 
        //     {
        //         fontFamily: 'Arial',
        //         fontSize: '40px',
        //         fill: '#fff'
        //     }).setOrigin(.5);
        // vocabButton.setInteractive();

        // // Set up a click event for the options button
        // vocabButton.on('pointerdown', function() {
        //     this.scene.start('FruitVocabularyScene');
        // }, this);

        // Add a quiz button
        var quizButton = this.add.text(
            width / 2, 
            height*0 + 500,
            'Quiz', 
            {
                fontFamily: 'Arial',
                fontSize: '40px',
                fill: '#fff'
            }).setOrigin(.5);
        quizButton.setInteractive();

        // Set up a click event for the options button
        quizButton.on('pointerdown', function() {
            // Navigate to the options scene (replace 'OptionsScene' with your options scene key)
            // this.scene.start('FruitQuizScene');
            this.sceneStopped = true;
            this.scene.stop('MenuScene');
            this.handlerScene.launchScene('FruitQuizScene');
        }, this);
    }

    update(){
        
    }
}
