var canvas, player, lava, mountain;
var ground, lowerGround, cloud, coin, sun;

var pipieImg, lavaImg, cloudImg, sunImg;
var bk_img, ground_img, player_img, groundImg;

var pipeGroup, coinGroup, cloudGroup, stairGroup;
var score = 0;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {
    bk_img = loadImage("./images/background11.png");
    player_img = loadImage("./images/player_image.png");
    cloudImg = loadImage("./images/cloud.png");
    pipeImg = loadImage("./images/pipe.png");
    lavaImg = loadImage("./images/lavaImg.png");
    coinImg = loadImage("./images/coin.png");
    groundImg = loadImage("./images/ground.jpg");
    groundImg1 = loadImage("./images/ground1.jpg");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    pipeGroup = createGroup();
    coinGroup = createGroup();
    cloudGroup = createGroup();

    player = createSprite(windowWidth / 5 - 100, windowHeight - 330, 20, 50);
    player.addImage(player_img);
    player.scale = 0.06;
    player.setCollider("rectangle", 50, -50, player.width - 650, player.height - 10);
    player.debug = true;

    ground = createSprite(width - 600, height - 60, windowWidth + 600, 20);
    ground.addImage(groundImg1);

    lowerGround = createSprite(width - 600, height - 20, windowWidth + 600, 20);
    lowerGround.addImage(groundImg);

}

function draw() {
    background(bk_img);

    if (gameState === PLAY) {
        //Giving velocity to the ground
        ground.velocityX = -5;
        lowerGround.velocityX = -5

        //Key movements
        if (keyDown("space") && player.y >= 580) {
            player.velocityY = -12
        }

        player.velocityY += 2.5;

        //Infinite ground
        if (ground.x < 500) {
            ground.x = ground.width / 2;
        }

        if (lowerGround.x < 500) {
            lowerGround.x = lowerGround.width / 2;
        }

        player.collide(ground);
        player.collide(pipeGroup);

        spawnClouds();
        creatingPipesAndCoins();

        //collision between player and obstacles
        if (pipeGroup.isTouching(player)) {
            pipeGroup.setVelocityXEach(0);
            cloudGroup.setVelocityXEach(0);
            coinGroup.setVelocityXEach(0);
            gameState = END;
        }

        if (player.overlap(coinGroup)) {
            score = score + Math.round(getFrameRate() / 60);
        }
    }
    if (gameState === END) {
        ground.velocityX = 0;
    }

    //Text score
    textSize(30);
    fill("red");
    text("Score:" + score, windowWidth - 140, 40);
    drawSprites();
}

function spawnClouds() {
    if (frameCount % 130 === 0) {
        cloud = createSprite(windowWidth + 30, 100, 100, 50);
        cloud.addImage(cloudImg);
        cloud.velocityX = -5;
        cloud.scale = 0.2;
        cloud.y = Math.round(random(50, 200));
        cloudGroup.add(cloud);
    }

}

function creatingPipesAndCoins() {
    if (frameCount % 80 === 0) {
        var pipe = createSprite(windowWidth, height - 100, 30, 100);
        pipe.addImage(pipeImg);
        pipe.scale = 0.15;
        pipe.velocityX = -8
        pipe.setCollider("rectangle", -10, 0, pipe.width - 280, pipe.height - 50);
        pipeGroup.add(pipe);
        coin = createSprite(width, windowHeight - 160, 30, 30);
        coin.addImage(coinImg);
        coin.scale = 0.06;
        coin.velocityX = -8;
        coinGroup.add(coin);
    }

    if (frameCount % 111 === 0) {
        coin1 = createSprite(width, windowHeight - 100, 30, 30);
        coin1.addImage(coinImg);
        coin1.scale = 0.06;
        coin1.velocityX = -8;
        coinGroup.add(coin1);
    }
}