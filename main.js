var canvas
var ctx

// Movement
var keysDown = {};

// User
var player = {};

// Opponents
var Cars = [];
var CarOne = {};
var CarTwo = {};
var CarThree = {};
var CarFour = {};
var CarFive = {};
var CarSix = {};
var CarSeven = {};

// Counters
var numberOfDeaths = 0;
var numberOfWins = 0;

// Rendering
var gameLoop
var update
var resetCar
var resetPlayer


// Return True and false when a key is pressed
addEventListener ("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

// Return True and false when a key is unpressed
addEventListener ("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Change player speed when key arrows are pressed
var update = function (modifier) {

  if (38 in keysDown) {
    player.y -= player.speed * modifier;
  }

  if (40 in keysDown) {
    player.y += player.speed * modifier;
  }

  if (37 in keysDown) {
    player.x -= player.speed * modifier;
  }

  if (39 in keysDown) {
    player.x += player.speed * modifier;
  }

};


// Drop player at its initial position
var resetPlayer = function () {

  player.x = 100;
  player.y = canvas.height /2 ;

};

// Drop a car somewhere in the top of the screen
var resetCar = function () {

   Cars.forEach(function(uniqueCar) {
      uniqueCar.x = 300 + (Math.random() * (canvas.width-600));
      uniqueCar.y = -1000 * Math.random();
      uniqueCar.speed = 10 * Math.random(2.5,5);
      uniqueCar.size = 32 + Math.random(10,600)*100;
      uniqueCar.width = 32;
      uniqueCar.alpha = Math.random(1,100)
      uniqueCar.color = 'Black';
   });

};


// Do player touch car?
function drawTouchCar(){

  // Evaluate coordonates of both objects, reset of touch
  Cars.forEach(function(uniqueCar) {

     if (
        player.x <= (uniqueCar.x + uniqueCar.width)
        && uniqueCar.x <= (player.x + 10)
        && player.y <= (uniqueCar.y + uniqueCar.size)
        && uniqueCar.y <= (player.y + 10)
     ){
        ++numberOfDeaths; // +1 Die
        resetPlayer();

     }
  // if player pass arival line
     if(player.x > (canvas.width - 170 )){
        resetPlayer();
        ++numberOfWins; // +1 Win
     }
  });
}

// Objects to draw : background
function drawBackground(){

  ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();

}
// Player and reset if he goes beyound screen boders
function drawPlayer(){

  ctx.beginPath();
  ctx.arc(player.x,player.y,5,0,2*Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  if (player.x < 0){
    ++numberOfDeaths;
    resetPlayer();
  }

  if (player.y < 0){
    ++numberOfDeaths;
    resetPlayer();
  }

  if (player.y >= canvas.height){
    resetPlayer();
    ++numberOfDeaths;
  }

}

// car and reset car when car goes beyound screen height
function drawCar(){

  Cars.forEach(function(uniqueCar) {

     ctx.beginPath();
     ctx.globalAlpha = uniqueCar.alpha;
     ctx.rect(uniqueCar.x,uniqueCar.y,32,uniqueCar.size);
     ctx.fillStyle = uniqueCar.color;
     ctx.fill();
     uniqueCar.y += uniqueCar.speed;

     if (uniqueCar.y > canvas.height){
        uniqueCar.y = -10
      uniqueCar.x = 300 + (Math.random() * (canvas.width-600));
           };

  });

}

// Death counter and syntax variations
function drawDeaths(){
  if (numberOfDeaths < 2){
  document.getElementById("deathz").innerHTML = numberOfDeaths + " death";
  }

  else {
  document.getElementById("deathz").innerHTML = numberOfDeaths + " deaths";
  }

}

// Win counter and syntax variations
function drawWins (){

if (numberOfWins < 2){
  document.getElementById("winz").innerHTML = numberOfWins + " win";
  }

else {
  document.getElementById("winz").innerHTML = numberOfWins + " wins";
  }

}

// Start line
function drawStart(){

  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.moveTo(200,30);
  ctx.lineTo(200,canvas.height-30);
  ctx.lineWidth = 2;
  ctx.strokeStyle="black";
  ctx.stroke();

}

// Arrival line
function drawArrival(){

  ctx.moveTo(canvas.width-200,30);
  ctx.lineTo(canvas.width-200,canvas.height-30);
  ctx.stroke();

}

// Draw all elements needed
function drawEverything (){

  drawTouchCar();
  drawBackground();
  drawStart();
  drawArrival();
  drawPlayer();
  drawCar();
  drawWins();
  drawDeaths();
  drawWins();

};


// Game loop
var gameLoop = function () {

  update(3/100);
  drawEverything();
  requestAnimationFrame(gameLoop);

};


// Canvas setup
canvas = document.getElementById('canvas'),
ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;


// Game auto-launch (onload setup)
// Will be changed in the future when levels added.
player["speed"] = 100;
Cars.push(CarOne);
Cars.push(CarTwo);
Cars.push(CarThree);
Cars.push(CarFour);
Cars.push(CarFive);
Cars.push(CarSix);
Cars.push(CarSeven);
resetCar();
resetPlayer();
gameLoop();
