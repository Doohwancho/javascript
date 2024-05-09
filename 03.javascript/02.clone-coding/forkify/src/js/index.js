/*
//practice01
import str from './models/Search';
// import {add as a, multiply as m, ID} from './views/searchView'; //we have to use exact same name as described in searchView.js
import * as searchView from './views/searchView';

// console.log(`Using imported functions! ${a(ID, 2)} and ${m(3, 5)}. ${str}.`);
console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${str}.`);
*/

// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
import { elements, renderLoader, clearLoader } from './views/base';

//concept of 'application state' and how to implement it
//put all data at current moment to one place, one object
//Redux from react is a popular state management library
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
// window.state = state;

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if(query){
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // 4) Search for recipes
            await state.search.getResults(); //b/c getResults() is async function, async functions always returns a promise. we then have to wait until promise resolves and comes back with data

            // 5) render results on UI - we only want this to happen after we receive the data from API. so use await for state.search.getResults()
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err){
            alert('Something wrong with the search..');
            clearLoader();
        }
    };
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //b/c when search button is clicked, page reloads and we dont want that.
    controlSearch();
});


//problem : when click a button, if text clicked, console.log() says '<span>Page 2<span>' 
//          while clicking other area of the button gives us <use href="img/icons.svg#icon-triangle-right"></use>
//solution : use .closest() for button clicks
elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline'); //no matter where to click on button, finds the closest tag to '.btn-inline'
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10); //b/c we saved "data-goto=${page number}". very handy way to get access to data. string to int(10진수)
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    };
    
});

/**
 * RECIPE CONTROLLER
 */
// const r = new Recipe(46956);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {
    // Get ID from the url
    const id = window.location.hash.replace('#','');

    if(id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if(state.search){
            searchView.highlightSelected(id);
        } 

        // Create new recipe object
        state.recipe = new Recipe(id);
        
        try{
            // Get recipe data
            await state.recipe.getRecipe();
            // console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id) //error b/c whenever we reloads a page, we don't have state.likes
            );
            
        } catch (err){
            console.log(err);
            alert('Error processing recipe!');
        }
    };
};
//whenever we change the hash, it will log current hash to console
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

//how to add the same event listner to different events?
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if(!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient); 
        listView.renderItem(item);
    });
};

// Handle delete and update list item events
elements.shopping.addEventListener('click', e =>{
    const id = e.target.closest('.shopping__item').dataset.itemid; //<li class="shopping__item" 에 추가한 data-itemid = ${item.id}> 를 closest(하위포함) 가리키는 것.

    //Handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    // Handle the count update
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/**
 * LIKE CONTROLLER
 */

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has NOT yet liked current recipe
    if(!state.likes.isLiked(currentID)){
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

    // User has liked current recipe
    } else {
        // Remove like to the state
        state.likes.deleteLike(currentID);
        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like to UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){ //matches('.classname, .classname *') means finds html tag that either matches with .classname or any child element of that .classname
        // Decrease when button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        // Increases when button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){ //.recipe__btn--add * 은 .recipe__btn--add 아래 tag아무거나 걸렸을 경우도 포함이라는 뜻
        // Add ingredients to shopping list
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        // Like controller
        controlLike();
    }
});