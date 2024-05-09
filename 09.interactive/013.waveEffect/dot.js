const PI2 = Math.PI * 2;
// const BOUNCE = 0.9; //점 하나가 커지는데 움직이는 속도
const BOUNCE = 0.9;

export class Dot{
    constructor(x, y, radius, pixelSize, red, green, blue){
        this.x = x;
        this.y = y;
        this.targetRadius = radius;
        this.radius = 0;
        this.radiusV = 0;
        this.pixelSize = pixelSize;
        this.pixelSizeHalf = pixelSize / 2;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    animate(ctx){
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(
            this.x - this.pixelSizeHalf, //원의 반지름 잡는 것.
            this.y - this.pixelSizeHalf,
            this.pixelSize, this.pixelSize
        );  

        //점의 크기를 동적으로 계속 바꿔주어서 점이 커졌다 작아졌다 하게 만듬 -> 물결이 일렁이는 듯한 효과
        const accel = (this.targetRadius - this.radius) / 2; //this.targetRadius는 고정. this.radius가 0에서 점점 커짐. 
        this.radiusV += accel;
        this.radiusV *= BOUNCE;
        this.radius += this.radiusV; //this.radius + this.radiusV가 this.radius의 원래값인 10을 넘기면, 점이 좀더 커졌다가, accel값이 마이너스되서 다시 작아짐을 반복. this.radius가 this.targetRadius(10)과 완전히 같아져서 accel이 0이 될때까지.

        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false); //
        ctx.fill();
    }
    reset(){
        this.radius = 0;
        this.radiusV = 0;
    }
}