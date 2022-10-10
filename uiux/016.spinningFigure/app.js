import {Polygon} from './polygon.js';

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;

        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);

        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        this.ctx.scale(this.pixelRatio, this.pixelRatio); //가로2배, 세로2배
        
        this.polygon = new Polygon(
            this.stageWidth / 2,
            this.stageHeight + (this.stageHeight / 3), //도형의 중심을 화면 밑으로 옮김
            this.stageHeight / 1.5,
            15
        );
    }

    animate(t){

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92; //드래그해서 움직인 거리만큼 빠르게 움직임. 그리고 92%씩 계속 속도가 줄어듬.
        this.polygon.animate(this.ctx, this.moveX);

        requestAnimationFrame(this.animate.bind(this));
    }

    onDown(e){
        this.isDown = true; //밑으로만 스핀가능
        this.moveX = 0;
        this.offsetX = e.clientX;
    }

    onMove(e){
        if(this.isDown){ //밑으로만 스핀가능
            this.moveX = e.clientX - this.offsetX; //드래그해서 움직인 거리가 속도가 됨. 각도가 처음엔 쥰나 큰데, 그 땐 빠르게 ctx.rotate(thie.moveX)로 빠르게 돌다가, this.moveX가 작아지면서 점점 느려지고, 0이되면 회전을 멈춤.
            this.offsetX = e.clientX;
        }
    }

    onUp(e){
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
}