var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, height;
var balloonPosition;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  height.x = 250;
  height.y = 450;
  database=firebase.database();
  createCanvas(1500,700);
poistion = 0;
  balloon=createSprite(0,0,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
   balloonPosition =database.ref('balloon/position');
   balloonPosition.on("value",readPosition,showError);
   textSize(20); 
}
function updatePosition(u,y){
  database.ref('balloon/position').set({
    'x':height.x+u,
    'y':height.y+y
  })
}
function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function showError(){
   console.log("error in writting database");
   }

// function to display UI
function draw() {
  background(bg);


  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updatePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updatePosition(10,0);

  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updatePosition(0,-10);
    balloon.scale = balloon.scale -0.006;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updatePosition(0,10);
    balloon.scale = balloon.scale +0.006;
  }


  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!, Please wait for 4 seconds after loading the game so that your balloon works properly",40,40);
}
