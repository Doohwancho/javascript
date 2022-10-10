export default class Likes {
    constructor() {
        this.likes = [];
    };

    addLike(id, title, author, img){
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);
        
        // Persist data in local storage
        this.persistData();

        return like;
    };

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        // [2,4,8].splice(1,2) -> returns 4,8, original array is [2]
        // [2,4,8].slice(1,1) -> returns 4, original array is [2,4,8]
        this.likes.splice(index, 1); //pass in start idx and how many position we want to take, it then returns the element we want to take and delete them from the original array. so it mutates the original one
        
        // Persist data in local storage
        this.persistData();
    };

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;  
    };

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes',JSON.stringify(this.likes)); //localStorage can only saves string types not object. so convert object to string using json.stringify
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        // Restoring likes from the local storage
        if(storage){
            this.likes = storage;
        }
    }
}

