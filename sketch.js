
var database;

var form, player, game;


var PLAY = 1;
var END = 2;
var gameState = PLAY;

var runner_running
var ground,groundImage;

var obstacle1, obstacle2,obstaclesGroup 

var score=0;

var gameOver, restart;



function preload(){
  runner_running =   loadAnimation("image1.png","image1.png","image2.png","image3.png","image4.png","image5.png","image6.png","image8.png",);
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  groundImage = loadImage("ground2.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  runner = createSprite(50,180,20,50);
  
  runner.addAnimation("running", runner_running);
 runner.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  

  
}

function draw() {
  //trex.debug = true;
  background(255);
  runner("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") &&  runner.y >= 159) {
      runner.velocityY = -12;
    }
  
    runner.velocityY =  runner.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    runner.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    runner.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}




function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  score = 0;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  

  }
  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);

    }
  }
  