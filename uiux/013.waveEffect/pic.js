
export class Pic{

    constructor(x, y, radius, pixelSize){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.pixelSize = pixelSize;
        this.pixelSizeHalf = pixelSize / 2;
    }

    animate(ctx){
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(
            this.x - this.pixelSizeHalf, //원의 반지름 잡는 것.
            this.y - this.pixelSizeHalf,
            this.pixelSize, this.pixelSize
        );  

        ctx.beginPath();
        ctx.fillStyle = '#ff00ff';
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false); //
        ctx.fill();
    }
    reset(){
        this.radius = 0;
    }
}