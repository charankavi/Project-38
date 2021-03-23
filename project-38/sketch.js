var road1;
var road2;
var road3;
var roadGroup;
var car;
var rock;
var rockGroup;
var coin;
var coinGroup;
var score = 0;


function preload() {
  road_image = loadImage("road.png");

  car_image = loadImage("car.png");

  stone_image = loadImage("obstacle.png");

  coin_animation = loadAnimation("coin/0000.png", "coin/0001.png", "coin/0002.png", "coin/0003.png", "coin/0004.png", "coin/0005.png", "coin/0006.png", "coin/0007.png", "coin/0008.png", "coin/0009.png", "coin/0010.png");

}

function setup() {
  createCanvas(600,600);

  roadGroup = createGroup();

  road1 = createSprite(100, 300, 200, 600);
  road1.addImage(road_image);
  roadGroup.add(road1);

  road2 = createSprite(300, 300, 200, 600);
  road2.addImage(road_image);
  roadGroup.add(road2);

  road3 = createSprite(500, 300, 200, 600);
  road3.addImage(road_image);
  roadGroup.add(road3);

  roadGroup.setVelocityYEach(3);

  car = createSprite(304, 500, 10, 10);
  car.addImage(car_image);
  car.scale = 0.1;

  rockGroup = createGroup();
  coinGroup = createGroup();

}

function draw() {

  frameRate(40);

  background(rgb(0,100,0));
  
  camera.x = car.x;
  camera.y = car.y - 75;
  camera.zoom = 1.5;


  
  CONTROLS();

  if (frameCount % 100 == 0) {
    STONE();
  }
  if (frameCount % 300 == 0) {
    COINS();
  }

  if (road1.y > 500) {
    road1.y = 300;
    road2.y = 300;
    road3.y = 300;
  }
  
  if(car.scale <= 0 ){
    OVER();
  }
  
  if(keyDown (UP_ARROW) && score >= 25 && car.scale != 0.1){
    car.scale = 0.1;
    score = score - 25;
  }

  drawSprites();
  fill("black");
  textSize(25);
  text("SCORE : " + score , camera.x - 60,camera.y - 170);
  textSize(10);
  text("PRESS UP_ARROW TO INCREASE YOUR SIZE IF SCORE ARE GREATER THAN 25",camera.x - 195,camera.y - 150);
  
}

function CONTROLS() {

  if (keyWentUp("RIGHT_ARROW")) {
    if (car.x === 304) {
      car.x = 504;
    }
    if (car.x === 104) {
      car.x = 304;
    }
  }


  if (keyWentUp("LEFT_ARROW")) {
    if (car.x === 304) {
      car.x = 104;
    }
    if (car.x === 504) {
      car.x = 304;
    }
  }
  
  if(rockGroup.isTouching(car)){
    car.scale = car.scale - 0.05;
    rockGroup.destroyEach();
  }
    if(coinGroup.isTouching(car)){
    score = score + 10;
    coinGroup.destroyEach();
  }

}

function STONE() {

  rock = createSprite(304, -50, 10, 10);
  rock.addImage(stone_image);
  rock.scale = 0.2;
  rock.velocityY = 3;
  rock.lifetime = 300;
  rockGroup.add(rock);

  rand = Math.round(random(1, 3));
  if (rand === 1) {
    rock.x = 104;
  } else if (rand === 2) {
    rock.x = 304;
  } else if (rand === 3) {
    rock.x = 504;
  }
  rockGroup.add(rock);
}

function COINS() {

  coin = createSprite(304, -50, 10, 10);
  coin.addAnimation("moveing_coin",coin_animation);
  coin.scale = 0.1;
  coin.velocityY = 3;
  coin.lifetime = 300;
  coinGroup.add(coin);

  rand = Math.round(random(1, 3));
  if (rand === 1) {
    coin.x = 104;
  } else if (rand === 2) {
    coin.x = 304;
  } else if (rand === 3) {
    coin.x = 504;
  }
  
  
}
function OVER(){
roadGroup.destroyEach();
rockGroup.destroyEach();
coinGroup.destroyEach();  
background(0);
fill("red");
textSize(60);
text("GAMEOVER",camera.x - 195,400);
  
}