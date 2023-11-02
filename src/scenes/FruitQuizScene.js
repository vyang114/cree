import * as Phaser from 'phaser';

export default class FruitQuizScene extends Phaser.Scene {

    handlerScene = false;
    sceneStopped = false;

    constructor() {
        super({ key: 'FruitQuizScene' });

        this.audioPath = "../assets/sounds/";
        this.imagePath = "../assets/";
        this.currentItem = null;
        this.randomIndexPicked = false;
        this.correctAnswerSelected = false;
        this.spellIndexPicked = false;
        this.correctAnswerSpelled = false;
        this.quizzes = [0, 1];
        this.quizSelected = false;
        this.replay = false;
        this.indexNotSpelledYet = [0, 1, 2, 3, 4, 5, 6];
        this.indexNotPickedYet = [0, 1, 2, 3, 4, 5, 6];
        this.numItemTotal = this.indexNotSpelledYet.length + this.indexNotPickedYet.length;
        this.numItemCompleted = 0;
        this.countText = null;
        this.indexList = [0, 1, 2, 3, 4, 5];
        this.itemList = [
            {
                "id": 0,
                "name": "apple",
                "audio": "apple_wav",
                "cree": "kaspimin",
                "spelling": ["kas", "pi", "min"],
            },
            {
                "id": 1,
                "name": "orange",
                "audio": "orange_wav",
                "cree": "osawimin",
                "spelling": ["osa", "wi", "min"],
            },
            {
                "id": 2,
                "name": "watermelon",
                "audio": "watermelon_wav",
                "cree": "nipiwimin",
                "spelling": ["ni", "pi", "wi", "min"],
            },
            {
                "id": 3,
                "name": "pear",
                "audio": "pear_wav",
                "cree": "cipomin",
                "spelling": ["ci", "po", "min"],
            },
            {
                "id": 4,
                "name": "peach",
                "audio": "peach_wav",
                "cree": "mithawimin",
                "spelling": ["mi", "tha", "wi", "min"],
            },
            {
                "id": 5,
                "name": "potato",
                "audio": "potato_wav",
                "cree": "askipwa",
                "spelling": ["as", "ki", "pwa"],
            },
            {
                "id": 6,
                "name": "carrot",
                "audio": "carrot_wav",
                "cree": "oskatask",
                "spelling": ["os", "ka", "task"],
            }
        ]
    }

    shuffleIndex(){
        let shuffled = this.indexList
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        // console.log(shuffled);
        return shuffled;
    }

    addImage(imageName){
        const image = this.add.image(400, 300, imageName);
        image.setVisible(false);
    }

