export class Point{
    constructor(x, y){ 
        this.x = x || 0; //|| specify a default value. undefined, null, empty string 같은 올바르지 않은 데이터 타입 들어왔을 경우 해결.
        this.y = y || 0;
    }

    add(point){
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    subtract(point){
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    //x에 0.08씩 계속 곱해서 0을 만듬 == 속도를 늦춤
    reduce(value){
        this.x *= value;
        this.y *= value;
        return this;
    }

    //this.x가 클릭한 지점x고 point가 사각형의 x,y
    //새로 클릭한 지점(this.x, this.y)이 사각형의 4꼭짓점 boundary(x,y,x+width,y+height)안에 있으면 return true, 클릭한 지점이 사각형 밖이면 return false
    collide(point, width, height){
        if(this.x >= point.x &&
            this.x <= point.x + width &&
            this.y >= point.y &&
            this.y <= point.y + height){
                return true;
            } else{
                return false;
            }
    }

    clone(){
        return new Point(this.x, this.y);
    }
}