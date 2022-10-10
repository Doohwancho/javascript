const PI2 = Math.PI * 2;

const COLORS = [
    '#4b45ab',
    '#554fb8',
    '#605ac7',
    '#2a91a8',
    '#2e9ab2',
    '#32a5bf',
    '#81b144',
    '#85b944',
    '#8fc549',
    '#e0af27',
    '#eeba2a',
    '#fec72e',
    '#bf342d',
    '#ca3931',
    '#d7423a',
];

export class Polygon {
    constructor(x, y, radius, sides){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides; //number of figures
        this.rotate = 0; //?
    }

    animate(ctx, moveX){
        ctx.save(); //이전 ctx저장. 이걸 안하면 도형이 안움직이네?
        // ctx.fillStyle='#000';
        // ctx.beginPath();

        const angle = PI2 / this.sides;
        const angle2 = PI2/ 4; //4각형

        ctx.translate(this.x, this.y); //canvas의 원점을 이동

        this.rotate += moveX * 0.008; //드래그 한 만큼 커지는게 moveX. 이걸 시간이 지나면서 속도를 점차 줄여줌.

        ctx.rotate(this.rotate);


        for(let i = 0; i < this.sides; i++){
            const x = this.radius * Math.cos(angle * i); //? - cos : 밑변 / 빗변
            const y = this.radius * Math.sin(angle * i); //? - sin : 세로변 / 빗변

            // (i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y); //n개의 꼭짓점을 이어줌

            /*  .beginPath() / i == 0 / .fill() / .closePath() 주석처리 후, 

                ctx.beginPath();
                ctx.arc(x, y, 30, 0, PI2, false);
                ctx.fill();
            */
            ctx.save(); //얘가없으면 도형 위치들이 개판됨
            ctx.fillStyle=COLORS[i];
            ctx.translate(x,y);
            ctx.rotate(((360 / this.sides) * i + 45) * Math.PI / 180);  //사각형 객체 하나하나가 기울어진 정도
            ctx.beginPath();
            
            for(let j = 0; j < 4; j++){ //각 15개의 각 사각형 객체에 대한 4각형 꼭짓점 좌표 
                const x2 = 120 * Math.cos(angle2 * j);
                const y2 = 120 * Math.sin(angle2 * j);
                (j == 0) ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
            }
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }

        // ctx.fill();
        // ctx.closePath();
        ctx.restore();
    }
}