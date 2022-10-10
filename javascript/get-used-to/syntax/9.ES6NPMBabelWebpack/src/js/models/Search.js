/*
//practice01
export default 'I am exported string.';
*/
import axios from 'axios';
import {key, proxy} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        // const proxy = '';
        // const key = 'origically exists, but skips for newly built forkify-api'; //if key is incorrect, it will throw error 403. for this case, use try-catch for error handling
        try{
            //fetch(); //problem with fetch function is, it does not work on old browsers. so use axios instead. install it using npm. npm install axios --save
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`); //automatically converts it to json, unlike fetch() that needs two steps.
            this.result = res.data.recipes;
        } catch(error) {
                alert(error);
        }
    };
}