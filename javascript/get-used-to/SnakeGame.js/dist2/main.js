
$(document).ready(function () { //$(document).ready(function()){}은 DOM이 준비되었을 때, click 이벤트를 시작하겠다는 뜻.
            init();
            $(document).on('click', '#startBtn', function () {
                end();
                start();
            });
        });

var nbDrop = 858; 
var rain = true;
    
function randRange(minNum, maxNum){
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

function createRain(){
    
    for(i = 1; i < nbDrop; i++){
        var dropLeft = randRange(0, 1600); 
        var dropTop = randRange(-1000, 1400); 
        
        $('.rain').append('<div class="drop" id="drop' + i + '"></div>');
        $('#drop'+i).css('left', dropLeft);
        $('#drop'+i).css('top', dropTop);
    }
}


px = py = 5;
gs = tc = 20;
ax = ay = 15;
xv = 1;
yv = 0;
lastKey = 37;
trail = [];
tail = 2;

var score = 0;
var gameInterval;


function move() {
    px += xv;
    py += yv;
    if (px < 0) {
        if (py == 0) {
            px = 0;
            py += 1;
            xv = 0;
            yv = 1;
            lastKey = 38;
        }
        else if (py == tc - 1) {
            px = 0;
            py -= 1;
            xv = 0;
            yv = -1;
            lastKey = 40;
        }
        else {
            if (Math.random() >= 0.5) {
                px = 0;
                py += 1;
                xv = 0;
                yv = 1;
                lastKey = 38;
            }
            else {
                px = 0;
                py -= 1;
                xv = 0;
                yv = -1;
                lastKey = 40;
            }
        }
    }
    else if (px > tc - 1) {
        if (py == 0) {
            px = tc - 1;
            py += 1;
            xv = 0;
            yv = 1;
            lastKey = 38;
        }
        else if (py == tc - 1) {
            px = tc - 1;
            py -= 1;
            xv = 0;
            yv = -1;
            lastKey = 40;
        }
        else {
            if (Math.random() >= 0.5) {
                px = tc - 1;
                py += 1;
                xv = 0;
                yv = 1;
                lastKey = 38;
            }
            else {
                px = tc - 1;
                py -= 1;
                xv = 0;
                yv = -1;
                lastKey = 40;
            }
        }
    }
    else if (py < 0) {
        if (px == 0) {
            py = 0;
            px += 1;
            xv = 1;
            yv = 0;
            lastKey = 37;
        }
        else if (px == tc - 1) {
            py = 0;
            px -= 1;
            xv = -1;
            yv = 0;
            lastKey = 39;
        }
        else {
            if (Math.random() >= 0.5) {
                py = 0;
                px += 1;
                xv = 1;
                yv = 0;
                lastKey = 37;
            }
            else {
                py = 0;
                px -= 1;
                xv = -1;
                yv = 0;
                lastKey = 39;
            }
        }
    }
    else if (py > tc - 1) {
        if (px == 0) {
            py = tc - 1;
            px += 1;
            xv = 1;
            yv = 0;
            lastKey = 37;
        }
        else if (px == tc - 1) {
            py = tc - 1;
            px -= 1;
            xv = -1;
            yv = 0;
            lastKey = 39;
        }
        else {
            if (Math.random() >= 0.5) {
                py = tc - 1;
                px += 1;
                xv = 1;
                yv = 0;
                lastKey = 37;
            }
            else {
                py = tc - 1;
                px -= 1;
                xv = -1;
                yv = 0;
                lastKey = 39;
            }
        }
    }
}

function drawBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
}

function drawSnake() {
    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x == px && trail[i].y == py) {
            gameOver();
        }
    }
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift();
    }
}

function eatApple() {
    if (ax == px && ay == py) {
        tail++;
        score++;
        $('#score').text(score); //jquery코드. <span>안에 id='score에 var score값을 넣으라는 것.'

        appleCreated = true;
        while (appleCreated) {
            ax = Math.floor(Math.random() * tc);
            ay = Math.floor(Math.random() * tc);
            for (var i = 0; i < trail.length; i++) {
                if (trail[i].x == ax && trail[i].y == ay) {
                    break;
                }
                if (i == trail.length - 1) appleCreated = false;
            }
        }
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function gameOver() {
    alert("Game Over!");
    score = 0;
    $('#score').text(score);
    tail = 2;
    if(rain){
        rain = false;
        $(document).ready(function () {  
            createRain();    
        });
    }
}

function keyPush(evt) {
    if (evt.keyCode != lastKey) { //가고있는 방향과 반대방향으로 설정
        switch (evt.keyCode) {
            case 37:
                xv = -1; yv = 0;
                lastKey = 39;
                break;
            case 38:
                xv = 0; yv = -1;
                lastKey = 40;
                break;
            case 39:
                xv = 1; yv = 0;
                lastKey = 37;
                break;
            case 40:
                xv = 0; yv = 1;
                lastKey = 38;
                break;
        }
    }
}


function start() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    setInterval(document.addEventListener("keydown", keyPush), 35);
    gameInterval = setInterval(game, 70); // 1000 / 11
}

function end() {
    clearInterval(gameInterval);
}

function game() {
    drawBoard();
    drawSnake();
    move();
    eatApple();
}

function init() {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    drawBoard();
    ctx.fillStyle = "lime";
    ctx.fillRect(px * gs, py * gs, gs - 2, gs - 2);
    eatApple();
}