var arr = [5,2,9];
Array.prototype.descSort = function() { //Array 자료구조, parent, 본체, prototype에 커스텀 sort인 descsort() 이식하면 모든 child array들이 공유함
    return this.sort((a,b) => b - a);
}

arr.sort();
console.log(arr); //2,5,9

arr.descSort();
console.log(arr); //9,5,2