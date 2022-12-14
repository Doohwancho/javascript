import{Point} from './point.js';

export class Wave{
    constructor(index, totalPoints, color){
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        this.pointGap = this.stageWidth / (this.totalPoints - 1); //각각 포인트의 간격

        this.init();
    }

    init(){
        this.points = [];

        for(let i = 0; i < this.totalPoints; i++){
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY,
            );
            this.points[i] = point;
        }
    }

    draw(ctx){
        ctx.beginPath();
        // ctx.fillStyle='#ff0000';
        // this.point.update();
        // ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
        // ctx.fill();

        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for(let i = 1; i < this.totalPoints; i++){
            if(i < this.totalPoints - 1){
                this.points[i].update();    
            }

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            // ctx.lineTo(cx, cy); //직선
            ctx.quadraticCurveTo(prevX, prevY, cx, cy); //https://fromyou.tistory.com/563  point A,B사이 중간지점 지정해 주면 곡선나옴.


            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }
        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}