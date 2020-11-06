var fruitGroup;
var fruit1,fruit2,fruit3,fruit4;
var alienAni;
var sword, swordImg;

var gameover, gameoverImg;
var  bgImg;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameoverSound, chopSound;

var fruit1Chopped,fruit2Chopped,fruit3Chopped,fruit4Chopped;
var fruitVal, fruit;

function preload()
{
  fruit1 = loadImage('apple.png');
  fruit2 = loadImage('orange.png');
  fruit3 = loadImage('pear.png');
  fruit4 = loadImage('watermelon.png');
  
  fruit1Chopped = loadImage('apple choped.png');
  fruit2Chopped = loadImage('orange choped.png');
  fruit3Chopped = loadImage('pear choped.png');
  fruit4Chopped = loadImage('watermelon chopped.png');
  
  alienAni = loadAnimation('bomb1.png','bomb2.png');
  
  gameoverImg = loadImage('gameover.png');
  
  bgImg = loadImage('bg.png');
  
  swordImg = loadImage('katana.png');
  
  gameoverSound = loadSound('gameOver.mp3');
  chopSound = loadSound('chop.mp3');
 
}

function setup()
{
  createCanvas(400, 400);
  bg = createSprite(200,200);
  bg.addImage('background',bgImg);
  
  sword = createSprite(200,200,10,10);
  sword.addImage('sword',swordImg);
  sword.scale = 0.07;
  sword.setCollider('rectangle',100,-50,300,1700,38.3);
  
 
  
  gameover = createSprite(200,200,10,10);
  gameover.scale= 1.5;
  gameover.addImage('over',gameoverImg);
  gameover.visible = false;
  fruitGroup = createGroup();
  alienGroup = createGroup();
  
  //sword.debug = true;
  
  
  //alienGroup.debug = true;
}

function draw()
{
  background(210,105,30);
  drawSprites();
  
  
  sword.x = mouseX;
  sword.y = mouseY;
  if(gameState === PLAY){
    
    if(sword.isTouching(fruitGroup)){
      
      if(fruitVal === 1){
        fruit.addImage(fruit1Chopped);
        fruit.scale = 0.05;
        fruitGroup.remove(fruit);
      }
      else if(fruitVal === 2){
        fruit.addImage(fruit2Chopped);
        fruit.scale = 0.05;
        fruitGroup.remove(fruit);
      }
      else if(fruitVal === 3){
        fruit.addImage(fruit3Chopped);
        fruit.scale = 0.05;
        fruitGroup.remove(fruit);
      }
      else if(fruitVal === 4){
        fruit.addImage(fruit4Chopped);
        fruit.scale = 0.05;
        fruitGroup.remove(fruit);
      } 
           //fruitGroup.destroyEach();
           chopSound.play();
           score += 1;
        
    }
    
    if(sword.isTouching(alienGroup)){
           alienGroup.destroyEach();
           gameoverSound.play();
           gameState = END;
      
    } 
    
    ThrowFruit()
    alien()
  }
  else if(gameState === END){
    alienGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    alienGroup.setVelocityYEach(0);
    fruitGroup.setVelocityYEach(0);
    fruitGroup.setLifetimeEach(-1);
    gameover.visible = true;
    textSize(20)
    fill(255, 0, 0)
    text("Press 'Space' to play again",80,240);
    if(keyDown('space')){
      reset();
    }
  }
    
    
  
  
  
  textSize(20)
  fill(0, 0, 0)
  text('Score:'+score,290,20);
  
  
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  fruitGroup.destroyEach();
  alienGroup.destroyEach();
  score = 0;
}

function ThrowFruit()
{  
  
  if(frameCount % 60  === 0){
    fruit = createSprite(Math.round(random(20,380)),450,50,50);
    switch(Math.round(random(1,4)))
    {
      case 1: fruit.addImage(fruit1);
        fruit.scale = 0.05;
        fruitVal = 1;
        break;
      case 2: fruit.addImage(fruit2);
        fruit.scale = 0.05;
        fruitVal = 2;
        break;
      case 3: fruit.addImage(fruit3);
        fruit.scale = 0.05;
        fruitVal = 3;
        break;
      case 4: fruit.addImage(fruit4);
        fruit.scale = 0.05;
        fruitVal = 4;
        break;
              
      default: break;
    }
    switch(Math.round(random(1,3))){
      case 1: fruit.x = Math.round(random(20,380))
        fruit.y = 400;
        fruit.velocityX = Math.round(random(-4,4));
        fruit.velocityY = -(13+(score/4));
        break;
      case 2: fruit.x = 400;
        fruit.y = Math.round(random(20,380))
        fruit.velocityY = Math.round(random(-4,4));
        fruit.velocityX = -(13+(score/4));
        break;
      case 3: fruit.x = 0;
        fruit.y = Math.round(random(20,380))
        fruit.velocityY = Math.round(random(-4,4));
        fruit.velocityX = (13+(score/4));
        break;
      default: break;
    }
    
    fruit.lifetime = 50;
    //fruit.debug = true;
    fruit.setCollider('circle');
    
    fruitGroup.add(fruit);
  }
}

function alien()
{
  
  if(frameCount %200 === 0){
    var alien = createSprite(Math.round(random(20,380)),450,50,50);
    alien.addAnimation('moving',alienAni);
    alien.scale= 0.05;
    switch(Math.round(random(1,3))){
      case 1: alien.x = Math.round(random(20,380))
        alien.y = 400;
        alien.velocityX = Math.round(random(-4,4));
        alien.velocityY = -(10+(score/10));
        break;
      case 2: alien.x = 400;
        alien.y = Math.round(random(20,380))
        alien.velocityY = Math.round(random(-4,4));
        alien.velocityX = -(10+(score/10));
        break;
      case 3: alien.x = 0;
        alien.y = Math.round(random(20,380))
        alien.velocityY = Math.round(random(-4,4));
        alien.velocityX = (10+(score/10));
        break;
      default: break;
    }
    alien.lifetime = 50;
    //alien.debug = true;
    alien.setCollider('circle',-350,350,500);
    alienGroup.add(alien);
  }

}