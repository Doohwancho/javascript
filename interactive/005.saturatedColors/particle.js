export class Particle{
    constructor(x, y, radius, color, speed){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.maxRadius = radius * (Math.random() * 5);

        this.rgb = color;

        this.vx = speed;
        this.vy = speed;
        // this.vr = Math.random() * 4;

        this.sinValue = Math.random();
    }

    move(ctx, stageWidth, stageHeight){

        this.x += this.vx;
        this.y += this.vy;
        this.sinValue += 0.01;
        this.radius += Math.sin(this.sinValue);

        //when hit border, move opposite
        if(this.x >= stageWidth || this.x <= 0){
            this.vx *= -1;
        }

        if(this.y >= stageHeight || this.y <= 0){
            this.vy *= -1;
        }

        

        ctx.beginPath();
        const g = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius * 0.01,
            this.x,
            this.y,
            this.radius
        );
        g.addColorStop(0, `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},1)`); //.addColorStop(offset(0~1), 색상) 그라데이션 채운다고 보면 됨. 0은 사각형은 젤 왼쪽, arc는 가장 중간. 1은 가장 오른쪽, 바깥쪽.
        g.addColorStop(1, `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},0)`); //.rgba(255,255,255,opacity)
        ctx.fillStyle=g;
        // ctx.fillStyle=`rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},1)`;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    
}