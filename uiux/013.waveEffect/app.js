import {Ripple} from './ripple.js';
import {Dot} from './dot.js';
import {collide} from './utils.js';

class App{
    constructor(){
        console.log("App constructor loaded..............");

        this.canvas = document.createElement('canvas'); //그림을 넣을 canvas
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.tmpCanvas = document.createElement('canvas'); //dot을 넣을 canvas
        this.tmpCtx = this.tmpCanvas.getContext('2d');

        this.tmpCanvas2 = document.createElement('canvas'); //dot을 넣을 canvas
        this.tmpCtx2 = this.tmpCanvas.getContext('2d');

        this.pixelRatio = 2; //선명도(화질)

        this.ripple = new Ripple();

        window.addEventListener('resize', this.resize.bind(this), false); //창의 크기를 바꿀때 이미지의 크기도 바뀐다.
        this.resize();  

        console.log("canvas stageHeight and Width: "+ this.canvas.width+"   "+this.canvas.height);  //this.canvas.width : 2078, this.canvas.height : 1220

        this.radius = 10; //this.ripple.radius(물결의 반경)이 아니라 점 하나의 반경
        this.pixelSize = 28;
        // this.dots = [];
        
        this.isLoaded = false;
        this.imgPos = { //이미지 가로세로랑 창가로세로랑 어긋날때, 이미지를 어디에 재배치 시킬지에 대한 함수
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

  
        this.image = new Image();  
        this.image.src = 'Van_Gogh-Starry_Night.jpg'; //src를 정해주는것 만으로도, image.onload()발동

        
        window.addEventListener('fillPattern', this.fillPattern.bind(this), false); 
        

        // this.image.height *= 1.3;
        // this.image.width *= 1.3;

        this.toggle = 0; //클릭할때마다 1 to 0, 0 to 1 toggle

        // document.body.appendChild(this.image);
        
        this.image.onload = () => { //이미지 로드
            this.isLoaded = true;

            // this.image.width = 100;                                                            
            // this.image.height = 100;  
            // console.log(this.image.width+"   "+this.image.height);
            //this.image.width == 1135
            //this.image.height == 899

            // console.log("ctx: "+ this.ctx.width+"   "+this.ctx.height); 

            

            // fillPattern(this, 64, 64);
            // change.onchange = change.oninput = function() {
            //     fillPattern(img, this.value, this.value);
            // }

            this.drawImage();
        };
        
        window.requestAnimationFrame(this.animate.bind(this)); //재귀로 걸어야 실행됨. 왜?
        /*
            window.requestAnimationFrame는 css에 transition으로 처리하기 어려운 에니메이션,
            html5, canvas, svg등의 에니메이션 구현을 위해 사용하는 함수
            난이도는 꽤 있는 편. 모든 에니메이션을 프레임 단위로 지정해 주어야 하기 때문.

            window.requestAnimationFrame 함수 자체는 비동기 함수.
            스스로를 반복호출하지 않기 때문에, window.requestAnimationFrame함수로 다음 함수를 반복하려면,
            재귀적으로 window.requestAnimationFrame함수를 다시 호출해 주어야 함.

            예시)

            //////////////////////////////////////////////////////////

            var el = document.querySelector('#움직일-요소');
            var left = 0;
            
            function frame() {
                left += 0.1;
                el.style.setProperty('transform', 'translateX(' + left + 'px)');
            
                window.requestAnimationFrame(frame);
            }
            
            window.requestAnimationFrame(frame);

            //if(left < 200) window.requestAnimationFrame(frame);

            //////////////////////////////////////////////////////////

            영원히 왼쪽으로 0.1씩 움직임.

            재귀로 계속 돌기 때문.

            .requestAnimationFrame()는 모니터의 주사율에 맞춰서 함수 실행
            60FPS : 1초에 60번 실행
            140FPS : 1초에 140번 실행

        */

        this.canvas.addEventListener('click', this.onClick.bind(this), false); //클릭하면 onClick()함수 실행
    }
 
    resize(){

        this.stageWidth = document.body.clientWidth; //창 가로 길이 : 1039
        this.stageHeight = document.body.clientHeight; //창 세로 길이 : 610

        this.canvas.width = this.stageWidth * this.pixelRatio; //2078
        this.canvas.height = this.stageHeight * this.pixelRatio; //1220

        this.tmpCanvas.width = this.stageWidth;
        this.tmpCanvas.height = this.stageHeight;

        //campus for image
        this.tmpCanvas2.width = this.stageWidth * this.pixelRatio;
        this.tmpCanvas2.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio); //.scale() ? .scale(2,2)는 원래 ctx에 가로세로 두배라는 뜻.

        this.ripple.resize(this.stageWidth, this.stageHeight);


        if(this.isLoaded){
            fillPattern(this.image, 300, 300);
            // this.drawImage();
        } 
        
    }

