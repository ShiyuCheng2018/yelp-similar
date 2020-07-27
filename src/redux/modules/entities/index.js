import {combineReducers} from "redux";
import products from "./products";
import comments from "./comments";
import shops from "./shops";
import orders from "./orders";

const rootReducer = combineReducers({
	products,
	shops,
	orders,
	comments,
});

export default rootReducer;
