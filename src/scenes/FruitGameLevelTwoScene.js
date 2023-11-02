import * as Phaser from 'phaser';

export default class FruitGameLevelTwoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FruitGameLevelTwoScene' });

        this.minX = 50; // Minimum x-coordinate
        this.maxX = 750; // Maximum x-coordinate

        this.minV = 0.5; 
        this.maxV = 100; 

        this.audioKeys = ['apple_wav', 'orange_wav', 'watermelon_wav', 'pear_wav']; // Add more audio keys as needed
        this.platforms = null;
        this.apple = null;
        this.orange = null;
        this.watermelon = null;
        this.pear = null;
        this.freezeDuration = 2000;
        this.score = 0;
        this.canMove = true;
        this.progressBar = 0;
        this.totalScore = 200;
        this.randomKey = 'apple_wav';
        this.newItemSpawned = false;
    }

    playRandomAudio() {
        // Choose a random audio key (e.g., 'audio1', 'audio2')
        this.randomKey = Phaser.Math.RND.pick(this.audioKeys);
        console.log(this.randomKey.split("_")[0])
        // Play the selected audio
        let audio = this.sound.add(this.randomKey);
        audio.play();
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
    
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('orange', 'assets/orange.png');
        this.load.image('watermelon', 'assets/watermelon.png');
        this.load.image('pear', 'assets/pear.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('apple_wav', 'assets/sounds/apple.wav');
        this.load.audio('orange_wav', 'assets/sounds/orange.wav');
        this.load.audio('watermelon_wav', 'assets/sounds/watermelon.wav');
        this.load.audio('pear_wav', 'assets/sounds/pear.wav');
    }

    create(){

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
        this.pear = this.createItem(5, 'pear');

        // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.apple, this.platforms);
        this.physics.add.collider(this.orange, this.platforms);
        this.physics.add.collider(this.watermelon, this.platforms);
        this.physics.add.collider(this.pear, this.platforms);

        this.physics.add.collider(this.apple, this.apple);
        this.physics.add.collider(this.orange, this.orange);
        this.physics.add.collider(this.watermelon, this.watermelon);
        this.physics.add.collider(this.pear, this.pear);

        this.physics.add.collider(this.apple, this.orange);
        this.physics.add.collider(this.apple, this.watermelon);
        this.physics.add.collider(this.apple, this.pear);

        this.physics.add.collider(this.orange, this.watermelon);
        this.physics.add.collider(this.orange, this.pear);

        this.physics.add.collider(this.pear, this.watermelon);

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

        this.physics.add.collider(this.player, this.pear, function(player, item) {
            this.collectItem(player, item, "pear"); // Adjust points as needed
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
                this.spawnItem(this.pear, "pear", 5);
            },
            callbackScope: this,
        });
    }

    update(){
        this.updateProgressBarWidth(this.score);

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