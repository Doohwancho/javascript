import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    };

    addItem (count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient,
        }
        this.items.push(item);
        return item;
    };

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        // [2,4,8].splice(1,2) -> returns 4,8, original array is [2]
        // [2,4,8].slice(1,1) -> returns 4, original array is [2,4,8]
        this.items.splice(index, 1); //pass in start idx and how many position we want to take, it then returns the element we want to take and delete them from the original array. so it mutates the original one
    };

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    };
}