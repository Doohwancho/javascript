import {distance} from './utils.js';

export class Ripple{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.maxRadius = 0;
        this.speed = 10;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    start(x, y){
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = this.getMax(x, y);
    }

    getMax(x, y){
        const c1 = distance(0, 0, x, y); //클릭한 좌표 (x,y)부터 왼쪽 위 꼭짓점까지 거리
        const c2 = distance(this.stageWidth, 0, x, y); //클릭한 좌표 (x,y)부터 오른쪽 위 꼭짓점까지 거리
        const c3 = distance(0, this.stageHeight, x, y); //클릭한 좌표 (x,y)부터 왼쪽 아래 꼭짓점까지 거리
        const c4 = distance(this.stageWidth, this.stageHeight, x, y); //클릭한 좌표 (x,y)부터 오른쪽 아래 꼭짓점까지 거리
        return Math.max(c1, c2, c3, c4);
    }

    animate(ctx){
        if(this.radius < this.maxRadius){
            this.radius += this.speed; //이것 때문에 원의 크기가 점점 커짐
        }
        ctx.beginPath();
        // ctx.fillStyle = '#00ff00';
        // ctx.drawImage(ctx., 0, 0);

        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
    }

    animateOriginalImage(ctx, image, tmpCtx2, canvas){
        // console.log(this.x);

        if(this.radius < this.maxRadius){
            this.radius += this.speed; //이것 때문에 원의 크기가 점점 커짐
        }
        
        if(this.x > 0){  
            // console.log(this.x);

            ctx.beginPath();
            ctx.clearRect(0, 0, ctx.stageWidth, ctx.stageHeight);  //검정색 화면으로 다시 바꿔줌

            //canvas's size = 2078 1220

            // console.log("this.image.width: "+image.width+" this.image.height: "+image.height); //1135, 899
            // console.log("this.width: "+this.stageWidth+" this.height: "+this.stageHeight); //1039, 610
            // console.log("this.ctx.width: "+ctx.width+" this.ctx.height: "+ctx.height);  //undefined, undefined
            //console.log("canvas size: "+canvas.width+"  "+canvas.height); //2078, 1220
            // console.log("canvas size: "+canvas.stageWidth+"  "+canvas.stageHeight); //undefined, undefined

            // image.width = 1300; //이건 arc안에 이미지가 아니라, ripple efftect 후 이미지의 사이즈 바꿈
            // image.height = 1300;

            

            //this.stageWidth = 200; //이건 ripple의 반경을 의미함.
            //this.stageHeight = 100;

            // ctx.width = 200; //어느 숫자로 바꿔봐도 아무 의미 없음
            // ctx.height = 100;

            // ctx.stageWidth = 200; //얘는 숫자를 지정하면 물결그림에 영향미치는게 아니라 원래 그림 캔버스에 영향미침
            // ctx.stageHeight = 300;
        
            
            
            // var pattern = ctx.createPattern(image, "no-repeat"); //이건 되는데 사이즈가 안맞음
            // var pattern = ctx.createPattern(tmpCtx, "no-repeat"); //
            // ctx.rect(0,0,300,300);  //이러면 그림이 그냥 뜸
            // ctx.scale(1.001,1); //ㅋㅋㅋ 오른쪽 아랫쪽으로 늘리네 계속

            tmpCtx2.drawImage(image, 0, 0, 1300, 1300);
            
            

            var pattern = tmpCtx2;

            ctx.fillStyle=pattern;
            

            ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            // ctx.fillRect(50,50,100,100);
            ctx.fill();
            // ctx.stroke(); //spiderman!
            
        }
    }
}