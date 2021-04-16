var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width - 30;
var y = canvas.height / 2;
var ballradius = 8;
var dx = -2;
var dy = -2;
var paddlewidth = 10;
var paddleheight = 50;
var rpaddlex = canvas.width - 15;
var rpaddley = canvas.height / 2 - paddleheight / 2;
var lpaddlex = 6;
var lpaddley = canvas.height / 2 - paddleheight / 2;
var uparrowpressed = false;
var downarrrowpressed = false;

let expertcounter = 1;
let startingcounter = -1;
var wkeypressed = false;
var skeypressed = false;
var rtouch = false;
var ltouch = false;
var idd;

var scoreR = 0;
var scoreL = 0;
var expert = false;

// timepass

var ballcount = 500;
let changeorder = 1;
const colors = new Array(
  "white"
  //   "red",
  //   "green",
  //   "blue",
  //   "yellow",
  //   "orange",
  //   "purple",
  //   "pink"
);

class balls {
  constructor(color, size) {
    this.x = Math.floor(Math.random() * canvas.width) + 10;
    if (this.x > canvas.width - 20) {
      this.x = Math.floor(Math.random() * canvas.width) - 5;
    }
    if (this.x <= 5) {
      this.x = Math.floor(Math.random() * canvas.width) - 5;
    }
    changeorder *= -1;
    if (changeorder == -1) {
      this.y = 290;
    } else {
      this.y = 10;
    }
    this.color = color;
    this.size = size;
    this.xChange = Math.random() * 2;
    this.yChange = Math.random() * 2;
  }

  move() {
    if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
      this.xChange *= -1;
      this.color = randomChoice(colors);
    }
    if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
      this.yChange *= -1;
      this.color = randomChoice(colors);
    }

    this.x += this.xChange;
    this.y += this.yChange;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }
}

let blobs = new Array();

let xposition = new Array();
let yposition = new Array();

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < ballcount; i++) {
  let randColor = randomChoice(colors);
  let newBlob = new balls(randColor, ballradius);
  blobs.push(newBlob);
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function canvasDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (blobs != null) {
    blobs.forEach(function (obj) {
      obj.draw();
      obj.move();
    });
  }
}

function expertLevel() {
  ballcount = 3;
  expert = !expert;
  expertcounter = 1;
}

function keyDownHandler(e) {
  if (e.keyCode == 73) {
    uparrowpressed = true;
  } else if (e.keyCode == 75) {
    downarrrowpressed = true;
  } else if (e.keyCode == 87) {
    wkeypressed = true;
  } else if (e.keyCode == 83) {
    skeypressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 73) {
    uparrowpressed = false;
  } else if (e.keyCode == 75) {
    downarrrowpressed = false;
  } else if (e.keyCode == 87) {
    wkeypressed = false;
  } else if (e.keyCode == 83) {
    skeypressed = false;
  }
}
function drawball() {
  if (ballcount == 1) {
    ctx.beginPath();
    ctx.arc(x, y, ballradius, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  } else {
    for (c = 0; c < ballcount; c++) {
      ctx.beginPath();
      ctx.arc(x, y, ballradius, 0, Math.PI * 2, false);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    }
  }
}
function drawline() {
  ctx.beginPath();

  ctx.rect(canvas.width / 2, 0, 2, canvas.height);
  ctx.fillStyle = "white";

  ctx.fill();
  ctx.closePath();
}

function drawScoreR() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "0095DD";
  ctx.fillText("Score : " + scoreR, 8, 20); //8,20 is the position
}
function drawScoreL() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "0095DD";
  ctx.fillText("Score : " + scoreL, canvas.width - 80, 20); //8,20 is the position
}

function drawrightpaddle(rtouch = false) {
  ctx.beginPath();
  ctx.rect(rpaddlex, rpaddley, paddlewidth, paddleheight);
  if (!rtouch) {
    ctx.fillStyle = "white";
  } else {
    ctx.fillStyle = "#83f52c";
    console.log("Greeeen ");
  }
  ctx.fill();
  ctx.closePath();
}

function drawleftpaddle(ltouch = false) {
  ctx.beginPath();
  ctx.rect(lpaddlex, lpaddley, paddlewidth, paddleheight);
  if (!ltouch) {
    ctx.fillStyle = "white";
  } else {
    ctx.fillStyle = "#83f52c";
  }

  ctx.fill();
  ctx.closePath();
}

function collisionDetection() {}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawline();
  drawrightpaddle(rtouch);
  drawleftpaddle(ltouch);
  drawball();
  drawScoreR();
  drawScoreL();

  if (expert && expertcounter < 900) {
    expertcounter++;
    blobs.forEach(function (obj) {
      obj.draw();
      obj.move();
    });
    //canvasDraw();
  }

  if (x + dx <= lpaddlex + ballradius) {
    if (y + dy >= lpaddley && y + dy <= lpaddley + paddleheight) {
      dx = -dx;
      ltouch = true;
    }
  } else if (ltouch && x + dx >= lpaddlex + 100) {
    ltouch = false;
  }

  if (x + dx >= canvas.width - ballradius) {
    scoreR++;
    dx = -dx;
  } else if (x + dx <= ballradius) {
    scoreL++;
    dx = -dx;
  }
  if (y + dy >= canvas.height - ballradius || y + dy <= ballradius) {
    dy = -dy;
  } else if (x + dx >= rpaddlex) {
    if (y + dy >= rpaddley && y + dy <= rpaddley + paddleheight) {
      dx = -dx;
      rtouch = true;
    }
  } else if (rtouch && x + dx <= rpaddlex - 100) {
    rtouch = false;
  }

  if (uparrowpressed && rpaddley > 0 + paddleheight / 4) {
    rpaddley -= 3;
  } else if (
    downarrrowpressed &&
    rpaddley < canvas.height - paddleheight - 10
  ) {
    rpaddley += 3;
  }

  if (wkeypressed && lpaddley > 0 + paddleheight / 4) {
    lpaddley -= 3;
  } else if (skeypressed && lpaddley < canvas.height - paddleheight - 10) {
    lpaddley += 3;
  }

  x += dx;
  y += dy;
}

function startreset() {
  startingcounter = startingcounter * -1;
  if (startingcounter === 1) {
    idd = setInterval(draw, 10);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(idd);
  }
}
