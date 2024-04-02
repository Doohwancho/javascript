import {Point} from './point.js';

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const MAX_ANGLE = 30;
const FPS = 1000 / 60;
const WIDTH = 160;
const HEIGHT = 160;

export class Dialog{
    constructor(){
        this.pos = new Point(); //사각형 왼쪽 위 첫번째 꼭짓점의 x,y좌표
        this.target = new Point();
        this.prevPos = new Point();
        this.downPos = new Point();
        this.startPos = new Point();
        this.mousePos  = new Point();
        this.centerPos = new Point();
        this.origin = new Point();
        this.rotation = 0;
        this.sideValue = 0;
        this.isDown = false;
    }

    resize(stageWidth, stageHeight){
        // this.pos.x = Math.random() * (stageWidth - WIDTH);
        // this.pos.y = Math.random() * (stageHeight - HEIGHT);
        this.pos.x = 100;
        this.pos.y = 100;

        this.target = this.pos.clone(); //클릭 전엔 초기에 생성된 pos.x랑 pos.y이나, 움직일때 app.js에 move에서 도착지점의 x,y좌표를 받아 dialog.js의 move()에서 this.target을 새롭게 갱신해줌.
        this.prevPos = this.pos.clone();
    }

    animate(ctx){
        const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED);  
        
        //1)move는 원래 위치(x,y)에서 드래그 한 곳(x+n,y+n)까지의 거리인 n,n인데, target은 (x+n,y+n)이니까 n을 구하기 위해 target(x+n,y+n)-현재위치(x,y)를 뺌.
        
        //2)target.clone()안해주면, 원래값에 .subtract()랑 .reduce(speed)에서 계속 0.08곱해서 0되서, 목적지가 0,0로 설정되므로 박스가 왼쪽위 좌표(0,0)으로 계속감.
        
        //3).reduce(0.8)을 안해주면, 드래그한 거리만큼 바로바로 더해주기 때문에, 기~냥 정직하게 따라옴.
        //움직인 거리 n이 10일때, .reduce(0.08)이 없이 그냥 const move = this.target.clone().subtract(this.pos); 만 하면,
        //this.pos.add(10)해서 위치를 바로 옮김. 끌려오는 효과 없음.

        //4).reduce(0.08)로 0.08을 계속 곱해주면, 드래그 거리가 0이될때까지 기하급수적으로 계속 줄어들기 때문에, 속도가 줄어드는것 처럼 보임.
        //예시3과 똑같이 n이 10인 경우,
        //this.pos.add(0.8); 10*0.08 = 0.8
        //this.pos.add(0.7936); (10-0.08)*0.08 = 0.7936
        //this.pos.add(0.063488); ((10-0.08)*0.08)*0.08 = 0.063488
        //...

        //이런 짜잘한 0.몇들씩 .add()로 쥰~내 쌓이면 수백만큼 이동됨. 
        //window.requestAnimationFrame가 1초에 60회 실행되거든.

        //0.몇이나 쥰내 작은숫자들이 쌓여도 결국 드래그한 곳까지는 어떻게든 감. 
        //왜냐면, move = (도착지 - 현재위치) * 속도(0.08)인데,
        //현재위치는 처음엔 도착지부터 쥰내 멈. n이 쥰내 큼. 그래서 빨리감.
        //도착지에 다가가면 다가갈수록 (도착지 - 현재위치)한 값 n이 작아짐. 
        //그래서 move가 작아지기 때문에, 더하는 값이 작아지고, 곧 속도가 느려짐.
        //그래도 0.00몇씩 계~속 더하는것 때문에 막타에 느리게 움직이긴 해도, 도착지-현재위치가 0일때까지(==도착할떄까지) 움직임.

        this.pos.add(move);

        this.centerPos = this.pos.clone().add(this.mousePos);
        
        // ctx.beginPath();
        // ctx.fillStyle = `#f4e55a`;
        // ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT); //사각형의 왼쪽 위 꼭짓점 x,y기준으로 가로길이가 WIDTH, 세로길이가 HEIGHT인 사각형 그림

        this.swingDrag(ctx);

