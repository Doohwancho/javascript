class Draw{
    constructor(){
        this.canvas = document.createElement('canvas'); 
        document.body.appendChild(this.canvas); //이것때문일수도
        var img  = new Image();  
        img.src = 'Van_Gogh-Starry_Night.jpg';

        

        img.onload = () => {
            this.ctx = this.canvas.getContext('2d');
            this.ctx.drawImage(img, 0, 0, 500, 200);    
            
        }

        // var img = document.getElementById("scream");
        // ctx.drawImage(img, 10, 10);

    }

        
        


        
        // this.imgPos = { //이미지 가로세로랑 창가로세로랑 어긋날때, 이미지를 어디에 재배치 시킬지에 대한 함수
        //     x: 0,
        //     y: 0,
        //     width: 300,
        //     height: 300,
        // };

        // tCtx.drawImage(//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        //     this.image,
        //     0, 0, //왼쪽위 꼭짓점 시작 위치
        //     this.image.width, this.image.height,  //이미지의 가로, 세로 길이  
        //     this.imgPos.x, this.imgPos.y, //이미지를 캔버스를 위치시킬 좌표(이것도 왼쪽위 꼿짓점 시작 위치). this.imgPos.x = 0, this.imgPos.y = 81
        //     this.imgPos.width, this.imgPos.height, //imgPos.x랑 y기준으로 얼마만큼 사이즈의 image를 그릴건지.
        // );

        // var ctx = this.canvas.getContext('2d'); 

        // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ctx.fillStyle = ctx.createPattern(tempCanvas, 'repeat'); 

        // ctx.beginPath();
        // ctx.rect(0,0,this.canvas.width,this.canvas.height);
        // ctx.fill();

        // this.drawImage();

        // this.ctx.fill();
    
}


window.onload = () => {
    new Draw();
    // var img = new Image();
    // img.src = "http://static6.depositphotos.com/1070439/567/v/450/dep_5679549-Moon-Surface-seamless.jpg";



    // img.onload = function(){
    //     var canvas = document.getElementById('canvas');

    //     // canvas.height = 500;
    //     // canvas.width = 500;
   
    //     var tempCanvas = document.createElement("canvas"),
    //         tCtx = tempCanvas.getContext("2d");
   
    //     // tempCanvas.width = 200;
    //     // tempCanvas.height = 200;
    //     tCtx.drawImage(this, 0, 0, this.width, this.height, 0, 0, 100, 100);
   
    //     // use getContext to use the canvas for drawing
    //     var ctx = canvas.getContext('2d');

    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.fillStyle = ctx.createPattern(tempCanvas, 'repeat');
   
    //     ctx.beginPath();
    //     ctx.rect(0,0,canvas.width,canvas.height);
    //     ctx.fill();
    // }
}