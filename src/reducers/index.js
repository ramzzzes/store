import { combineReducers } from "redux";
import {CartReducer} from "./cart";
import {CurrencyReducer} from "./currencies";

const index = combineReducers({
    "cart" : CartReducer,
    "currencies" : CurrencyReducer,
});

export default index;