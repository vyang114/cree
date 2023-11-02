import * as Phaser from 'phaser';
export default class MoneyGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MoneyGameScene' });

        this.audioPath = "../assets/sounds/";
        this.imagePath = "../assets/";

        this.minX = 50; // Minimum x-coordinate
        this.maxX = 750; // Maximum x-coordinate

        this.minV = 0.5; 
        this.maxV = 100; 

        this.audioKeys = ['oneDollar_wav', 'twoDollars_wav', 'threeDollars_wav']; // Add more audio keys as needed
        this.advancedAudioKeys = ['oneDollar_wav', 'twoDollars_wav', 'threeDollars_wav', 'fourDollars_wav']; 
        this.itemList = ['apple', 'orange', 'watermelon', 'pear', 'cheese']
        this.randomItemKey = 'apple';
        this.randomItem = null;
        this.apple = null;
        this.freezeDuration = 2000;
        this.score = 0;
        this.canMove = true;
        this.hint = null;
        this.progressBar = 0;
        this.totalScore = 200;
        this.randomKey = 'oneDollar_wav';
        this.showHint = true;
        this.newAmountSpawned = false;
        this.selectedAmount = [];
        this.currentAmount = 0;
        this.selectedAmountText = null;
        this.audioPlayed = false;
        this.cointEffectPlayed = false;

        this.amount = {
            "oneDollar": "1",
            "twoDollars": "2",
            "threeDollars": "3",
            "fourDollars": "4",
            "fiveDollars": "5",
            "sixDollars": "6",
            "sevenDollars": "7",
            "eightDollars": "8",
            "nineDollars": "9",
            "twentyDollars": "20", 
            "fiftyDollars": "50",
            "oneHundredDollars": "100"
        }

        this.amountToItem = {
            "oneDollar": "cheese",
            "twoDollars": "apple",
            "threeDollars": "orange",
            "fourDollars": "pear",
            "fiveDollars": "watermelon",
            "sixDollars": "6",
            "sevenDollars": "7",
            "eightDollars": "8",
            "nineDollars": "9",
            "twentyDollars": "20", 
            "fiftyDollars": "50",
            "oneHundredDollars": "100"
        }

        this.amountToInt = {
            "oneDollar": 1,
            "twoDollars": 2,
            "threeDollars": 3,
            "fourDollars": 4,
            "fiveDollars": 5,
            "sixDollars": 6,
            "sevenDollars": 7,
            "eightDollars": 8,
            "nineDollars": 9,
            "twentyDollars": 20, 
            "fiftyDollars": 50,
            "oneHundredDollars": 100
        }
    }

    playRandomAudio() {
        // Choose a random audio key (e.g., 'audio1', 'audio2')
        if (this.score >= 260){
            this.randomKey = Phaser.Math.RND.pick(this.advancedAudioKeys);
            console.log(this.randomKey.split("_")[0])
            // Play the selected audio
            let audio = this.sound.add(this.randomKey);
            audio.play();
        }else{
            this.randomKey = Phaser.Math.RND.pick(this.audioKeys);
            // console.log(this.randomKey.split("_")[0])
            // Play the selected audio
            let audio = this.sound.add(this.randomKey);
            audio.play();
        }
        // this.hint.setText("$ " + this.amount[this.randomKey.split("_")[0]]);
    }

    selectRandomItem() {
        this.randomItem.setTexture(this.amountToItem[this.randomKey.split("_")[0]]);
    }

    resetSelectedAmount() {
        this.selectedAmount = [];
        this.currentAmount = 0;
        this.selectedAmountText.setText(`$ 0`);
        this.audioPlayed = false;
        this.cointEffectPlayed = false;
        // console.log("reset", this.selectedAmount, "currentAmount", this.currentAmount)
    }

    createMoney(posX, posY, scale, angle, itemName) {
        let item = this.add.image(posX, posY, itemName);
        item.setScale(scale, scale);
        item.setAngle(angle);

        item.setInteractive();
        item.on('pointerover', () => {
            // Adjust the Y position when the mouse hovers over the item
            item.y -= 10; // Move 10 pixels up (adjust as needed)
        });

        // Add an event to reset the Y position when the mouse moves away
        item.on('pointerout', () => {
            // Reset the Y position to its original value
            item.y = 530; // Adjust to the original Y position
        });

        item.on('pointerdown', () => {
            this.selectedAmount.push(this.amountToInt[itemName]);
            this.currentAmount = this.selectedAmount.reduce((partialSum, a) => partialSum + a, 0);
            // console.log("selected amount ", this.selectedAmount, " current ", this.currentAmount)
        });

        return item;
    }

    spawnItem(itemGroup, itemName, minItemCount) {
        
        var currentItemCount = itemGroup.getTotalUsed();
    
        // Calculate the number of items needed to reach the minimum count
        var itemsNeeded = minItemCount - currentItemCount;
        
        if (itemsNeeded > 0) {
            // Spawn the required number of items
            for (var i = 0; i < itemsNeeded; i++) {
                // Generate random x and y positions for the item
                var randomX = Phaser.Math.Between(this.minX, this.maxX); // Adjust the range as needed
                var randomY = 0 // Adjust the range as needed
    
                // Create and position the item at the random x and y coordinates
                var item = itemGroup.create(randomX, randomY, itemName); // Replace 'item' with your asset key
                item.setScale(0.2);
                item.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
                item.setVelocity(0, Phaser.Math.FloatBetween(this.minV, this.maxV));
            }
        }
    }

    createItem(itemName, itemCount){
        var itemGroup = this.physics.add.group();
        for (var i = 0; i < itemCount; i++) {
            var item = this.physics.add.sprite(Phaser.Math.Between(100, 700), 100, itemName);
            itemGroup.add(item);
        }
        return itemGroup;
    };

    drawProgressBar(x, y, width, height) {
        // Draw a rectangle
        this.progressBar.fillRect(x, y, width, height);
    }

    updateProgressBarWidth(newWidth) {
        // Clear the existing graphics
        this.progressBar.clear();

        // Redraw the rectangle with the updated width
        this.progressBar.fillStyle(0x000000);
        this.drawProgressBar(20, 20, newWidth, 20); // Updated width
    }

    setHint(score) {
        if(score > 500){
            this.showHint = false;
        }else{
            this.showHint = true;
        }
        // Set the visibility of the image based on the condition
        this.hint.setText(this.showHint);
        // console.log("showHint", this.showHint)
    }

    createAdvancedItemGroup(itemName, itemCount) {
        let itemGroup = this.physics.add.group();
        for (var i = 0; i < itemCount; i++) {
            var item = this.physics.add.sprite(Phaser.Math.Between(100, 700), 100, itemName);
            itemGroup.add(item);
        }
        this.physics.add.collider(itemGroup, this.platforms);
        this.physics.add.collider(itemGroup, itemGroup);
        this.physics.add.collider(itemGroup, this.apple);
        this.physics.add.collider(itemGroup, this.orange);
        this.physics.add.collider(itemGroup, this.watermelon);
        this.physics.add.collider(this.player, itemGroup, function(player, item) {
            this.collectItem(player, item, "pear");
        }, null, this);

        return itemGroup;
    }
    
    preload(){
        this.load.image('sky', this.imagePath + 'sky.png');
        this.load.image('greenBG', this.imagePath + 'greenBG.png');
        this.load.image('star', this.imagePath + 'star.png');
        this.load.image('ground', this.imagePath + 'platform.png');
        this.load.image('apple', this.imagePath + 'apple.png');
        this.load.image('orange', this.imagePath + 'orange.png');
        this.load.image('watermelon', this.imagePath + 'watermelon.png');
        this.load.image('pear', this.imagePath + 'pear.png');
        this.load.image('cheese', this.imagePath + 'cheese.png');
        this.load.image('oneDollar', this.imagePath + 'oneDollar.png');
        this.load.image('twoDollars', this.imagePath + 'twoDollars.png');
        this.load.image('fiveDollars', this.imagePath + 'fiveDollars.png');
        this.load.image('twentyDollars', this.imagePath + 'twentyDollars.png');
        // this.load.spritesheet('dude', this.imagePath + 'dude.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('oneDollar', this.imagePath + 'flashcards/oneDollar.jpg');
        this.load.image('twoDollars', this.imagePath + 'flashcards/twoDollars.png');
        this.load.image('threeDollars', this.imagePath + 'flashcards/threeDollars.png');
        this.load.image('fourDollars', this.imagePath + 'flashcards/fourDollars.png');
        
        this.load.audio('oneDollar_wav', this.audioPath + 'one dollar.wav');
        this.load.audio('twoDollars_wav', this.audioPath + 'two dollars.wav');
        this.load.audio('threeDollars_wav', this.audioPath + 'three dollars.wav');
        this.load.audio('fourDollars_wav', this.audioPath + 'four dollars.wav');
        this.load.audio('fiveDollars_wav', this.audioPath + 'five dollars.wav');
        this.load.audio('sixDollars_wav', this.audioPath + 'six dollars.wav');
        this.load.audio('sevenDollars_wav', this.audioPath + 'seven dollars.wav');
        this.load.audio('eightDollars_wav', this.audioPath + 'eight dollars.wav');
        this.load.audio('nineDollars_wav', this.audioPath + 'nine dollars.wav');
        this.load.audio('twentyDollars_wav', this.audioPath + 'twenty dollars.wav');
        this.load.audio('fiftyDollars_wav', this.audioPath + 'fifty dollars.wav');
        this.load.audio('oneHundredDollars_wav', this.audioPath + 'one hundred dollars.wav');
        this.load.audio('coinEffect_wav', this.audioPath + 'coinEffect.wav');
    }

    create(){

        this.add.image(400, 300, 'greenBG');

        this.cointEffect = this.sound.add("coinEffect_wav");

        var progressBarBorder = this.add.graphics();
        progressBarBorder.lineStyle(1, 0x000000);
        progressBarBorder.strokeRect(20, 20, 735, 20); 

        this.progressBar = this.add.graphics();
        // Set the line style (stroke color and width)
        this.progressBar.fillStyle(0x000000); // 2-pixel wide red lines
        // Draw a rectangle
        this.progressBar.fillRect(20, 20, 0, 20); 

        var star = this.add.image(760, 30, "star");
        star.setScale(1.5, 1.5)

        var firstStar = this.add.image(250, 30, "star");
        firstStar.setScale(1.5, 1.5)

        var secondStar = this.add.image(500, 30, "star");
        secondStar.setScale(1.5, 1.5)

        // this.player = this.physics.add.sprite(100, 450, 'dude');

        let counter = this.add.graphics();
        counter.fillStyle(0x3A76C1, 1);
        counter.fillRect(0, 420, 800, 200);

        counter.fillStyle(0x1E496D, 1);
        counter.fillRect(0, 450, 800, 10);

        // Create a TileSprite for the conveyor belt
        //  const conveyorBelt = this.add.tileSprite(400, 300, 800, 100, 'apple'); // Adjust the size and position as needed
        // Create a Graphics object to draw the conveyor belt
        const conveyorBelt = this.add.graphics();

        conveyorBelt.fillStyle(0x333333);
        // conveyorBelt.fillRect(800, 350, 800, 70);
        conveyorBelt.fillRect(0, 350, 800, 70);

        this.randomItem = this.add.image(1000, 320, this.randomItemKey);
        this.randomItem.setScale(0.5, 0.5);

        this.time.delayedCall(0, () => {
            //  Create a scrolling effect by moving the tile sprite to the left
            this.tweens.add({
                targets: this.randomItem,
                x: -100, // Move to the left
                duration: 6000, // Time it takes to cross the screen
                repeat: -1, // Infinite repeat
                onUpdate: () => {
                    // Check if the object is at X = 800
                    if (Math.abs(this.randomItem.x - 850) < 2 && this.audioPlayed === false) {
                        // Play the audio when the object reaches X = 800
                        this.playRandomAudio();
                        this.audioPlayed = true;
                    }

                    if (Math.abs(this.randomItem.x - 990) < 2) {
                        // Play the audio when the object reaches X = 800
                        this.selectRandomItem();
                        this.resetSelectedAmount();
                    }
                },
            });
        });

         // Create a Graphics object for drawing the cash register
        const registrar = this.add.graphics();
        registrar.fillStyle(0x808080, 1);
        registrar.fillRect(90, 240, 140, 70);
        registrar.fillRect(120, 300, 15, 70);

        registrar.beginPath();
        // Move to the first point
        registrar.moveTo(80, 370);

        // Draw lines to the other points to complete the polygon
        registrar.lineTo(250, 370);
        registrar.lineTo(290, 400);
        registrar.lineTo(110, 400);
        // Close the path to complete the shape
        registrar.closePath();
        // Fill the polygon with the specified color
        registrar.fillPath();

        registrar.fillStyle(0x606060, 1);
        registrar.beginPath();
        registrar.lineTo(80, 370);
        registrar.lineTo(80, 430);
        registrar.lineTo(110, 460);
        registrar.lineTo(110, 400);
        registrar.closePath();
        registrar.fillPath();

        registrar.fillStyle(0x707070, 1);
        registrar.beginPath();
        registrar.lineTo(110, 400);
        registrar.lineTo(290, 400);
        registrar.lineTo(290, 460);
        registrar.lineTo(110, 460);
        registrar.closePath();
        registrar.fillPath();

        registrar.fillStyle(0xffff00, 1); // Yellow fill
        // Draw the circle
        registrar.fillCircle(200, 440, 10); // (x, y, radius)
        // End drawing
        registrar.closePath();

        const moinitor = this.add.graphics();
        // Draw the display screen
        moinitor.fillStyle(0x00ff00, 1); // Green color
        moinitor.fillRect(100, 250, 120, 50); // x, y, width, height
        this.hint = this.add.text(120, 260, `Cree`, {
            fontSize: '30px',
            color: '#000000',
        });

        this.selectedAmountText = this.add.text(350, 420, `$ ${this.currentAmount}`, {
            fontSize: '30px',
            color: '#ffffff',
        });

        let oneDollar = this.createMoney(100, 530, 0.4, 0, "oneDollar");
        let twoDollars = this.createMoney(250, 530, 0.4, 0, "twoDollars");
        let fiveDollars = this.createMoney(400, 530, 0.20, -45, "fiveDollars");
        let twentyDollars = this.createMoney(550, 530, 0.20, -45, "twentyDollars");
        
        // oneDollar.setScale(0.5, 0.5);

        // oneDollar.setInteractive();
        // oneDollar.on('pointerover', () => {
        //     // Adjust the Y position when the mouse hovers over the item
        //     oneDollar.y -= 10; // Move 10 pixels up (adjust as needed)
        // });

        // // Add an event to reset the Y position when the mouse moves away
        // oneDollar.on('pointerout', () => {
        //     // Reset the Y position to its original value
        //     oneDollar.y = 530; // Adjust to the original Y position
        // });

        // oneDollar.on('pointerdown', () => {
        //     this.selectedAmount.push(this.amountToInt["oneDollar"]);
        //     this.currentAmount = this.selectedAmount.reduce((partialSum, a) => partialSum + a, 0);
        //     console.log("selected amount ", this.selectedAmount, " current ", this.currentAmount)
        // });

        //  // Set line style (color, width, alpha, etc.)
        //  graphics.lineStyle(2, 0x000000, 1); // Black outline
 
        //  // Draw the main body of the cash register
        //  graphics.fillRect(100, 100, 200, 150); // x, y, width, height
 
        //  // Draw the cash drawer
        //  graphics.fillRect(120, 250, 160, 20); // x, y, width, height
 
        //  // Draw buttons
        //  for (let i = 0; i < 4; i++) {
        //      graphics.fillStyle(0x00ff00, 1); // Green color
        //      graphics.fillRect(120 + i * 40, 120, 30, 30); // x, y, width, height
        //  }
         
        // var timerEvent = this.time.addEvent({
        //     delay: 5000,
        //     loop: true,
        //     callback: function(){
        //         this.playRandomAudio();
        //         this.selectRandomItem();
        //         this.resetSelectedAmount();
        //     },
        //     callbackScope: this
        // });

        // Start a timer to spawn items periodically
        // var spawnEvent = this.time.addEvent({
        //     delay: 1000, // Delay in milliseconds (e.g., spawn every second)
        //     loop: true,
        //     callback: function() {
        //         this.spawnItem(this.apple, "apple", 5);
        //         this.spawnItem(this.orange, "orange", 5);
        //         this.spawnItem(this.watermelon, "watermelon", 5);
        //     },
        //     callbackScope: this,
        // });
    }

    update(){
        this.selectedAmountText.setText(`Selected $ ${this.currentAmount}`);
        this.hint.setText("$ " + this.amount[this.randomKey.split("_")[0]]);
        this.randomItem.setTexture(this.amountToItem[this.randomKey.split("_")[0]]);
        this.updateProgressBarWidth(this.score);

        // console.log(this.randomItem.x);

        if(this.currentAmount === this.amountToInt[this.randomKey.split("_")[0]] && this.cointEffectPlayed === false){
            this.cointEffect.play();
            this.cointEffectPlayed = true;
            this.score += 20;
        }
        // console.log("this.cointEffectPlayed ", this.cointEffectPlayed, " currentAmount ", this.currentAmount);
        console.log(this.randomKey, this.amount[this.randomKey.split("_")[0]], this.amountToItem[this.randomKey.split("_")[0]]);
    }

}