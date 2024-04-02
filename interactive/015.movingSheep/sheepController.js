import {
    Sheep
} from "./sheep.js";

export class SheepController{
    constructor(){
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = 'sheep.png';
        // this.img.src = 'css_sprites.png';

        this.items = []; //양이 담겨있는 곳

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded(){
        this.isLoaded = true;
        this.addSheep();
    }

    addSheep(){
        this.items.push(
            new Sheep(this.img, this.stageWidth)
        );
    }

    draw(ctx, t, dots){
        if(this.isLoaded){
            this.cur += 1;
            if(this.cur > 200){ //다음번째 양이 생성되는 간격
                this.cur = 0;
                this.addSheep();
            }

            for(let i = this.items.length - 1; i >= 0; i--){
                const item = this.items[i];
                if(item.x < -item.sheepWidth){ //왼쪽 화면 너머로 사라지면, 
                    this.items.splice(i, 1); //i번째 양을 지움
                } else {
                    item.draw(ctx, t, dots);
                }
            }
        }
    }
}