    drawImage(){

        const stageRatio = this.stageWidth / this.stageHeight; //1.7 정도. 가로를 세로로 나눈 비율. 이미지에 비해 가로가 더 긴편.
        const imgRatio = this.image.width / this.image.height; //1.26 정도. 이미지의 라로를 이미지의 세로로 나눈 것. 창에 비해 세로가 더 김.

        this.imgPos.width = this.stageWidth;
        this.imgPos.height = this.stageHeight;

        
        if(imgRatio > stageRatio){ //창의 가로:세로 비율이 그림의 가로:세로 비율보다 더 길면,
            this.imgPos.width = Math.round(
                this.image.width * (this.stageHeight / this.image.height)
            );
            this.imgPos.x = Math.round(
                (this.stageWidth - this.imgPos.width) / 2
            ); 
        } else { //이미지의 세로비율이 세로비율이 창의 세로비율보다 더 길면,
            this.imgPos.height = Math.round( //Math.round() 반올림. //this.imgPos.height = 615
                this.image.height * (this.stageWidth / this.image.width) //this.image.height : 899, this.image.width : 1135. Van Gogh의 Starry Night는 가로가 더 긴 그림.
            );
            this.imgPos.y = Math.round( //this.imgPos.y = 81
                (this.stageHeight - this.imgPos.height) / 2
            );
        }

        // var adjustRatio = 1;

        // if(this.stageWidth < this.image.width){
        //     this.image.width = this.image.width - (this.image.width - this.stageWidth);
        //     adjustRatio = this.image.width / this.stageWidth;
            
        // }

        this.ctx.drawImage(//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            this.image,
            0, 0, //왼쪽위 꼭짓점 시작 위치
            this.image.width, this.image.height,  //이미지의 가로, 세로 길이  
            this.imgPos.x, this.imgPos.y, //이미지를 캔버스를 위치시킬 좌표(이것도 왼쪽위 꼿짓점 시작 위치). this.imgPos.x = 0, this.imgPos.y = 81
            this.imgPos.width, this.imgPos.height, //imgPos.x랑 y기준으로 얼마만큼 사이즈의 image를 그릴건지.
        );

        this.tmpCtx.drawImage( 
            this.image,
            0, 0,
            this.image.width, this.image.height,
            this.imgPos.x, this.imgPos.y,
            this.imgPos.width, this.imgPos.height,
        );

        this.tmpCtx2.drawImage( 
            this.image,
            0, 0,
            this.image.width, this.image.height,
            this.imgPos.x, this.imgPos.y,
            this.imgPos.width, this.imgPos.height,
        );

        
        this.imgData = this.tmpCtx.getImageData(0, 0, this.stageWidth, this.stageHeight); //버블의 점색깔 만들때 씀

        this.drawDots();
    }

    // Fills canvas with image as pattern at size w,h
    fillPattern(img, w, h) {
        //draw once
        this.tmpCtx2.drawImage(img, 0, 0, w, h);

        while (w < this.canvas.width) {
            this.tmpCtx2.drawImage(this.canvas, w, 0);
            w <<= 1;  // shift left 1 = *2 but slightly faster
        }
        while (h < this.canvas.height) {
            this.tmpCtx2.drawImage(canvas, 0, h);
            h <<= 1;
        }
    }


