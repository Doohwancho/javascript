import {
    Hill
} from './hill.js';

import {
    SheepController
} from './sheepController.js';

import {
    Sun
} from './sun.js';

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.sun = new Sun();

        this.hills = [
            new Hill('#fd6bea', 0.2, 12), //멀리있는 물체는 느리게 움직이는것 처럼 보이고 (speed : 2nd param)
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6),  //가까이 있을수록 빠르게 움직는것 처럼 보이니까. (speed : 2nd param)
        ];  

        this.SheepController = new SheepController();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        this.sun.resize(this.stageHeight, this.stageWidth);
        
        for(let i = 0; i < this.hills.length; i++){
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.SheepController.resize(this.stageWidth, this.stageHeight);
    }

    animate(t){
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight);

        this.sun.draw(this.ctx, t);

        let dots;
        for(let i = 0; i < this.hills.length; i++){
            dots = this.hills[i].draw(this.ctx);
        }

        this.SheepController.draw(this.ctx, t, dots); //animate(t) t : timestamp. 이걸로 sprite picture의 fps정의가능., dots from hiils.draw()
    }
}

window.onload = () => {
    new App();
}