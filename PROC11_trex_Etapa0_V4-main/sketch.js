var invisibleGround
var trex ,trex_running;
var trex_collided;
var ground,groundImage;
var cloud,cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score=0;
var play=1,end=0;
var gameState=play;
var obstacleGroup;
var cloudGroup;
//var serve=2;





function preload(){
 trex_running=loadAnimation ("trex1.png","trex3.png","trex4.png"); 
trex_collided=loadAnimation ("trex_collided.png");
groundImage=loadAnimation("ground2.png");
cloudImage=loadAnimation("cloud.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
  
  //crear sprite de Trex
 trex=createSprite(50,160,20,50);
 trex.addAnimation("running",trex_running);
 trex.scale=0.5

 //crear sprite de suelo
ground=createSprite(200,180,400,20);
ground.addAnimation("ground",groundImage);
ground.x=ground.width/2;

//piso invible pa el t-rex volador
invisibleGround=createSprite (200,190,400,10)
invisibleGround.visible=false;

// tirar 1 dado en las nubes y obtaculos
var rand=Math.round(random(1,100));
//console.log(rand)
}




function draw(){
  background("white")
  //console.log(frameCount)
  text("puntuacion: "+score,500,50);
  //console.log(trex.y);




//INICIO O FIN DEL JUEGO
if(gameState==play){
  
  
//velocidad al suelo
  ground.velocityX=-10;
 
 
  //puntaje para presumir
 
 score=score+Math.round(frameCount/60);

 //piso sumamente infinito
if (ground.x<0){
  ground.x=ground.width/2;
}
 //hacer que el t-rex salte al usar barra espaciadora

 if (keyDown("space")&& trex.y>=101){
  trex.velocityY=-10;
    }
  
    //gravedad 2.0 :v
   trex.velocityY=trex.velocityY+0.8;

   spawnClouds();
   spawnObstacles();
   if (obstacleGroup.isTouching(trex)){
    gameState=end;
   }




else if(gameState==end){
 
  ground.velocityX=0;

  obstacleGroup.setVelocityEach(0);
  cloudGroup.setVelocityEach(0);

}

/*else if(gameState==server){
  //gameState=1;
  //keyDown("space");
  //ground.velocityX=0;
  /*if (keyDown("space")){
    gameState=1
  }


 }
*/



 
 
 
  
 //evitar que el t-rex caiga al infinito

 trex.collide(invisibleGround);

  
 spawnClouds(); 
spawnObstacles();
  drawSprites();

}
}




function spawnObstacles(){

  if(frameCount%60==0){
  var obstacle=createSprite(600,165,10,40);
  obstacle.velocityX=-6;
  var rand=Math.round(random(1,6));

  switch(rand){

    case 1: obstacle.addImage(obstacle1);
    break;

    case 2: obstacle.addImage(obstacle2);
    break;

    case 3: obstacle.addImage(obstacle3);
    break;

    case 4: obstacle.addImage(obstacle4);
    break;

    case 5: obstacle.addImage(obstacle5);
    break;

    case 6: obstacle.addImage(obstacle6);
    break;

    default: break;

  }
//vida y tamaño (sigo si cretividad :v)
  obstacle.scale=0.5;
  obstacle.lifetime=220;
  }





}













function spawnClouds(){
  //generacion nubosa de nubes
  if(frameCount%44==0){
    cloud=createSprite (600,100,40,10);
    cloud.addAnimation("cloudImage",cloudImage);
    cloud.y=Math.round(random(22,76));
    cloud.scale=0.6
    cloud.velocityX=-3;

    //eliminar nubes pa evitar lag
    cloud.lifetime=200

    //profundidad (se me acabo la creatividad)
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    //console.log(trex.depth)
    //console.log(cloud.depth)
  }
 
}

