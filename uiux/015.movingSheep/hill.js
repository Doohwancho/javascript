export class Hill{

    constructor(color, speed, total){
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stagewidth, stageHeight){
        this.stagewidth = stagewidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stagewidth / (this.total - 2)); //딱맞게 설정한게 아니라, 좀 넉넉하게 해서 스테이지보다 크게끔. 그래야 나중에 양이 화면 밖에서 자연스럽게 걸어오거든.

        for(let i = 0; i < this.total; i++){
            this.points[i] = {
                x: i * this.gap,
                y: this.getY()
            };
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed;

        //왼쪽 화면에서 튀어나올려고 치면 새로운 언덕 1번째에 넣어줌.
        if(cur.x > -this.gap){
            this.points.unshift({ //.unshift() : inserts a new element at the start of arr
                x: -(this.gap * 2), //왼쪽 화면 밖 -(this.gap * 2)이전부터 시작함. 
                y: this.getY()
            });
        } else if(cur.x > this.stagewidth){ //언덕이 화면밖으로 나가면, 배열에서 빼주고
            this.points.splice(-1); //.splice()로 마지막 element(==[-1])을 빼서 첫번째 인덱스에 다시 넣어줌
        }

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for(let i = 1; i < this.points.length; i++){
            cur = this.points[i];
            cur.x += this.speed; //모든 점이 같은 속도로 오른쪽으로 움직임
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy); //arc그리려면 점a랑 b사이에 좌표랑 점 a의 좌표주면 그려주나보네

            //Bezier curve에 들어갈 파라미터들
            dots.push({
                x1: prevCx, //x1->x2 사이의 중간. 이전 cx
                y1: prevCy,
                x2: prev.x, //x1
                y2: prev.y,
                x3: cx,     //x1->x2 사이의 중간.
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stagewidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();

        return dots; //나중의 양의 좌표 쓸때 써야해서 굴곡진 산등(?)의 x,y 좌표값을 리턴값으로 넘겨줌
    }

    getY(){
        const min = this.stageHeight / 8;
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}