    drawDots(){

        this.dots = [];

        this.columns = Math.ceil(this.stageWidth / this.pixelSize);
        this.rows = Math.ceil(this.stageHeight / this.pixelSize);

        for(let i = 0; i < this.rows; i++){
            const y = (i + 0.5) * this.pixelSize;
            const pixelY = Math.max(Math.min(y, this.stageHeight), 0);
            
            for(let j = 0; j < this.columns; j++){
                const x = (j + 0.5) * this.pixelSize;
                const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

                const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
                
                const red = this.imgData.data[pixelIndex + 0]; //?
                const green = this.imgData.data[pixelIndex + 1];
                const blue = this.imgData.data[pixelIndex + 2];

                const dot = new Dot(
                    x, y,
                    this.radius,
                    this.pixelSize,
                    red, green, blue,
                );

                this.dots.push(dot);
            }

        }
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this)); //재귀로 걸어야 됨. 재귀이기 때문에 이 함수가 1초에 n-FPS만큼 계~속 무한히 실행중

        // 이걸 설정하면 열자마자 바로 나감
        // this.ripple.x = 300;
        // this.ripple.y = 200;
        // this.ripple.radius = 100;
        // this.ripple.maxRadius = 500;


        if(this.toggle === 1){ //한번 클릭후 이부분 계속 실행. 한번 더 클릭하면 else로 바뀜
            

            this.ripple.animate(this.ctx);
            //draw dots 
            for(let i = 0; i < this.dots.length; i++){
                const dot = this.dots[i];
    
                if(collide( //dot의 x,y가 퍼저나가는 물결반경(this.ripple.radius) 안에 있으면 동작. 이 if문이 없으면, 애초에 그림에 버블이 입혀져 로드되고(제한이 없기 때문), 클릭시 전체 버블이 움직임.
                    dot.x, dot.y,
                    this.ripple.x, this.ripple.y,
                    this.ripple.radius
                )){
                    dot.animate(this.ctx); //draw dot
                }
                //추가 
            }
        } else { //클릭전 이부분 계속 실행
            //this.ctx = black
            // this.tmpCtx = bubble 
             
            // this.ctx.drawImage(//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            //     this.image,
            //     0, 0, //왼쪽위 꼭짓점 시작 위치
            //     this.image.width, this.image.height,  //이미지의 가로, 세로 길이  
            //     this.imgPos.x, this.imgPos.y, //이미지를 캔버스를 위치시킬 좌표(이것도 왼쪽위 꼿짓점 시작 위치). this.imgPos.x = 0, this.imgPos.y = 81
            //     this.imgPos.width, this.imgPos.height, //imgPos.x랑 y기준으로 얼마만큼 사이즈의 image를 그릴건지.
            // );


            // var imgInfo = {
            //     this.image,
            //     0, 0, 
            //     this.image.width, this.image.height,  
            //     this.imgPos.x, this.imgPos.y, 
            //     this.imgPos.width, this.imgPos.height, 
            // };

            // console.log("this.image.width: "+this.image.width+" this.image.height: "+this.image.height);
            // console.log("this.width: "+this.stageWidth+" this.height: "+this.stageHeight);
            // console.log("this.ctx.width: "+this.ctx.stageWidth+" this.ctx.height: "+this.ctx.stageHeight);

            // this.image.width = 1600;
            // this.image.height = 1600; 

            this.ripple.animateOriginalImage(this.ctx, this.image, this.tmpCtx2, this.canvas);

            
            // if(collide()){

            // }
        }
    }

    onClick(e){
        this.toggle ^= 1;

        //이건 다시 클릭했을때 리셋하기 위해 있는 부분
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        if(this.toggle === 1){
            //이건 다시 클릭했을때 리셋하기 위해 있는 부분
            this.ctx.drawImage(
                this.image,
                0, 0,
                this.image.width, this.image.height,
                this.imgPos.x, this.imgPos.y,
                this.imgPos.width, this.imgPos.height,  
            );
        } else {
            for(let i = 0; i < this.dots.length; i++){
                const dot = this.dots[i];
                dot.animate(this.ctx); //draw dot
            }

            //이 파트가 없어도, 첫 클릭시엔 ripple effect가 잘 일어나나,
            //2번째부터 클릭시 dot의 this.radius와 this.radiusV 값을 다시 초기화 시켜주어야 함. 서로 값이 같아진 상태라
            //점의 크기가 변하지 않으므로 ripple effect가 안일어남.
            for(let i = 0; i < this.dots.length; i++){
                this.dots[i].reset();
            }
        }


        //클릭했을 시점의 마우스 커서 x,y지점
        this.ripple.start(e.offsetX, e.offsetY);
    }
}

window.onload = () => {
    new App();
}