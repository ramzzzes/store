import { combineReducers } from "redux";
import {CartReducer} from "./cart";

const index = combineReducers({
    "cart" : CartReducer
});

export default index;