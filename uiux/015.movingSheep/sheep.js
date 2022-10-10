export class Sheep{
    constructor(img, stageWidth){
        this.img = img;

        this.totalFrame = 8; //sprites picture의 프레임 만큼
        this.curFrame = 0;

        this.imgWidth = 360; //각 캐릭터 하나의 넒이와 높이. 360
        this.imgHeight = 300; 

        //864x574

        this.sheepWidth = 180; 
        this.sheepHeight = 150; 

        this.sheepWidthHalf = this.sheepWidth / 2;
        this.x = stageWidth + this.sheepWidth;
        this.y = 0;
        this.speed = Math.random() * 2 + 1;

        this.fps = 24; 
        this.fpsTime = 1000 / this.fps;
    }

    draw(ctx, t, dots){
        // this.curFrame += 1;
        // if(this.curFrame == this.totalFrame){
        //     this.curFrame = 0;
        // }

        if(!this.time){
            this.time = t;
        }

        const now = t - this.time; //requestAnimationFrame의 fps

        if(now > this.fpsTime){ //this.fpsTime == 1000(1초)/24 == 41.6666... 내가 정의한 fps에 도달할 때마다 다음 프레임으로 넘김. 걷는 모션이 8개고, 1초에 24프레임이니까, 1초에 전체 걷는 loop이 3번 iterate되겠군!
            this.time = t;
            this.curFrame += 1;
            if(this.curFrame == this.totalFrame){
                this.curFrame = 0;
            }
        }

        this.animate(ctx, dots);
    }

    animate(ctx, dots){
        this.x -= this.speed;
        const closest = this.getY(this.x, dots);
        this.y = closest.y;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#000000';
        ctx.rotate(closest.rotation);

        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.sheepWidthHalf,
            -this.sheepHeight + 20,
            this.sheepWidth,
            this.sheepHeight
        );
        ctx.restore();
    }

    getY(x, dots){
        for(let i = 1; i < dots.length; i++){
            if(x >= dots[i].x1 && x <= dots[i].x3){ //양이 해당 hill의 x범위 안에 들면, getY2()
                return this.getY2(x, dots[i]);
            }
        }

        return {
            y: 0,
            rotation: 0
        };
    }

    getY2(x, dot){
        const total = 200; //양이 올라와있는 구간을 200개의 촘촘한 비율로 나눔
        let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
        let prevX = pt.x; //x값과 가장 근사한 곡선의 x좌표를 가져옴
        for(let i = 1; i < total; i++){
            const t = i / total; //t는 P0부터 P3까지 거리에서, 비율적으로 얼마만큼 나아갔는지. t가 0에서 1로 갈때동안, 점 A와 B에 가중치를 얼마나 둘것인지를 t로 정함.
            pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);

            if(x >= prevX && x <= pt.x){
                return pt;
            }
            prevX = pt.x;
        }
        return pt;
    }

    //Bezier curve
    //https://blog.coderifleman.com/2016/12/30/bezier-curves/
    getQuadValue(p0, p1, p2, t){
        return (1-t) * (1-t) * p0 + 2 * (1-t) * t * p1 + t * t * p2;
    }

    getPointOnQuad(x1, y1, x2, y2, x3, y3, t){
        const tx = this.quadTangent(x1, x2, x3, t);
        const ty = this.quadTangent(y1, y2, y3, t);
        const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180); //수직이라 수평값 구하려면 90deg더해줘야 하는데, atan2의 리턴값이 deg가 아니라 radiant이니까, (90 * Math.PI / 180)처리해서 90도를 라디안으로 변환해서 더해줌

        return {
            x:this.getQuadValue(x1,x2,x3,t),
            y:this.getQuadValue(y1,y2,y3,t),
            rotation: rotation,
        };
    }


    //곡선 위에 수직선
    //https://stackoverflow.com/questions/45789186/draw-a-line-with-gradient-in-canvas
    //The derivative f'(t) =  2(1-t)(b-a)+2(c-b)t
    quadTangent(a, b, c, t){
        return 2 * (1-t) * (b-a) + 2 * (c-b) * t;
    }
}