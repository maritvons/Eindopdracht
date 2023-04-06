var back, ground;
var bI1

function preload() {
  bI1 = loadImage("Img/bg.png")
}

function setup() {
  createCanvas(800, 600)

  back = createSprite(400, 280, 10, 10)

  ground = createSprite(400, 510, 900, 10)
  ground.visible = false
}

function draw() {
  background(255)
  image(bI1, 0, 0);
}