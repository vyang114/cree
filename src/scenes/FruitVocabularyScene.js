import * as Phaser from 'phaser';
export default class FruitVocabularyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FruitVocabularyScene' });
        this.imagePath = "../assets/adjusted/";
        this.audioPath = "../assets/sounds/";
        this.imageGapHorizontal = 10;
        this.firstRowY = 100;
        this.secondRowY = 210;
        this.thirdRowY = 330;
        this.fourthRowY = 450;
        this.firstColumnX = 200;
        this.secondColumnX = 310;
        this.thirdColumnX = 430;
        this.fourthColumnX = 550;
    }

    addImageAndAudio(imageName, posX, posY){
        const image = this.add.image(posX, posY, imageName);
        image.setScale(0.25, 0.25)
        image.setInteractive();
        // Add a click event listener to the image
        image.on('pointerdown', () => {
            // Play the audio when the image is clicked
            const audio = this.sound.add(imageName.split("_")[0] + "_wav");
            audio.play();
        });

        // Create a Graphics object to draw the border
        const borderGraphics = this.add.graphics();

        // Add pointer over event listener
        image.on('pointerover', () => {
            // Change the appearance of the image when the mouse hovers over it
            const borderWidth = 2; // Adjust the border width as needed
            const borderColor = 0x00bfff; // Green border color (adjust the color as needed)

            borderGraphics.clear();
            borderGraphics.lineStyle(borderWidth, borderColor);
            borderGraphics.strokeRect(posX-50, posY-50, 100, 100);
        });

        // Add pointer out event listener
        image.on('pointerout', () => {
            // Reset the appearance of the image when the mouse moves out
            borderGraphics.clear();
            // Reset other properties, if changed
        });
    }

    addButton(buttonText, textSize, TextPosX, TextPosY, circlePosX, circlePosY, sceneName){
        var circle = this.add.graphics();
        circle.fillStyle(0x3A76C1);
        circle.fillRect(circlePosX, circlePosY, 160, 70); // Set ellipse position and dimensions

        var button = this.add.text(TextPosX, TextPosY, buttonText, {
            fontSize: textSize,
            fill: '#fff'
        });
        
        // Make the button interactive
        button.setInteractive(); // Make the button clickable
        circle.setInteractive();

        // Set up a click event for the start button
        button.on('pointerdown', function() {
            // Start the game scene (replace 'GameScene' with your actual game scene key)
            this.scene.start(sceneName);
            console.log("clicked")
        }, this);

        button.on('pointerover', function() {
            // Change the appearance of the image when the mouse hovers over it
            circle.clear(); // Clear the previous fill
            circle.fillStyle(0x00bfff, 1); // Set the hover color (red)
            circle.fillRect( circlePosX, circlePosY, 160, 70);
        }, this);

        // Add pointer out event listener
        button.on('pointerout', () => {
            // Reset the appearance of the image when the mouse moves out
            circle.clear();
            circle.fillStyle(0x3A76C1, 1); // Set the hover color (red)
            circle.fillRect( circlePosX, circlePosY, 160, 70);
        });
    }


    addMainButton(buttonText, textSize, TextPosX, TextPosY, circlePosX, circlePosY, sceneName){
        var circle = this.add.graphics();
        circle.fillStyle(0x00bfff);
        circle.fillRect(circlePosX, circlePosY, 160, 70); // Set ellipse position and dimensions

        var button = this.add.text(TextPosX, TextPosY, buttonText, {
            fontSize: textSize,
            fill: '#fff'
        });
        
        // Make the button interactive
        button.setInteractive(); // Make the button clickable
        circle.setInteractive();

        // Set up a click event for the start button
        button.on('pointerdown', function() {
            // Start the game scene (replace 'GameScene' with your actual game scene key)
            this.scene.start(sceneName);
            console.log("clicked")
        }, this);

        button.on('pointerover', function() {
            // Change the appearance of the image when the mouse hovers over it
            circle.clear(); // Clear the previous fill
            circle.fillStyle(0x00bfff, 1); // Set the hover color (red)
            circle.fillRect( circlePosX, circlePosY, 160, 70);
        }, this);

        // Add pointer out event listener
        button.on('pointerout', () => {
            // Reset the appearance of the image when the mouse moves out
            circle.clear();
            circle.fillStyle(0x00bfff, 1); // Set the hover color (red)
            circle.fillRect( circlePosX, circlePosY, 160, 70);
        });
    }

    preload() {
        this.load.image('greenBG', 'assets/greenBG.png')
        this.load.image('apple_V', this.imagePath + 'apple.jpg');
        this.load.image('orange_V', this.imagePath + 'orange.jpg');
        this.load.image('watermelon_V', this.imagePath + 'watermelon.jpg');
        this.load.image('pear_V', this.imagePath + 'pear.jpg');
        this.load.audio('apple_wav', this.audioPath + 'apple.wav');
        this.load.audio('orange_wav', this.audioPath + 'orange.wav');
        this.load.audio('watermelon_wav', this.audioPath + 'watermelon.wav');
        this.load.audio('pear_wav', this.audioPath + 'pear.wav');

        this.load.image('apples_V', this.imagePath + 'apples.jpg');
        this.load.image('oranges_V', this.imagePath + 'oranges.jpg');
        this.load.image('watermelons_V', this.imagePath + 'watermelons.jpg');
        this.load.image('pears_V', this.imagePath + 'pears.jpg');
        this.load.audio('apples_wav', this.audioPath + 'apples.wav');
        this.load.audio('oranges_wav', this.audioPath + 'oranges.wav');
        this.load.audio('watermelons_wav', this.audioPath + 'watermelons.wav');
        this.load.audio('pears_wav', this.audioPath + 'pears.wav');

        this.load.image('peach_V', this.imagePath + 'peach.jpg');
        this.load.image('carrot_V', this.imagePath + 'carrot.jpg');
        this.load.image('onion_V', this.imagePath + 'onion.jpg');
        this.load.image('potato_V', this.imagePath + 'potato.jpg');
        this.load.audio('peach_wav', this.audioPath + 'peach.wav');
        this.load.audio('carrot_wav', this.audioPath + 'carrot.wav');
        this.load.audio('onion_wav', this.audioPath + 'onion.wav');
        this.load.audio('potato_wav', this.audioPath + 'potato.wav');

        this.load.image('peaches_V', this.imagePath + 'peaches.jpg');
        this.load.image('carrots_V', this.imagePath + 'carrots.jpg');
        this.load.image('onions_V', this.imagePath + 'onions.jpg');
        this.load.image('potatoes_V', this.imagePath + 'potatoes.jpg');
        this.load.audio('peaches_wav', this.audioPath + 'peaches.wav');
        this.load.audio('carrots_wav', this.audioPath + 'carrots.wav');
        this.load.audio('onions_wav', this.audioPath + 'onions.wav');
        this.load.audio('potatoes_wav', this.audioPath + 'potatoes.wav');
    }

    

    create() {
        this.add.image(400, 300, 'greenBG');
        this.addImageAndAudio('apple_V', this.firstColumnX, this.firstRowY);
        this.addImageAndAudio('orange_V', this.secondColumnX + this.imageGapHorizontal, this.firstRowY);
        this.addImageAndAudio('watermelon_V', this.thirdColumnX + this.imageGapHorizontal, this.firstRowY);
        this.addImageAndAudio('pear_V', this.fourthColumnX + this.imageGapHorizontal, this.firstRowY);
        this.addImageAndAudio('apples_V', this.firstColumnX, this.secondRowY);
        this.addImageAndAudio('oranges_V', this.secondColumnX + this.imageGapHorizontal, this.secondRowY);
        this.addImageAndAudio('watermelons_V', this.thirdColumnX + this.imageGapHorizontal, this.secondRowY);
        this.addImageAndAudio('pears_V', this.fourthColumnX + this.imageGapHorizontal, this.secondRowY);

        this.addImageAndAudio('peach_V', this.firstColumnX, this.thirdRowY);
        this.addImageAndAudio('carrot_V', this.secondColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('onion_V', this.thirdColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('potato_V', this.fourthColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('peaches_V', this.firstColumnX, this.fourthRowY);
        this.addImageAndAudio('carrots_V', this.secondColumnX + this.imageGapHorizontal, this.fourthRowY);
        this.addImageAndAudio('onions_V', this.thirdColumnX + this.imageGapHorizontal, this.fourthRowY);
        this.addImageAndAudio('potatoes_V', this.fourthColumnX + this.imageGapHorizontal, this.fourthRowY);

        var fruitVocabButton = this.addMainButton("Fruit & \nVegetable", "20px", 30, 555, 0, 550, "FruitVocabularyScene");
        var timeVocabButton = this.addButton("Time", "26px", 210, 560, 160, 550, "TimeVocabularyScene");
        var moneyVocabButton = this.addButton("Money", "26px", 360, 560, 320, 550, "MoneyVocabularyScene");
        var foodVocabButton = this.addButton("Food", "26px", 530, 560, 480, 550, "MenuScene");
        var mainMenuButton = this.addButton("Main Menu", "22px", 660, 560, 640, 550, "MenuScene");
    }

    update() {

    }
}
