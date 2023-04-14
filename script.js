var back, ground;
var bgImg, coinImg, cloudImg, hillImg;

var mario;
var mario_run, mario_jump, mario_gone;
var ob1, ob2, ob3, ob4;

var obG, coinG, cloudG, hillG;
var start, startscreen;
var finish, gameover, endscreen;
var coin;
localStorage["hs"] = 0
var hs = localStorage["hs"]

var gameState = 0;

var score = 0;

function preload() {
  ob1 = loadImage("Img/ob1.png");
  ob2 = loadImage("Img/ob2.png");
  ob3 = loadImage("Img/ob3.png");
  ob4 = loadImage("Img/ob4.png");

  startscreen = loadImage("Img/Start.png");
  bgImg = loadImage("Img/bg.png");
  coinImg = loadImage("Img/coin.png");
  hillImg = loadImage("Img/hill.png");
  cloudImg = loadImage("Img/cloud.png");
  endscreen = loadImage("Img/Continue.png");
  
  mario_run = loadAnimation("Img/run1.png", "Img/run2.png", "Img/run3.png");
  mario_jump = loadImage("Img/jump.png");
  mario_gone = loadAnimation("Img/end.png");
}

function setup() {
  createCanvas(800, 600)

  back = createSprite(400, 280, 10, 10)

  ground = createSprite(400, 510, 900, 10)
  ground.visible = false

  start = createSprite(400, 300, 10, 10)
  start.addAnimation("dash", startscreen)

  mario = createSprite(150, 450, 10, 10);

  obG = new Group();
  coinG = new Group();
  hillG = new Group();
  cloudG = new Group();

  gameover = createSprite(400, 330, 10, 10)
  gameover.visible = false

  finish = createSprite(400, 230, 10, 10)
  finish.addAnimation("dash", endscreen)
  finish.visible = false

  back.addImage(bgImg)
  back.scale = 1.575
  back.y = 280
  mario.addAnimation("running1", mario_run)
  mario.addAnimation("gone1", mario_gone)
  mario.addAnimation("jumping1", mario_jump)
  mario.scale = 0.75
  gameover.addAnimation("gone1", mario_gone)
}

function draw() {
  background(255)

  drawSprites();

  if (gameState == 0) {
    Startscreen()
  }
  if (gameState == 1) {
    Game()
  }
  if (gameState == 2) {
    Endscreen()
  }

  fill(0)
  textSize(20)
  textAlign(LEFT)
  text("Score = " + score, 30, 45)
  text("Highscore = " + hs, 30, 77)
}

function Startscreen() {
  mario.visible = false
  
  fill(0)
  textSize(14)
  textAlign(CENTER);
  text('Click to start', 400, 360);
  
  if (mousePressedOver(start)) {
    gameState = 1
    frameCount = 0
    start.visible = false
  }
}

function Game() {
  mario.visible = true
  mario.velocityY = mario.velocityY + 0.5
  
  for (i = 0; i < coinG.length; i++) {
    if (mario.isTouching(coinG.get(i))) {
    score = score + 1;
    coinG.get(i).destroy();
    }
  }

  mario.collide(ground);
  mario.debug = false;
  if (mario.y >= 400) {
    mario.changeAnimation("running1", mario_run);
  }
  if (back.x < 250) {
    back.x = 600
  }
  if ((keyDown("up") && mario.y >= 400) || (keyDown("space") && mario.y >= 400)) {
    mario.changeAnimation("jumping1", mario_jump)
  
    mario.velocityY = -15
  }
  back.velocityX = -(3.7 + (frameCount / 4) / 100)
  if (frameCount % 140 === 0) {
    Backg();
    Obstacle();
    Coins();
  }
  if (mario.isTouching(obG) || mario.y > ground.y) {
    gameState = 2;
    mario.y = 350
    mario.velocityY =  9.5

    mario.changeAnimation("gone1", mario_gone)
  }
}

function Endscreen() {
  obG.setLifetimeEach = -1
  cloudG.setLifetimeEach = -1
  hillG.setLifetimeEach = -1
    
  obG.setVelocityEach(0, 0)
  coinG.setVelocityEach(0, 0)
  hillG.setVelocityEach(0, 0)
  cloudG.setVelocityEach(0, 0)
  back.velocityX = 0
  gameover.visible = true
  finish.visible = true
    
  fill(0)
  textSize(14)
  textAlign(CENTER);
  text('Click to start', 400, 390);

  if (mousePressedOver(gameover)) {
    Retry();
    frameCount = 0
    score = 0
  }
}

function Backg() {
  var rand = Math.round(random(1, 2))
  var ran = random(245, 100)
  if (rand === 1) {
    hill = createSprite(1000, 433, 10, 10)
    hill.velocityX = -(4 + (frameCount / 4) / 100)
    
    hill.addImage(hillImg)

    hill.scale = 3

    hill.lifetime = 700
    hill.depth = mario.depth - 1
    hillG.add(hill)
  } 
  else if (rand === 2) {
    cloud = createSprite(1150, ran, 10, 10);
    
    cloud.addImage(cloudImg);
    cloud.scale = 1.5
    
    cloud.velocityX = -(4 + (frameCount / 4) / 100)
    cloud.lifetime = 700

    cloud.depth = mario.depth - 1
    cloudG.add(cloud)
  }
}

function Obstacle() {
  ob = createSprite(850, 433, 10, 10)
  ob.depth = mario.depth - 1
  ob.lifetime = 700
  var obrand = Math.round(random(1, 4))
  if (obrand === 1) {
    ob.addImage(ob1)
    ob.scale = 0.5
    ob.setCollider("rectangle", 0, 0, 100, 100)
  } else if (obrand === 2) {
    ob.addImage(ob2)
    ob.y = ground.y - 75
    ob.scale = 0.5
    ob.setCollider("rectangle", 0, 0, 100, 200)
  } else if (obrand === 3) {
    ob.addImage(ob3)
    ob.scale = 0.5
    ob.setCollider("rectangle", 0, 0, 200, 200)

  } else if (obrand === 4) {
    ob.addImage(ob4)
    ob.y = 470
    ob.scale = 0.5
  }
  ob.velocityX = -(4 + (frameCount / 4) / 100)
  obG.add(ob)
  ob.debug = false
  ob.lifetime = 500
}

function Coins(){
  if(frameCount % 140 === 0){
    coin = createSprite(850, Math.round(random(210,260)));
    coin.velocityX = -(4 + (frameCount / 4) / 100);
    coin.lifetime = 700;
    coin.addImage(coinImg)
    coin.depth = mario.depth;
    mario.depth = mario.depth+1;
    coinG.add(coin);
  }
}

function Retry() {
  gameState = 1
  mario.x = 150
  mario.y = 350

  mario.changeAnimation("running1", mario_run)
  
  back.velocityX = -(3.7 + (frameCount / 4) / 100)
  obG.destroyEach();
  obG.setLifetimeEach = 700
  coinG.destroyEach();
  
  hillG.destroyEach();
  hillG.setLifetimeEach = 700
  cloudG.destroyEach();
  cloudG.setLifetimeEach = 700
  
  gameover.visible = false
  finish.visible = false

  if (hs < score) {
    hs = score;
  }
}