    pickRandomItem(){
        // Pick random index
        this.randomIndex = Phaser.Math.RND.pick(this.indexNotPickedYet);
        console.log("randomIndex", this.randomIndex)

        let index = this.indexNotPickedYet.indexOf(this.randomIndex);
        if (index > -1) { // only splice array when item is found
            this.indexNotPickedYet.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.randomIndexPicked = true;
        console.log("indexNotPickedYet", this.indexNotPickedYet, this.randomIndexPicked);
    }

    pickSpellItem(){
         // Pick random index
         this.randomSpellIndex = Phaser.Math.RND.pick(this.indexNotSpelledYet);
         console.log("randomSpellIndex", this.randomSpellIndex)
 
         let index = this.indexNotSpelledYet.indexOf(this.randomSpellIndex);
         if (index > -1) { // only splice array when item is found
             this.indexNotSpelledYet.splice(index, 1); // 2nd parameter means remove one item only
         }
         this.spellIndexPicked = true;
         console.log("indexNotSpelledYet", this.indexNotSpelledYet);
    }

    showItem(quizType){
        if(quizType === 0){
            this.add.image(400, 200, this.itemList[this.randomIndex]["name"]);
            this.add.text(400, 300, `${this.itemList[this.randomIndex]["cree"]}`, {
                fontSize: '40px',
                color: '#000000',
            });
            this.add.text(400, 350, `${this.itemList[this.randomIndex]["name"]}`, {
                fontSize: '40px',
                color: '#000000',
            });
        }else{
            this.add.image(400, 200, this.itemList[this.randomSpellIndex]["name"]);
            this.add.text(400, 300, `${this.itemList[this.randomSpellIndex]["cree"]}`, {
                fontSize: '40px',
                color: '#000000',
            });
            this.add.text(400, 350, `${this.itemList[this.randomSpellIndex]["name"]}`, {
                fontSize: '40px',
                color: '#000000',
            });
        }
    }

    spellItem(){
        // Show item for that index
        let image = this.add.image(this.width/2, 200, this.itemList[this.randomSpellIndex]["name"]);
        image.setInteractive();
        image.on('pointerdown', () => {
        // Play the audio when the image is clicked
            audio.play();
        });

        let audio = this.sound.add(this.itemList[this.randomSpellIndex]["audio"]);
        audio.play();

        var inputBox = this.add.graphics();
        inputBox.lineStyle(1, 0x000000);
        inputBox.strokeRect(this.width*0 + 10, image.y+image.height/2 + 100, this.width - 20, 100); 

        const textArray = [];
        for (const substring of this.itemList[this.randomSpellIndex]["spelling"]){
            
            let substringText = this.add.text(Phaser.Math.Between(this.width*0 + 20, this.width-120), Phaser.Math.Between(image.y+image.height/2 + 200, this.height-150), 
            `${substring}`, 
            {
                fontSize: '50px',
                color: '#000000',
            });
            substringText.setInteractive({ draggable: true });
            // console.log(substringText.x);
            
            // Enable input events
            this.input.setDraggable(substringText);

            // Set event listeners for drag events
            this.input.on('dragstart', (pointer, gameObject) => {
                // Handle drag start event if needed
            });

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                // Update the position of the dragged text
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            this.input.on('dragend', (pointer, gameObject) => {
                // Handle drag end event if needed
            });

            textArray.push(substringText);
        }

        var button = this.add.text(this.width/2 - 100, this.height - 100, "OK", {
            fontSize: 35,
            fill: '#fff'
        });
        button.setDepth(1);

        var circle = this.add.graphics();
        circle.fillStyle(0x3A76C1);
        circle.fillRoundedRect(button.x-15, this.height - 110, button.width*2, 50); // Set ellipse position and dimensions
        
        var audioButton = this.add.text(this.width/2 + 50, this.height - 100, "Replay", {
            fontSize: 35,
            fill: '#fff'
        });
        audioButton.setDepth(1);

        var audioCircle = this.add.graphics();
        audioCircle.fillStyle(0x3A76C1);
        audioCircle.fillRoundedRect(audioButton.x-10, this.height - 110, audioButton.width+20, 50); // Set ellipse position and dimensions

        // Make the button interactive
        button.setInteractive(); // Make the button clickable
        circle.setInteractive();

        audioButton.setInteractive(); // Make the button clickable
        audioCircle.setInteractive();

        // Set up a click event for the start button
        button.on('pointerdown', function() {
            let flag = 0;
    
            for(let substringText of textArray){
                if(substringText.x < this.width*0 + 10 || substringText.x > this.width - 100
                    || substringText.y < image.y+image.height/2 + 80 || substringText.y > image.y+image.height/2 + 200){
                    // console.log(`${substringText.text}` + " out of bound x", substringText.x, this.width*0 + 10, this.width - 100);
                    // console.log("out of bound y", substringText.y, image.y+image.height/2 + 80, image.y+image.height/2 + 200);
                    flag = 1;
                    break;
                }
            }

            if(flag === 0){
                for(let i = 0; i < textArray.length-1; i++){
                    // console.log(textArray[i].x, textArray[i+1].x);
                    if(textArray[i].x > textArray[i+1].x){
                        console.log("incorrect order");
                        flag = 1;
                        break;
                    }
                }
            }

            if(flag === 1){
                for(let substringText of textArray){
                    substringText.x = Phaser.Math.Between(this.width*0 + 20, this.width-120);
                    substringText.y = Phaser.Math.Between(image.y+image.height/2 + 200, this.height-150);
                }
                audio.play();
            }else{   
                this.correctAnswerSpelled = true;
                console.log("correct");
                image.destroy();
                inputBox.destroy();
                circle.destroy();
                button.destroy();
                audioButton.destroy();
                audioCircle.destroy();
                for (let substringText of textArray) {
                    substringText.destroy();
                }
                textArray.length = 0;
            }
        }, this);

        button.on('pointerover', function() {
            // Change the appearance of the image when the mouse hovers over it
            circle.clear(); // Clear the previous fill
            circle.fillStyle(0x00bfff, 1); // Set the hover color (red)
            circle.fillRoundedRect(button.x-15, this.height - 110, button.width*2, 50);
        }, this);

        // Add pointer out event listener
        button.on('pointerout', () => {
            // Reset the appearance of the image when the mouse moves out
            circle.clear();
            circle.fillStyle(0x3A76C1, 1); // Set the hover color (red)
            circle.fillRoundedRect(button.x-15, this.height - 110, button.width*2, 50);
        });

        audioButton.on('pointerdown', function() {
            audio.play();
        }, this);

        audioButton.on('pointerover', function() {
            // Change the appearance of the image when the mouse hovers over it
            audioCircle.clear(); // Clear the previous fill
            audioCircle.fillStyle(0x00bfff, 1); // Set the hover color (red)
            audioCircle.fillRoundedRect(audioButton.x-10, this.height - 110, audioButton.width+20, 50);
        }, this);

        // Add pointer out event listener
        audioButton.on('pointerout', () => {
            // Reset the appearance of the image when the mouse moves out
            audioCircle.clear();
            audioCircle.fillStyle(0x3A76C1, 1); // Set the hover color (red)
            audioCircle.fillRoundedRect(audioButton.x-10, this.height - 110, audioButton.width+20, 50);
        });
    }

    selectCorrectItem(){
        let audio = this.sound.add(this.itemList[this.randomIndex]["audio"]);
        audio.play();

        // Remove select index from the list
        let newIndexList = [0, 1, 2, 3, 4, 5];
        let index = newIndexList.indexOf(this.randomIndex);
        if (index > -1) { // only splice array when item is found
            newIndexList.splice(index, 1); // 2nd parameter means remove one item only
        }
        // console.log("newIndexList", newIndexList)

        // Shuffle array without the select index
        let shuffled = newIndexList.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, 3);
        // console.log("selected", selected);

        // Append select index to sub-array
        selected.push(this.randomIndex);

        const selectedShuffled = selected.sort(() => 0.5 - Math.random());
        // console.log("selectedShuffled", selectedShuffled);

        let itemText = this.add.text(this.width/2, this.height/2, `${this.itemList[this.randomIndex]["cree"]}`, {
            fontSize: '60px',
            color: '#00bfff',
        }).setOrigin(.5);

        itemText.setInteractive();

        itemText.on('pointerdown', () => {
            // Play the audio when the image is clicked
            audio.play();
        });

        itemText.on('pointerover', () => {
            // Play the audio when the image is clicked
            itemText.setFill('#00bfff');
        });

        itemText.on('pointerout', () => {
            // Reset the appearance of the image when the mouse moves out
            itemText.setFill('#000');
        });

        const imageArray = [];
        const correctAnswerArray = [];

        let row = 0;
        let column = 0;
        for(let i = 0; i < selectedShuffled.length; i++){
            if (i > 1){
                row = 1;
            }
            if (i === 0 || i === 2){
                column = this.width*0 + 100;
            }else{
                column = this.width - 100;
            }
            const image = this.add.image(column, this.height*0 + 250 + row*500, this.itemList[selectedShuffled[i]]["name"]).setOrigin(.5);
            image.setScale(0.8, 0.8);
            image.setInteractive();

            let hintX = 0;
            let hintOrigin = 0;
            image.on('pointerdown', () => {
                // Check answer when the image is clicked
                if (!(image.texture.key === this.itemList[this.randomIndex]["name"])){
                    image.setVisible(false);
                    borderGraphics.destroy();
                    
                    if (i === 0 || i === 2){
                        hintX = this.width*0 + 20;
                    }else{
                        hintX = this.width - 20;
                        hintOrigin = 1;
                    }
                    // console.log("i", i, image.texture.key, this.width, hintX);
                    let hint = this.add.text(hintX, image.y, `${this.itemList[selectedShuffled[i]]["cree"]}`, {
                        fontSize: '40px',
                        color: '#000',
                    }).setOrigin(hintOrigin, 0.5);
                    correctAnswerArray.push(hint);
                }else{
                    image.setVisible(false);
                    itemText.destroy();
                    borderGraphics.destroy();
                    for (const image of imageArray) {
                        image.destroy();
                    }
                    imageArray.length = 0;
                    for (const hint of correctAnswerArray) {
                        hint.destroy();
                    }
                    correctAnswerArray.length = 0;
                    this.correctAnswerSelected = true;
                    console.log("correct", this.correctAnswerSelected);
                }
            });

            const borderGraphics = this.add.graphics();
            image.on('pointerover', () => {
                // Change the appearance of the image when the mouse hovers over it
                const borderWidth = 2; // Adjust the border width as needed
                const borderColor = 0x00bfff; // Green border color (adjust the color as needed)
    
                borderGraphics.clear();
                borderGraphics.lineStyle(borderWidth, borderColor);
                borderGraphics.strokeRect(image.x-image.width/2, image.y-image.height/2, image.width, image.height);
            });

            // Add pointer out event listener
            image.on('pointerout', () => {
                // Reset the appearance of the image when the mouse moves out
                borderGraphics.clear();
                // Reset other properties, if changed
            });
            imageArray.push(image);
        }
    }

