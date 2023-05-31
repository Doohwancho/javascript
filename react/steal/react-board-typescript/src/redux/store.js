import {createStore} from "redux";
import allReducers from "./reducers";

export const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //TODO - devtool은 디버깅용