        this.prevPos = this.pos.clone();
    }

    swingDrag(ctx){
        const dx = this.pos.x - this.prevPos.x; //약간 움직인 고 차이. 오른쪽으로 드래그했으면 dx가 양수, 왼쪽으로 드래그했으면 dx가 음수. 
        const speedX = Math.abs(dx) / FPS; //dx를 더 잘게 나눠
        const speed = Math.min(Math.max(speedX, 0), 1); //쥰내 작은값을 또 나누고 또 나누다보면 범위 밖으로 넘어가서 -뜰때가 있나보네. 그걸 방지하기 위해 .max(x, 0)로 최소 0으로 하나보다.
        //근데 또 speedX가 너무 커져버려서 샤샤샥하고 바로 되삐면 안된갑네. 제한을 1로 걸어버렀으라.
        //0부터 1사이의 값이 되것네 스피도는

        let rotation = (MAX_ANGLE / 1) * speed;
        rotation = rotation * (dx > 0 ? 1 : -1) - this.sideValue; //rotation은 오른쪽에 움직이면 +값, 왼쪽으로 움직이면 -값. sideValue가 오른쪽으로 움직이면 -로, 왼쪽으로 움직이면 +로 상쇄해줌.

        this.rotation += (rotation - this.rotation) * ROTATE_SPEED; //dx만큼 기울어짐 

        const tmpPos = this.pos.clone().add(this.origin);  //사각형 왼쪽 위 꼭짓점 기준으로 회전시키는게 아니라, 사각형 내 클릭한 지점 기준으로 회전시키는 거라서 + origin

        ctx.save();
        ctx.translate(tmpPos.x, tmpPos.y);
        ctx.rotate(this.rotation * Math.PI / 180); //돌아가는 각도. 
        ctx.beginPath();
        ctx.fillStyle = `#f4e55a`;
        ctx.fillRect(-this.origin.x, -this.origin.y, WIDTH, HEIGHT); //박스 안 클릭한 지점에서 다시 박스 왼쪽 위 꼭짓점으로 옮기고 사각형그리기.
        ctx.restore(); 
    }

    down(point){
        if(point.collide(this.pos, WIDTH, HEIGHT)){  //여기서 point는 사각형 안 마우스 클릭한 지점, this.pos는 사각형의 원래 x,y좌표
            this.isDown = true; //.move()할수있게 true로 바꿔주고
            this.startPos = this.pos.clone(); //startPos는 원래 박스의 x,y (왼쪽 위 꼭짓점)
            this.downPos = point.clone(); //downPos는 박스 안 클릭한 지점의 x,y위치.
            this.mousePos = point.clone().subtract(this.pos); //mousePos는 사각형의 왼쪽 위 꼭짓점과 사각형 내 내가 클릭한 좌표사이의 거리. this.pos.subtract(point)를 안한건, this.pos가 박스의 왼쪽 위 꼭짓점 이기 때문에, 이곳을 0,0 기준으로 삼으면, 사각형 안에 어느곳을 점찍든 +값이 나오기 때문.

            const xRatioValue = this.mousePos.x / WIDTH;
            // this.origin.x = WIDTH * xRatioValue;
            // this.origin.y = HEIGHT * this.mousePos.y / HEIGHT;
            this.origin.x = this.mousePos.x;
            this.origin.y = this.mousePos.y;

            this.sideValue = xRatioValue - 0.5; //가운데 기준 오른쪽이면 +, 왼쪽이면 -

            return this; //클릭된 사각형 객체 반환
        } else {
            return null;
        }
    }

    move(point){

        if(this.isDown){
            //this.target = this.startPos.clone().add(point).subtract(this.downPos); 
            this.target = point.add(this.startPos.clone()).subtract(this.downPos);
            //둘다 순서만 바뀌었지 똑같은 것. 
            //원래는 위에것이지만, 이해하기는 아랫거가 더 쉽다.

            //사실 this.target = point;만 해도 된다.
            //this.target은 목적지의 x,y좌표이기 때문.
            //근데 굳이 +startPos - downPos를 하는 이유는, 도착했을때 내가 사각형에서 클릭한 그곳만큼 옮겨저 있길 원하기 때문.
            //이걸 안하고 도착하면, 칼같이 박스 왼쪽 위 꼭짓점이 마우스 포인터를 향하게 됨.

            //박스 왼쪽 위 꼭짓점이 0,0이고, 박스 내부에 i,j 지점에 클릭했다고 치자. 처음 드래그 할라고 눌릇을때.
            //startPos - downPos하면 -i,-j이지?
            //참고로 i,j는 박스 왼쪽 위 꼭짓점부터 클릭한 지점까지 떨어진 거리겠지?
            //박스를 목적지까지 옮겼어
            //그럼 박스 왼쪽 위 꼭짓점이 마우스 포인터를 원래는 가르켜야 겠지만,(this.target = point 였다면)
            //맨 처음 떨어진것 만큼 -i,-j하면,
            //맨 첨에 박스 클릭한 지점을 딱 잡은것처럼 밀려날거아녀
        }
    }
    
    up(){
       this.isDown = false; 
    }
}