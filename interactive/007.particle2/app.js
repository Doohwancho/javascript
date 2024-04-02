const canvas = document.getElementById('canvas1'); //make sure <script src="app.js" /> is after <canvas> in index.html b/c getElementById if can't find canvas1, nothing afterward will execute
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
    'white',
    'rgba(255,255,255,0.3)',
    'rgba(173,216,230,0.8)',
    'rgba(211,211,211,0.8)',
];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

//mouse position
let mouse = {
    x: null,
    y: null,
    prevX : null,
    prevY : null,
};

window.addEventListener('mousemove',
    function(event){
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//create constructor function for particle
function Particle(x,y,directionX,direcitonY, size, colour){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.direcitonY = direcitonY;
    this.size = size;
    this.colour = colour;
}

//add draw method to particle prototype
Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.colour;
    ctx.fill();
}

//add update method to particle prototype
Particle.prototype.update = function(){
    if(this.x + this.size*2 > canvas.width ||
        this.x - this.size*2 < 0){
            this.directionX = -this.directionX;
    }
    if(this.y + this.size*2 > canvas.height ||
        this.y - this.size*2 < 0){
            this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.direcitonY;

    //mouse interactivity
    if(
        mouse.prevX != mouse.x && mouse.prevY != mouse.y //마우스가 움직일때만 버블이 커짐
    && mouse.x - this.x < mouseRadius 
    && mouse.x - this.x > -mouseRadius
    && mouse.y - this.y < mouseRadius
    && mouse.y - this.y > -mouseRadius
    && this.size < maxSize){
        this.size += 4;
    }
    else if(this.size > minSize){
        this.size -= 0.15;
    }
    if(this.size < 0){ //마이너스값 들어가면 에러나서.
        this.size = 0;
    }
    this.draw();
}

function init(){
    particleArray = [];
    for(let i = 0; i < 1000; i++){
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let colour = colours[Math.floor(Math.random() * colours.length)]; //random number between 0 and 3
        
        particleArray.push(new Particle(x, y, directionX, directionY, size, colour));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    if(mouse.x != null && mouse.y != null){
        for(let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
        }
    }
}

init();
animate();

//창크기 재조절시 크기 재설정 + init()
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight; 
        init();
    }
)

//8초에 한번씩 mouse.x / mouse.y초기화 = 마우스가 안올라와있으면 지움.
// setInterval(function(){
//     mouse.x = null;
//     mouse.y = null;
// }, 3000);