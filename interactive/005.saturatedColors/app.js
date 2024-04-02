import {Particle} from './particle.js';

const COLORS = [
    {r: 45,g: 74,b: 227},
    {r: 250,g: 255,b: 89},
    {r: 255,g: 104,b: 248},
    {r: 44,g: 209,b: 252},
    {r: 54,g: 233,b: 84},
]; //6 diff colors

//

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.particleTotal = 15;
        this.minRadius = 400;
        this.maxRadius = 500;
        this.particleGroup = [];
        this.init();
        
        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.globalCompositeOperation = 'saturation';
        //saturation, color, luminosity, hue, exclusion, difference, soft-light, color-burn, color-dodge, darken, lighten, overlay, 
        //multiply, destination-atop, destination-in, destination-over     
    }

    init(){
        for(let i = 0, j = 0; i < this.particleTotal; i++, j++){
            this.particle = new Particle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius-this.minRadius)+this.minRadius,
                COLORS[j],
                Math.random()*4,
            );

            if(j == COLORS.length-1){
                j = 0;
            };
            this.particleGroup[i] = this.particle;
        }
    }

    animate(t){
        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight);

        for(let i = 0; i < this.particleTotal; i++){
            this.particleGroup[i].move(this.ctx, this.stageWidth, this.stageHeight);
        }

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}