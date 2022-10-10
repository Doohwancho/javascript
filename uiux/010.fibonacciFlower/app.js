class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.size = 30;
        this.positionX = this.canvas.width/2;
        this.positionY = this.canvas.height/2;
        this.angle = 0;
        this.number = 0;
        this.scale = 10;
        this.hue = 0;
        this.flag = true;

        this.ctx.globalCompositeOperation = 'destination-over';

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
    }
    
    

    drawFlower(){
        this.angle = this.number * 29.17;
        this.radius = this.scale * Math.sqrt(this.number);
        this.positionX = this.radius * Math.sin(this.angle) + this.canvas.width / 2;
        this.positionY = this.radius * Math.cos(this.angle) + this.canvas.height / 2;


        this.ctx.fillStyle = 'hsl('+this.hue+', 100%, 50%)';
        // this.ctx.fillStyle = 'grey';
        // this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.arc(this.positionX,this.positionY,this.number,0,Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
        // this.ctx.stroke(); //highlight this shape with border
    }

    animate(t){
        //draw each frame
        // this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.number++;
        if(this.hue == 255){
            this.flag = false;
        } else if(this.hue == 0){
            this.flag = true;
        }
        if(this.flag){
            this.hue++;
        } else {
            this.hue--;
        }

        this.drawFlower();

        // if(this.number == 1000){
        //     return;
        // }

        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App(); 
}