    preload(){
        this.sceneStopped = false

        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'FruitQuizScene'
        this.scale.lockOrientation(this.game.orientation)

        this.load.image('guide', '../assets/540x960-guide.png')
        this.load.image('greenBG', this.imagePath + 'greenBG.png')
        this.load.image('apple', this.imagePath + 'apple.png');
        this.load.image('orange', this.imagePath + 'orange.png');
        this.load.image('watermelon', this.imagePath + 'watermelon.png')
        this.load.image('pear', this.imagePath + 'pear.png')
        this.load.image('peach', this.imagePath + 'peach.png')
        this.load.image('potato', this.imagePath + 'potato.png')
        this.load.image('carrot', this.imagePath + 'carrot copy.png')

        this.load.audio('apple_wav', this.audioPath + 'apple.wav');
        this.load.audio('orange_wav', this.audioPath + 'orange.wav');
        this.load.audio('watermelon_wav', this.audioPath + 'watermelon.wav');
        this.load.audio('pear_wav', this.audioPath + 'pear.wav');
        this.load.audio('peach_wav', this.audioPath + 'peach.wav');
        this.load.audio('potato_wav', this.audioPath + 'potato.wav');
        this.load.audio('carrot_wav', this.audioPath + 'carrot.wav');
    }

    create(){
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this);

