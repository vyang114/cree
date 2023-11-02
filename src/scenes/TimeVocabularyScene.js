import * as Phaser from 'phaser';
export default class TimeVocabularyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TimeVocabularyScene' });
        this.imagePath = "../assets/adjusted/";
        this.audioPath = "../assets/sounds/";
        this.imageGapHorizontal = 20;
        this.firstRowY = 100;
        this.secondRowY = 220;
        this.thirdRowY = 340;
        this.fourthRowY = 460;
        this.firstColumnX = 200;
        this.secondColumnX = 300;
        this.thirdColumnX = 420;
        this.fourthColumnX = 540;
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
            borderGraphics.strokeRect(posX-55, posY-55, 107, 107);
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
            circle.fillStyle(0x00bfff, 1); // Set the hover color 
            circle.fillRect( circlePosX, circlePosY, 160, 70);
        }, this);

        // Add pointer out event listener
        button.on('pointerout', () => {
            // Reset the appearance of the image when the mouse moves out
            circle.clear();
            circle.fillStyle(0x3A76C1, 1); // Set the hover color 
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
        this.load.image('morning_V', this.imagePath + 'morning.jpg');
        this.load.audio('morning_wav', this.audioPath + 'morning.wav');

        this.load.image('in the morning_V', this.imagePath + 'in the morning.jpg');
        this.load.audio('in the morning_wav', this.audioPath + 'in the morning.wav');

        this.load.image('night_V', this.imagePath + 'night.jpg');
        this.load.audio('night_wav', this.audioPath + 'night.wav');

        this.load.image('tonight_V', this.imagePath + 'tonight.jpg');
        this.load.audio('tonight_wav', this.audioPath + 'tonight.wav');

        this.load.image('noon_V', this.imagePath + 'noon.jpg');
        this.load.audio('noon_wav', this.audioPath + 'noon.wav');
        
        this.load.image('at noon_V', this.imagePath + 'at noon.jpg');
        this.load.audio('at noon_wav', this.audioPath + 'at noon.wav');

        this.load.image('midnight_V', this.imagePath + 'midnight.jpg');
        this.load.audio('midnight_wav', this.audioPath + 'midnight.wav');

        this.load.image('at midnight_V', this.imagePath + 'at midnight.jpg');
        this.load.audio('at midnight_wav', this.audioPath + 'at midnight.wav');

        this.load.image('last evening_V', this.imagePath + 'last evening.jpg');
        this.load.audio('last evening_wav', this.audioPath + 'last evening.wav');

        this.load.image('last night_V', this.imagePath + 'last night.jpg');
        this.load.audio('last night_wav', this.audioPath + 'last night.wav');
        
        this.load.image('later tonight_V', this.imagePath + 'later tonight.jpg');
        this.load.audio('later tonight_wav', this.audioPath + 'later tonight.wav');

        this.load.image('past midnight_V', this.imagePath + 'past midnight.jpg');
        this.load.audio('past midnight_wav', this.audioPath + 'past midnight.wav');

        this.load.image('after midnight_V', this.imagePath + 'after midnight.jpg');
        this.load.audio('after midnight_wav', this.audioPath + 'after midnight.wav');

        this.load.image('tomorrow_V', this.imagePath + 'tomorrow.jpg');
        this.load.audio('tomorrow_wav', this.audioPath + 'tomorrow.wav');

        this.load.image('tomorrow morning_V', this.imagePath + 'tomorrow morning.jpg');
        this.load.audio('tomorrow morning_wav', this.audioPath + 'tomorrow morning.wav');

        this.load.image('day after tomorrow_V', this.imagePath + 'day after tomorrow.jpg');
        this.load.audio('day after tomorrow_wav', this.audioPath + 'day after tomorrow.wav');
    }

    

    create() {
        this.add.image(400, 300, 'greenBG');
        this.addImageAndAudio('morning_V', this.firstColumnX, this.firstRowY);
        this.addImageAndAudio('in the morning_V', this.secondColumnX + this.imageGapHorizontal, this.firstRowY);
        this.addImageAndAudio('night_V', this.thirdColumnX + this.imageGapHorizontal, this.firstRowY);
        this.addImageAndAudio('tonight_V', this.fourthColumnX + this.imageGapHorizontal, this.firstRowY);
        this.addImageAndAudio('noon_V', this.firstColumnX, this.secondRowY);
        this.addImageAndAudio('at noon_V', this.secondColumnX + this.imageGapHorizontal, this.secondRowY);
        this.addImageAndAudio('midnight_V', this.thirdColumnX + this.imageGapHorizontal, this.secondRowY);
        this.addImageAndAudio('at midnight_V', this.fourthColumnX + this.imageGapHorizontal, this.secondRowY);

        this.addImageAndAudio('last evening_V', this.firstColumnX, this.thirdRowY);
        this.addImageAndAudio('last night_V', this.secondColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('later tonight_V', this.thirdColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('past midnight_V', this.fourthColumnX + this.imageGapHorizontal, this.thirdRowY);
        this.addImageAndAudio('after midnight_V', this.fourthColumnX + this.imageGapHorizontal, this.fourthRowY);
        
        this.addImageAndAudio('tomorrow_V', this.firstColumnX, this.fourthRowY);
        this.addImageAndAudio('tomorrow morning_V', this.secondColumnX + this.imageGapHorizontal, this.fourthRowY);
        this.addImageAndAudio('day after tomorrow_V', this.thirdColumnX + this.imageGapHorizontal, this.fourthRowY);

        const fruitVocabButton = this.addButton("Fruit & \nVegetable", "20px", 30, 555, 0, 550, "FruitVocabularyScene");
        const timeVocabButton = this.addMainButton("Time", "26px", 210, 560, 160, 550, "TimeVocabularyScene");
        const moneyVocabButton = this.addButton("Money", "26px", 360, 560, 320, 550, "MoneyVocabularyScene");
        const foodVocabButton = this.addButton("Food", "26px", 530, 560, 480, 550, "MenuScene");
        const mainMenuButton = this.addButton("Main Menu", "22px", 660, 560, 640, 550, "MenuScene");
    }

    update() {

    }
}
