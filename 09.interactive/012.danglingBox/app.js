import {Point} from './point.js';
import {Dialog} from './dialog.js';

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.mousePos = new Point();
        this.curItem = null; 

        this.items = [];
        this.total = 1;
        for(let i = 0; i < this.total; i++){
            this.items[i] = new Dialog();
        }

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        document.addEventListener('pointerdown', this.onDown.bind(this), false); //When the user puts a finger down on the surface, a pointerdown event is sent
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false); //When the user lifts a finger off the surface, a pointerup event is sent
        
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
        //박스 뒤 그림자가 x축으로 얼마나 쏠리는지
        this.ctx.shadowOffsetX = 0;
        //박스 뒤 그림자가 y축으로 얼마나 쏠리는지
        this.ctx.shadowOffsetY = 3;
        //박스 뒤 그림자의 어두운 정도
        this.ctx.shadowBlur = 6;
        ////박스 뒤 그림자의 색깔. rgba(0,0,0)은 아무색도 안섞은 것이므로 검정색.
        this.ctx.shadowColor = `rgba(0,0,0,1)`;

        //줄의 굵기
        this.ctx.lineWidth = 1;

        for(let i = 0; i < this.items.length; i++){
            this.items[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate(t){
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for(let i = 0; i < this.items.length; i++){
            this.items[i].animate(this.ctx);
        }

        if(this.curItem){
            this.ctx.fillStyle= `#ff4338`;
            this.ctx.strokeStyle= `#ff4338`;
            
            //박스 외부에 빨간 점
            this.ctx.beginPath();
            this.ctx.arc(this.mousePos.x, this.mousePos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            //박스 내부의 빨간 점
            this.ctx.beginPath();
            this.ctx.arc(this.curItem.centerPos.x, this.curItem.centerPos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            //두 점을 이음
            this.ctx.beginPath();
            this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
            this.ctx.lineTo(this.curItem.centerPos.x, this.curItem.centerPos.y);
            this.ctx.stroke();
        }
    }

    onDown(e){
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        for(let i = this.items.length -1; i>=0; i--){
            const item = this.items[i].down(this.mousePos.clone()); //클릭한 곳이 박스 안이면,
            if(item){
                this.curItem = item; //curItem은 현재 클릭된 박스
                const index = this.items.indexOf(item); //현재 클릭된 박스의 인덱스 번호 추출
                this.items.push(this.items.splice(index, 1)[0]); //.splice()는 배열에서 특정 범위 삭제 후 추출. index서부터 한개 추출하면 클릭된 박스 한개만 나옴. [0]은 추출하면 array에 담겨져 있기 때문에 [box]에서 box만 필요하니까 array[0]. 뽑은걸 .push로 배열 마지막에 넣고 break. 근데 왜 맨 뒤로 빼는거지? 그럴이유가 있나?
                break;
            }
        }
    }

    onMove(e){
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        for(let i = 0; i < this.items.length; i++){
            this.items[i].move(this.mousePos.clone()); //모든 박스를 .move()해도, 클릭된것만 .isDown이 true기 때문에, 클릭된것만 움직임.
        }
    }

    onUp(e){
        this.curItem = null; //현재 클릭된 박스 해제

        for(let i = 0; i < this.items.length; i++){
            this.items[i].up(); //클릭된 막스의 .isDown을 다시 false로 바꿔서 .onMove()때문에 움직이지 않게 함.
        }
    }
}

window.onload = () => {
    new App(); 
}