        this.cameras.main.setBackgroundColor('#FFF')
        this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)

        // this.add.image(width, 300, 'greenBG');
        this.addImage('apple');
        this.addImage('orange');
        this.addImage('watermelon');
        this.addImage('pear');
        this.addImage('peach');
        this.addImage('potato');
        this.addImage('carrot');

        this.countText = this.add.text(20, 20, `${this.numItemCompleted}/${this.numItemTotal}`, {
            fontSize: '25px',
            color: '#000000',
        });
    }

    update(){
        if(this.numItemCompleted <= this.numItemTotal){
            this.countText.setText(`${this.numItemCompleted}/${this.numItemTotal}`);
        }

        if(this.indexNotPickedYet.length === 0 && this.indexNotSpelledYet.length === 0 && this.quizSelected === false){
            console.log("DONE.")
        }else{
            if(this.quizSelected === false){
                if(this.indexNotPickedYet.length > 0 && this.indexNotSpelledYet.length > 0){
                    this.quizType = Phaser.Math.RND.pick(this.quizzes);
                    console.log("ONE")
                }else if(this.indexNotPickedYet.length > 0 && this.indexNotSpelledYet.length === 0){
                    this.quizType = 0;
                    console.log("TWO")
                }else if(this.indexNotPickedYet.length === 0 && this.indexNotSpelledYet.length > 0){
                    this.quizType = 1;
                    console.log("THREE")
                }
                console.log("quizType", this.quizType, "indexNotPickedYet", this.indexNotPickedYet, "indexNotSpelledYet", this.indexNotSpelledYet);
                this.quizSelected = true;
            }
        }
        
        if(this.quizType === 0){
            // if(this.indexNotPickedYet.length > 0){
                if (this.randomIndexPicked === false && this.correctAnswerSelected === false){
                    this.pickRandomItem();
                    this.selectCorrectItem();
                    // console.log("randomIndexPicked", this.randomIndexPicked, "correctAnswerSelected", this.correctAnswerSelected);
                }
                if (this.randomIndexPicked === true && this.correctAnswerSelected === true && this.indexNotPickedYet.length > 0){
                    this.randomIndexPicked = false;
                    this.correctAnswerSelected = false;
                    this.numItemCompleted++;
                    this.quizSelected = false;
                    // this.time.delayedCall(2000, this.showItem(this.quizType), [], this);
                }else if(this.randomIndexPicked === true && this.correctAnswerSelected === true){
                    this.numItemCompleted++;
                    this.quizSelected = false;
                }
            // }

        }else{
            // if(this.indexNotSpelledYet.length > 0){
                if (this.spellIndexPicked === false && this.correctAnswerSpelled === false){
                    this.pickSpellItem();
                    this.spellItem();
                    // console.log("spellIndexPicked", this.spellIndexPicked, "correctAnswerSpelled", this.correctAnswerSpelled);
                }
                if (this.spellIndexPicked === true && this.correctAnswerSpelled === true && this.indexNotSpelledYet.length > 0){
                    this.spellIndexPicked = false;
                    this.correctAnswerSpelled = false;
                    this.numItemCompleted++;
                    this.quizSelected = false;
                    // this.time.delayedCall(2000, this.showItem(this.quizType), [], this);
                }else if(this.spellIndexPicked === true && this.correctAnswerSpelled === true){
                    this.numItemCompleted++;
                    this.quizSelected = false;
                }
        }
    }
}