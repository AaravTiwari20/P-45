var fighterplane,fighterplaneimage,asteroid,asteroidimage,space,spaceimage,alien,alienimage;
var restart,restartimage,fighterplanecrashedimage,missile,missileimage;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var score = 0;
var restart,restartimage;
function preload(){
spaceimage = loadImage("space.png");
fighterplaneimage = loadImage("plane.png");
asteroidimage = loadImage("asteroid.png");
alienimage = loadImage("alien.png");
missileimage = loadImage("missile.png");
fighterplanecrashedimage = loadImage("figterplanecrashedimage.png");
restartimage = loadImage ("restart.png");
}
function setup() {
  createCanvas(1000,600);
  space=createSprite(0,0,800,400);
  space.addImage(spaceimage);
  space.scale=1.5;
  space.velocityX=-4;
  fighterplane=createSprite(100,200);
  fighterplane.addImage(fighterplaneimage);
  fighterplane.scale=0.5;
  restart = createSprite(500,300);
  restart.addImage(restartimage);

  

 alienGroup = new Group();
 asteroidsGroup = new Group();
 missileGroup = new Group();

}
function draw() { 
  background(0);

  if (gameState===PLAY){
  if(space.x<0){
    space.x=space.width/2;
    }
  
    if(keyDown("up")){
    fighterplane.velocityY=-10;
    }
  
    fighterplane.velocityY = fighterplane.velocityY+0.5

    spawnAlien();
    spawnAsteroids();

    restart.visible = false;

    if (keyDown("space")) {
      createMissiles();
    }
    
    if (missile.isTouching(asteroids)){
    score = score+1
    asteroidGroup.destroyEach();
    }
    if (missile.isTouching(alien)){
    score = score+1
    alienGroup.destroyEach();
    }
    if (fighterplane.isTouching(alien)){
    fighterplane.addImage(fighterplanecrashedimage);
    }
    if (fighterplane.isTouching(asteroid)){
    fighterplane.addImage(fighterplanecrashedimage);
    }
    gamestate = END;
  }
  else if(gameState===END){
  console.log("OVER");
  fighterplane.velocityY=0;
  alienGroup.setVelocityXEach(0);
  space.velocityX=0;
  asteroidGroup.setVelocityXEach(0);
  alienGroup.destroyEach();
  asteroidGroup.destroyEach();
  score = 0;
  restart.visible = true;
  if(mousePressedOver(restart)) {
  reset();
  }
  }  

  textSize(20);
  fill("red");
  strokeWeight(5);
  stroke("yellow");
  text("SCORE : "+score,200,200);

  drawSprites();
}

function spawnAlien(){
  if (frameCount%300===0){
  alien=createSprite(800,200,20,20);
  alien.y=Math.round(random(100,600));
  alien.addImage(alienimage);
  alien.velocityX=-4;
  alien.scale=0.3;
  alienGroup.add(alien);
}
}
function spawnAsteroids(){
  if (frameCount%150===0){
  asteroid=createSprite(800,400,20,20);
  asteroid.y=Math.round(random(100,600));
  asteroid.addImage(asteroidimage);
  asteroid.velocityX=-4;
  asteroid.scale=0.3;
  asteroidsGroup.add(asteroid);
}
}
function createMissiles() {
  missile= createSprite(100,100,60,10);
  missile.addImage(missileimage);
  missile.x = 250;
  missile.y= fighterplane.y;
  missile.velocityX = 4;
  missile.scale = 0.2;
  missileGroup.add(missile); 
}
function reset(){
  gameState = PLAY;
  fighterplane.addImage(fighterplaneimage);
  fighterplane.scale=0.5;
  }
