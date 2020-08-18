var play=1, end=0, gamestate=play
var trex,dino,collision
var ground,gameOver,gameover,reset,restart
var invisground,runningground
var skyobjects,clouds
var landobjects,obs1,obs2,obs3,obs4,obs5,obs6
var score=0
function preload(){
  dino=loadAnimation("trex1.png","trex3.png", "trex4.png")
  collision=loadAnimation("trexcollided.png")
  runningground=loadImage("ground2.png")
  clouds=loadImage("cloud.png")
  obs1=loadImage("obstacle1.png")
  obs2=loadImage("obstacle2.png")
  obs3=loadImage("obstacle3.png")
  obs4=loadImage("obstacle4.png")
  obs5=loadImage("obstacle5.png")
  obs6=loadImage("obstacle6.png")
  gameOver=loadImage("gameOver.png")
  restart=loadImage("restart.png")
}
function setup() {
  createCanvas(600,200);
  trex=createSprite(50,180,20,50)
  trex.addAnimation("dino",dino)
  trex.addAnimation("collided",collision)
  trex.scale=0.5
  ground=createSprite(200,180,400,20)
  ground.addImage("runningground",runningground)
  ground.x=ground.width/2
  ground.velocityX=-10
  invisground=createSprite(200,190,400,10)
  invisground.visible=false;
  skyobjects=new Group()
  landobjects=new Group()
  gameover=createSprite(300,100)
  gameover=addImage(gameOver)
  gameover.visible=false
  reset=createSprite(300,140)
  reset=addImage(restart)
  reset.visible=false
}

function draw() {
  background(220);
  text("score"+score,500,50)
  if (gamestate==play){
  score=score+Math.round(getFrameRate()/60)
  if (keyDown("space")&& trex.y>159){
    trex.velocityY=-14
  }
  trex.velocityY=trex.velocityY+0.8
  if (ground.x<0){
    ground.x=ground.width/2
  }
  trex.collideWith(invisground)
  spawnclouds()
  obstacles()
  if (trex.isTouching(landobjects)){
    gamestate=end
  }}
  else if(gamestate==end){
    gameover.visible=true
    reset.visible=true
    trex.velocityY=0
    ground.velocityX=0
    landobjects.setVelocityXEach(0)
    skyobjects.setVelocityXEach(0)
    landobjects.setlifetimeEach(0)
    skyobjects.setlifetimeEach(0)
    if (mousePressedOver(reset)){
    RESET()
      }
}drawsprites()}
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = randomNumber(280,320);
    cloud.setAnimation("cloud");
    cloud.scale = 0.5;
    cloud.velocityX = -10;
  
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    skystuff.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
  }}
function obstacles(){
  if (World.frameCount %75==0){
  var cacti=createSprite(400,360,20,20);
  var select=randomNumber(1,7);
  cacti.setAnimation("obstacle"+ select);
  cacti.scale=0.5;
  cacti.velocityX=-(15+score/100);
  cacti.lifetime=40;
  landstuff.add(cacti);
  cacti.depth=trex.depth;
  trex.depth=trex.depth+1;
 text(score,300,100);
  }}
function RESET(){
  gamestate=play
  gameover.visible=false
  reset.visible=false
  landobjects.destroyEach()
  skyobjects.destroyEach()
  score=0
  trex.changeAnimation("dino",dino)
}