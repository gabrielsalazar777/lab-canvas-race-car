const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gameOn = false;
let obstaclesArr = [];

const road = new Image();
road.src = "./images/road.png";
const car = new Image();
car.src = "./images/car.png";

x = 225;

function random() {
  return Math.floor(50 + Math.random() * 300);
}

class Obstacle {
  constructor() {
    this.x = random() - 10;
    this.y = 0;
    this.color = "red";
    this.width = random();
    this.height = 25;
  }

  draw() {
    ctx.fillStlye = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateObstacles() {
  if (obstaclesArr.length) {
    obstaclesArr.forEach((element) => {
      element.y += 25;
      element.draw();
    });
  }
}

function generateObstacles() {
  let newObstacle = new Obstacle();
  newObstacle.draw();
  obstaclesArr.push(newObstacle);
}

function updateMap() {
  ctx.clearRect(x, 400, 50, 75);
  ctx.drawImage(road, 0, 0, 500, 700);
  ctx.drawImage(car, x, 400, 50, 75);

  obstaclesArr.forEach((e) => {
    e.draw();
    if (x < e.x + e.width && x + 50 > e.x && 400 < e.y + 25 && 475 > e.y) {
      console.log("game lost: ", e.x, x, e.y);
    }
  });
}

function startGame() {
  ctx.drawImage(road, 0, 0, 500, 700);
  ctx.drawImage(car, x, 400, 50, 75);
  setInterval(generateObstacles, 3000);
  setInterval(updateObstacles, 500);
  setInterval(updateMap, 16);
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 37:
        if (x > 5) {
          x -= 5;
        }
        break;
      case 39:
        if (x < 445) {
          x += 5;
        }
        break;
    }
  });
};
