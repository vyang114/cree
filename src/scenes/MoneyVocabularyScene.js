import * as Phaser from 'phaser';
export default class MoneyVocabularyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MoneyVocabularyScene' });
        this.imagePath = "../assets/adjusted/";
        this.audioPath = "../assets/sounds/";
        this.imageGapHorizontal = 10;
        this.firstRowY = 100;
        this.secondRowY = 220;
        this.thirdRowY = 340;
        this.fourthRowY = 460;
        this.firstColumnX = 150;
        this.secondColumnX = 270;
        this.thirdColumnX = 400;
        this.fourthColumnX = 530;
        this.fifthColumnX = 660;
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

        if(imageName == "tenDollars_V" || imageName == "twentyDollars_V" || imageName == "fiftyDollars_V" || imageName == "oneHundredDollars_V"){
             // Create a Graphics object to draw the border
            const borderGraphics = this.add.graphics();

            // Add pointer over event listener
            image.on('pointerover', () => {
                // Change the appearance of the image when the mouse hovers over it
                const borderWidth = 2; // Adjust the border width as needed
                const borderColor = 0x00bfff; // Green border color (adjust the color as needed)

                borderGraphics.clear();
                borderGraphics.lineStyle(borderWidth, borderColor);
                borderGraphics.strokeRect(posX-75, posY-55, 150, 110);
            });

            // Add pointer out event listener
            image.on('pointerout', () => {
                // Reset the appearance of the image when the mouse moves out
                borderGraphics.clear();
                // Reset other properties, if changed
            });

        }else{
            // Create a Graphics object to draw the border
            const borderGraphics = this.add.graphics();

            // Add pointer over event listener
            image.on('pointerover', () => {
                // Change the appearance of the image when the mouse hovers over it
                const borderWidth = 2; // Adjust the border width as needed
                const borderColor = 0x00bfff; // Green border color (adjust the color as needed)

                borderGraphics.clear();
                borderGraphics.lineStyle(borderWidth, borderColor);
                borderGraphics.strokeRect(posX-55, posY-55, 110, 110);
            });

            // Add pointer out event listener
            image.on('pointerout', () => {
                // Reset the appearance of the image when the mouse moves out
                borderGraphics.clear();
                // Reset other properties, if changed
            });
        }
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
        
        this.load.audio('nickel_wav', this.audioPath + 'nickel.wav');
        this.load.audio('dime_wav', this.audioPath + 'dime.wav');
        this.load.audio('quarter_wav', this.audioPath + 'quarter.wav');
        this.load.audio('oneDollar_wav', this.audioPath + 'one dollar.wav');
        this.load.audio('twoDollars_wav', this.audioPath + 'two dollars.wav');
        this.load.audio('threeDollars_wav', this.audioPath + 'three dollars.wav');
        this.load.audio('fourDollars_wav', this.audioPath + 'four dollars.wav');
        this.load.audio('fiveDollars_wav', this.audioPath + 'five dollars.wav');
        this.load.audio('sixDollars_wav', this.audioPath + 'six dollars.wav');
        this.load.audio('sevenDollars_wav', this.audioPath + 'seven dollars.wav');
        this.load.audio('eightDollars_wav', this.audioPath + 'eight dollars.wav');
        this.load.audio('nineDollars_wav', this.audioPath + 'nine dollars.wav');
        this.load.audio('tenDollars_wav', this.audioPath + 'nine dollars.wav');
        this.load.audio('twentyDollars_wav', this.audioPath + 'twenty dollars.wav');
        this.load.audio('fiftyDollars_wav', this.audioPath + 'fifty dollars.wav');
        this.load.audio('oneHundredDollars_wav', this.audioPath + 'one hundred dollars.wav');
        
        this.load.image('nickel_V', this.imagePath + 'nickel.jpg');
        this.load.image('dime_V', this.imagePath + 'dime.jpg');
        this.load.image('quarter_V', this.imagePath + 'quarter.jpg');
        this.load.image('oneDollar_V', this.imagePath + 'one dollar.jpg');
        this.load.image('twoDollars_V', this.imagePath + 'two dollars.jpg');
        this.load.image('threeDollars_V', this.imagePath + 'three dollars.jpg');
        this.load.image('fourDollars_V', this.imagePath + 'four dollars.jpg');
        this.load.image('fiveDollars_V', this.imagePath + 'five dollars.jpg');
        this.load.image('sixDollars_V', this.imagePath + 'six dollars.jpg');
        this.load.image('sevenDollars_V', this.imagePath + 'seven dollars.jpg');
        this.load.image('eightDollars_V', this.imagePath + 'eight dollars.jpg');
        this.load.image('nineDollars_V', this.imagePath + 'nine dollars.jpg');
        this.load.image('tenDollars_V', this.imagePath + 'ten dollars.jpg');
        this.load.image('twentyDollars_V', this.imagePath + 'twenty dollars.jpg');
        this.load.image('fiftyDollars_V', this.imagePath + 'fifty dollars.jpg');
        this.load.image('oneHundredDollars_V', this.imagePath + 'one hundred dollars.jpg');
    }

    create() {
        this.add.image(400, 300, 'greenBG');
        this.addImageAndAudio('nickel_V', this.firstColumnX, this.firstRowY);
        this.addImageAndAudio('dime_V', this.secondColumnX + this.imageGapHorizontal, this.firstRowY);
        this.addImageAndAudio('quarter_V', this.thirdColumnX + this.imageGapHorizontal, this.firstRowY);
        
        this.addImageAndAudio('oneDollar_V', this.firstColumnX, this.secondRowY);
        this.addImageAndAudio('twoDollars_V', this.secondColumnX + this.imageGapHorizontal, this.secondRowY);
        this.addImageAndAudio('threeDollars_V', this.thirdColumnX + this.imageGapHorizontal, this.secondRowY);
        this.addImageAndAudio('fourDollars_V', this.fourthColumnX + this.imageGapHorizontal, this.secondRowY);
        
        this.addImageAndAudio('fiveDollars_V', this.firstColumnX, this.thirdRowY);
        this.addImageAndAudio('sixDollars_V', this.secondColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('sevenDollars_V', this.thirdColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('eightDollars_V', this.fourthColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('nineDollars_V', this.fifthColumnX + this.imageGapHorizontal, this.thirdRowY);
        
        this.addImageAndAudio('tenDollars_V', this.firstColumnX + 18, this.fourthRowY);
        this.addImageAndAudio('twentyDollars_V', this.secondColumnX + this.imageGapHorizontal + 50, this.fourthRowY);
        this.addImageAndAudio('fiftyDollars_V', this.thirdColumnX + this.imageGapHorizontal + 80, this.fourthRowY);
        this.addImageAndAudio('oneHundredDollars_V', this.fourthColumnX + this.imageGapHorizontal + 110, this.fourthRowY);

        const fruitVocabButton = this.addButton("Fruit & \nVegetable", "20px", 30, 555, 0, 550, "FruitVocabularyScene");
        const timeVocabButton = this.addButton("Time", "26px", 210, 560, 160, 550, "TimeVocabularyScene");
        const moneyVocabButton = this.addMainButton("Money", "26px", 360, 560, 320, 550, "MoneyVocabularyScene");
        const foodVocabButton = this.addButton("Food", "26px", 530, 560, 480, 550, "MenuScene");
        const mainMenuButton = this.addButton("Main Menu", "22px", 660, 560, 640, 550, "MenuScene");
    }

    update() {

    }
}
