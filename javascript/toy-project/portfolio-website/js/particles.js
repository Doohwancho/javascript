/*
    particles.js copyrights : Franks laboratory
*/

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray;

//get mouse position
let mouse = {
    x: null,
    y: null,
    radius : (canvas.height/90) * (canvas.width/90) 
}

window.addEventListener('mousemove',
    function(e){
        mouse.x = e.x;
        mouse.y = e.y;
    }
);

// create particle
class Particle{
    constructor(x,y,directionX,directionY,size,color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    //method to draw individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }

    //check particle position, check mouse position, move the particle, draw the particle
    update(){
        //check if particle is still within canvas
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){ //마우스 커서 반경 안에 들어와 충돌이 일어났으면,
            if(mouse.x < this.x  && this.x < canvas.width - this.size * 10){  //어떤 방향에서 충돌 일어났는지 체크하고, 해당 방향으로 밀어줌.
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }

        //move particle
        this.x += this.directionX;
        this.y += this.directionY;

        //draw particle
        this.draw();
    }
}

function init() {
    particleArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 8000;
    for(let i = 0; i < numberOfParticles; i++){
        // let size = (Math.random() * 5) + 1; 
        let size = 0.1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5; //movement speed
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        particleArray.push(new Particle(x,y,directionX, directionY, size, color));
    }
}

//animation loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
    }
    connect();
}


function connect(){
    for(let a = 0; a < particleArray.length; a++){
        for(let b = a; b < particleArray.length; b++){
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
                + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));

            if(distance < (canvas.width/7) * (canvas.height/7)){ 
                // ctx.strokeStyle='rgba(140,85,31,1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y); //두 점을 이어줌
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }                
        }
    }
}

//resize event
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height/80) * (canvas.width/80);
        init();
    }
);

//mouse out event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();