import * as Phaser from 'phaser';
export default class FruitGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FruitGameScene' });

        this.audioPath = "../assets/sounds/";
        this.imagePath = "../assets/";

        this.minX = 50; // Minimum x-coordinate
        this.maxX = 750; // Maximum x-coordinate

        this.minV = 0.5; 
        this.maxV = 100; 

        this.audioKeys = ['apple_wav', 'orange_wav', 'watermelon_wav']; // Add more audio keys as needed
        this.advancedAudioKeys = ['apple_wav', 'orange_wav', 'watermelon_wav', 'pear_wav']; 
        this.platforms = null;
        this.apple = null;
        this.orange = null;
        this.watermelon = null;
        this.pear = null;
        this.freezeDuration = 2000;
        this.score = 0;
        this.canMove = true;
        this.hint = null;
        this.progressBar = 0;
        this.totalScore = 200;
        this.randomKey = 'apple_wav';
        this.showHint = true;
        this.newItemSpawned = false;
    }

    playRandomAudio() {
        // Choose a random audio key (e.g., 'audio1', 'audio2')
        if (this.score >= 10){
            this.randomKey = Phaser.Math.RND.pick(this.advancedAudioKeys);
            console.log(this.randomKey.split("_")[0])
            // Play the selected audio
            let audio = this.sound.add(this.randomKey);
            audio.play();
        }else{
            this.randomKey = Phaser.Math.RND.pick(this.audioKeys);
            console.log(this.randomKey.split("_")[0])
            // Play the selected audio
            let audio = this.sound.add(this.randomKey);
            audio.play();
        }
        this.hint.setTexture(this.randomKey.split("_")[0]);
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

    unfreezePlayer() {
        // Unfreeze the player after the specified duration
        this.canMove = true; // Enable player movement and control
    }

    createPlatform(x, y, width, height) {
        // Create a platform sprite with specified size
        var platform = this.platforms.create(x, y, 'ground'); // Replace 'ground' with your asset key
        platform.setDisplaySize(width, height); // Set the width and height
        platform.refreshBody(); // Refresh the body to apply changes
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
        this.hint.setVisible(this.showHint);
        // console.log("showHint", this.showHint)
    }

    createAdvancedItemGroup(itemName, itemCount) {
        console.log("Pear", this.newItemSpawned)
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
        this.load.image('star', this.imagePath + 'star.png');
        this.load.image('ground', this.imagePath + 'platform.png');
        this.load.image('apple', this.imagePath + 'apple.png');
        this.load.image('orange', this.imagePath + 'orange.png');
        this.load.image('watermelon', this.imagePath + 'watermelon.png');
        this.load.image('pear', this.imagePath + 'pear.png');
        this.load.image('bomb', this.imagePath + 'bomb.png');
        this.load.spritesheet('dude', this.imagePath + 'dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('apple_wav', this.audioPath + 'apple.wav');
        this.load.audio('orange_wav', this.audioPath + 'orange.wav');
        this.load.audio('watermelon_wav', this.audioPath + 'watermelon.wav');
        this.load.audio('pear_wav', this.audioPath + 'pear.wav');
    }

    create(){
        console.log("showHint", this.showHint)

        this.collectItem = function (player, item, itemName){
            item.disableBody(true, true);
            if (this.randomKey.includes(itemName)){
                this.score += 10;
                // this.scoreText.setText('Score: ' + score);
            }else{
                this.canMove = false;
                this.time.delayedCall(this.freezeDuration, this.unfreezePlayer, [], this);
            }
        };

        this.add.image(400, 300, 'sky');
    
        this.hint = this.add.image(380, 570, this.randomKey.split("_")[0]);
        this.hint.setDepth(1);
        this.hint.setScale(0.25, 0.25);

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

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.createPlatform(600, 380, 100, 10);
        this.createPlatform(300, 450, 100, 10);
        this.createPlatform(420, 300, 100, 10);
        this.createPlatform(100, 250, 100, 10);
        this.createPlatform(0, 380, 50, 10);
        this.createPlatform(750, 230, 100, 10);
        this.createPlatform(780, 450, 50, 10);
        this.createPlatform(180, 360, 100, 10);
        this.createPlatform(50, 500, 60, 10);
        // this.createPlatform(320, 100, 100, 20);

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.apple = this.createItem(5, 'apple');
        this.orange = this.createItem(5, 'orange');
        this.watermelon = this.createItem(5, 'watermelon');

        // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.apple, this.platforms);
        this.physics.add.collider(this.orange, this.platforms);
        this.physics.add.collider(this.watermelon, this.platforms);

        this.physics.add.collider(this.apple, this.apple);
        this.physics.add.collider(this.orange, this.orange);
        this.physics.add.collider(this.watermelon, this.watermelon);

        this.physics.add.collider(this.apple, this.orange);
        this.physics.add.collider(this.apple, this.watermelon);

        this.physics.add.collider(this.orange, this.watermelon);

        // this.physics.add.overlap(this.player, this.apple, this.collectStar, null, this);
         // Set up collision detection
        this.physics.add.collider(this.player, this.apple, function(player, item) {
            this.collectItem(player, item, "apple"); // Adjust points as needed
        }, null, this);

        this.physics.add.collider(this.player, this.orange, function(player, item) {
            this.collectItem(player, item, "orange"); // Adjust points as needed
        }, null, this);

        this.physics.add.collider(this.player, this.watermelon, function(player, item) {
            this.collectItem(player, item, "watermelon"); // Adjust points as needed
        }, null, this);

        var timerEvent = this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: this.playRandomAudio,
            callbackScope: this
        });

        // Start a timer to spawn items periodically
        var spawnEvent = this.time.addEvent({
            delay: 1000, // Delay in milliseconds (e.g., spawn every second)
            loop: true,
            callback: function() {
                this.spawnItem(this.apple, "apple", 5);
                this.spawnItem(this.orange, "orange", 5);
                this.spawnItem(this.watermelon, "watermelon", 5);
            },
            callbackScope: this,
        });
    }

    update(){
        this.updateProgressBarWidth(this.score);
        this.setHint(this.score);

        if (this.score >= 10 && this.newItemSpawned === false) {
            this.pear  = this.createAdvancedItemGroup(5, 'pear');
            this.newItemSpawned = true;
        }

        if (this.newItemSpawned === true){
            let currentItemCount = this.pear.getTotalUsed();
            let itemsNeeded = 5 - currentItemCount;
        
            if (itemsNeeded > 0) {
                // Spawn the required number of items
                for (let i = 0; i < itemsNeeded; i++) {
                    // Generate random x and y positions for the item
                    var randomX = Phaser.Math.Between(this.minX, this.maxX); // Adjust the range as needed
                    var randomY = 0 // Adjust the range as needed
        
                    // Create and position the item at the random x and y coordinates
                    let item = this.pear.create(randomX, randomY, "pear"); // Replace 'item' with your asset key
                    item.setScale(0.2);
                    item.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
                    item.setVelocity(0, Phaser.Math.FloatBetween(this.minV, this.maxV));
                }
            }
        }

        if(this.canMove === true){
            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-160);

                this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(160);

                this.player.anims.play('right', true);
            }
            else
            {
                this.player.setVelocityX(0);

                this.player.anims.play('turn');
            }

            if (this.cursors.up.isDown && this.player.body.touching.down)
            {
                this.player.setVelocityY(-310);
            }
        }else{
            this.player.setVelocity(0);
        }
    }

}