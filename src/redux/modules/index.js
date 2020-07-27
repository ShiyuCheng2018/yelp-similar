import {combineReducers} from "redux";
import entities from "./entities";
import home from "./home";
import detail from "./detail";
import app from "./app";

// combine all reducers

const rootReducer = combineReducers({
	entities,
	home,
	detail,
	app,
});

export default rootReducer;