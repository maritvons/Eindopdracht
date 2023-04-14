var back, ground;
var bgImg, coinImg, cloudImg, hillImg;

var mario;
var mario_run, mario_jump, mario_gone;
var luigi;
var luigi_run, luigi_jump, luigi_gone;
var ob1, ob2, ob3, ob4;
var character;

var obG, coinG, cloudG, hillG;
var start, startscreen;
var finish, gameover, endscreen;
var coin;
localStorage["hs"] = 0
var hs = localStorage["hs"]

var run, speed, game, collect;

var gameState = 0;

var score = 0;

function preload() {
  ob1 = loadImage("Img/ob1.png");
  ob2 = loadImage("Img/ob2.png");
  ob3 = loadImage("Img/ob3.png");
  ob4 = loadImage("Img/ob4.png");

  startscreen = loadImage("Img/Start.png");
  players = loadImage("Img/mario:luigi.png");
  bgImg = loadImage("Img/bg.png");
  coinImg = loadImage("Img/coin.png");
  hillImg = loadImage("Img/hill.png");
  cloudImg = loadImage("Img/cloud.png");
  endscreen = loadImage("Img/Continue.png");

  run = loadSound("Sound/run.mp3")
  speed = loadSound("Sound/speed.mp3")
  game = loadSound("Sound/game.mp3")
  collect = loadSound("Sound/collect.mp3")

  mario_run = loadAnimation("Img/run1.png", "Img/run2.png", "Img/run3.png");
  mario_jump = loadImage("Img/jump.png");
  mario_gone = loadAnimation("Img/end.png");

  luigi_run = loadAnimation("Img/luigi_run1.png", "Img/luigi_run2.png", "Img/luigi_run3.png");
  luigi_jump = loadImage("Img/luigi_jump.png");
  luigi_gone = loadAnimation("Img/luigi_end.png");
}

function setup() {
  createCanvas(800, 600)

  back = createSprite(400, 280, 10, 10)

  ground = createSprite(400, 510, 900, 10)
  ground.visible = false

  start = createSprite(400, 300, 10, 10)
  start.addAnimation("dash", startscreen)

  player = createSprite(400, 300, 10, 10)
  player.addAnimation("dash", players)
  player.scale = 0.6
  player.visible = false
  
  obG = new Group();
  coinG = new Group();
  hillG = new Group();
  cloudG = new Group();

  m_gameover = createSprite(400, 330, 10, 10)
  m_gameover.visible = false
  l_gameover = createSprite(400, 330, 10, 10)
  l_gameover.visible = false

  finish = createSprite(400, 230, 10, 10)
  finish.addAnimation("dash", endscreen)
  finish.visible = false

  back.addImage(bgImg)
  back.scale = 1.575
  back.y = 280

    mario = createSprite(150, 450, 10, 10);
    mario.addAnimation("running1", mario_run)
    mario.addAnimation("gone1", mario_gone)
    mario.addAnimation("jumping1", mario_jump)
    mario.scale = 0.75
    m_gameover.addAnimation("gone1", mario_gone)

    luigi = createSprite(150, 450, 10, 10);
    luigi.addAnimation("running2", luigi_run)
    luigi.addAnimation("gone2", luigi_gone)
    luigi.addAnimation("jumping2", luigi_jump)
    luigi.scale = 0.75
    l_gameover.addAnimation("gone2", luigi_gone)
}

function draw() {
  background(255)

  drawSprites();

  if (gameState === 0) {
    Startscreen()
  }
  if (gameState === 1) {
    Character()
  }
  if (gameState === 2) {
    Game()
  }
  if (gameState === 3) {
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
  luigi.visible = false
  
  fill(0)
  textSize(14)
  textAlign(CENTER);
  text('Click to start', 400, 360);
  
  if (mousePressedOver(start)) {
    gameState = 1
  }
}

function Character() {
  start.visible = false
  player.visible = true
    
  fill(0)
  textSize(50)
  textAlign(CENTER)
  text("Choose character:" , 400, 200) 
  textSize(16)
  text("Press 'M' for Mario or press 'L' for Luigi", 400, 235)
  
  keyPressed()
}

function Game() {
  back.velocityX = -(3.7 + (frameCount / 4) / 100)
  if (frameCount % 140 === 0) {
    Backg();
    Obstacle();
    Coins();
  }
  if (frameCount === 2000) {
    run.stop();
    speed.play();
    speed.loop();
  }
  
  if (character === 1) {
    mario.visible = true
    mario.velocityY = mario.velocityY + 0.5
    
    for (i = 0; i < coinG.length; i++) {
      if (mario.isTouching(coinG.get(i))) {
      score = score + 1;
      collect.play()
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
    if (mario.isTouching(obG) || mario.y > ground.y) {
      gameState = 3;
      mario.y = 350
      mario.velocityY =  9.5
  
      mario.changeAnimation("gone1", mario_gone)
      game.play();
    }
  }
  
  if (character === 2) {
    luigi.visible = true
    luigi.velocityY = luigi.velocityY + 0.5
    
    for (i = 0; i < coinG.length; i++) {
      if (luigi.isTouching(coinG.get(i))) {
      score = score + 1;
      collect.play()
      coinG.get(i).destroy();
      }
    }
  
    luigi.collide(ground);
    luigi.debug = false;
    if (luigi.y >= 400) {
      luigi.changeAnimation("running2", luigi_run);
    }
    if (back.x < 250) {
      back.x = 600
    }
    if ((keyDown("up") && luigi.y >= 400) || (keyDown("space") && luigi.y >= 400)) {
      luigi.changeAnimation("jumping2", luigi_jump)
    
      luigi.velocityY = -15
    }
    if (luigi.isTouching(obG) || luigi.y > ground.y) {
      gameState = 3;
      luigi.y = 350
      luigi.velocityY =  9.5
  
      luigi.changeAnimation("gone2", luigi_gone)
      game.play();
    }
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
  finish.visible = true

  run.stop();
  speed.stop();
  
  if (character === 1) {
    m_gameover.visible = true
    
    fill(0)
    textSize(14)
    textAlign(CENTER);
    text('Click on Mario to start', 400, 380);

    if (mousePressedOver(m_gameover)) {
      finish.visible = false
      run.play()
      Retry();
      frameCount = 0
      score = 0
    }
  }
  if (character === 2) {
    l_gameover.visible = true

    fill(0)
    textSize(14)
    textAlign(CENTER);
    text('Click on Luigi to start', 400, 380);

    if (mousePressedOver(l_gameover)) {
      finish.visible = false
      run.play()
      Retry();
      frameCount = 0
      score = 0
    }
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
  gameState = 2
  run.play()
  
  if (character === 1) {
    mario.x = 150
    mario.y = 350
    mario.changeAnimation("running1", mario_run)
    m_gameover.visible = false
  }
  if (character === 2) {
    luigi.x = 150
    luigi.y = 350
    luigi.changeAnimation("running2", luigi_run)
    l_gameover.visible = false
  }
  
  back.velocityX = -(3.7 + (frameCount / 4) / 100)
  obG.destroyEach();
  obG.setLifetimeEach = 700
  coinG.destroyEach();
  
  hillG.destroyEach();
  hillG.setLifetimeEach = 700
  cloudG.destroyEach();
  cloudG.setLifetimeEach = 700

  if (hs < score) {
    hs = score;
  }
}

function keyPressed() {
  if (key === 'm') {
    character = 1;
    gameState = 2;
    run.play()
    player.visible = false
  }
  if (key === 'l') {
    character = 2;
    gameState = 2;
    run.play()
    player.visible = false
  }
}