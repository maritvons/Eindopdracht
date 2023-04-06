var back, ground;
var bgImg;

var mario;
var mario_run, mario_jump, mario_gone;
var ob1, ob2, ob3, ob4;

var obG;

var score = 0;

function preload() {
  ob1 = loadImage("Img/ob1.png");
  ob2 = loadImage("Img/ob2.png");
  ob3 = loadImage("Img/ob3.png");
  ob4 = loadImage("Img/ob4.png");
  
  bgImg = loadImage("Img/bg.png");
  
  mario_run = loadAnimation("Img/run1.png", "Img/run2.png", "Img/run3.png");
  mario_jump = loadImage("Img/jump.png");
  mario_gone = loadAnimation("Img/end.png");
}

function setup() {
  createCanvas(800, 600)

  back = createSprite(400, 280, 10, 10)

  ground = createSprite(400, 510, 900, 10)
  ground.visible = false

  mario = createSprite(60, 450, 10, 10);

  obG = new Group();

  back.addImage(bgImg)
  back.scale = 1.575
  back.y = 280
  mario.addAnimation("running1", mario_run)
  mario.addAnimation("gone1", mario_gone)
  mario.addAnimation("jumping1", mario_jump)
  mario.scale = 0.75
}

function draw() {
  background(255)

  drawSprites();

  mario.velocityY = mario.velocityY + 0.5

  score = Math.round(frameCount / 4)
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
  back.velocityX = -(3.7 + score / 100)
  if (frameCount % 150 === 0) {
      Obstacle();
    }

  fill(0)
  textSize(20)
  text("Score=" + score, 30, 45)
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
  ob.velocityX = -(4 + score / 100)
  obG.add(ob)
  ob.debug = false
  ob.lifetime = 500
}