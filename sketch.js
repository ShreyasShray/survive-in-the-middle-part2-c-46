var player;
var bullet;
var bullet, bulletGroup;
var enemy, enemyGroup;
var area;
var health = 100;
var healthbar;
var score = 0;
var gamestate = "start";

function setup() {
  createCanvas(500,500);
  healthbar = createSprite(350, 40, 100, 10);
  healthbar.shapeColor = "pink";
  area = createSprite(250, 250, 120, 120);
  area.shapeColor = "green";
  player = createSprite(250, 250, 16, 16);
  player.shapeColor = "blue";
  enemyGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(255,255,255);  

  if(keyDown(LEFT_ARROW)){
    player.rotation = player.rotation - 4;
    player.rotateToDirection = true;
  }

  if(keyDown(RIGHT_ARROW)){
    player.rotation = player.rotation + 4;
    player.rotateToDirection = true;
  }

  if(keyDown("space")){
    bullet = createSprite(250, 250, 5, 10);
    bullet.shapeColor = "red";
    bullet.setSpeedAndDirection(4, player.rotation - 90);
    bullet.rotation = player.rotation;
    bullet.lifeTime = 100;
    bulletGroup.add(bullet);
  }

  if(frameCount % 200 === 0){
    var select = Math.round(random(1, 4));
    switch(select){
      case 1: enemy = createSprite(Math.round(random(0, 100)), Math.round(random(0, 200)), 18, 18);
      enemy.shapeColor = "yellow";
      enemy.setVelocity(2, 1.5);
      enemy.lifeTime = 100;
      enemyGroup.add(enemy);
      break;
      case 2: enemy = createSprite(Math.round(random(0, 100)), Math.round(random(300, 500)), 18, 18);
      enemy.shapeColor = "yellow";
      enemy.setVelocity(2, -1.5);
      enemy.lifeTime = 100;
      enemyGroup.add(enemy);
      break;
      case 3: enemy = createSprite(Math.round(random(400, 500)), Math.round(random(0, 200)), 18, 18);
      enemy.shapeColor = "yellow";
      enemy.setVelocity(-2, 1.5);
      enemy.lifeTime = 100;
      enemyGroup.add(enemy);
      break;
      case 4: enemy = createSprite(Math.round(random(400, 500)), Math.round(random(300, 500)), 18, 18);
      enemy.shapeColor = "yellow";
      enemy.setVelocity(-2, -1.5);
      enemy.lifeTime = 100;
      enemyGroup.add(enemy);
      break;
    }
  }

  for(var i = 0; i <= enemyGroup.length; i++){
    if(bullet){
    if(bullet.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
      score = score + 1;
    }
  }
  }

  if(enemyGroup.isTouching(area)){
    health = health - 0.4;
    healthbar.width = health;
    healthbar.x = 300 + health/2;
  }

  if(health <= 0){
    health = 0;
  }
  console.log(Math.round(health));

  drawSprites();

  textSize(20);
  fill("black");
  stroke("black");
  text("Score : " + score, 100, 30);
  text("Health: ", 220, 45)
}