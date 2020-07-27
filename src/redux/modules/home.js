import {get} from "../../utils/request";
import url from "../../utils/url";
import {FETCH_DATA} from "../middlewares/api";
import {schema} from "./entities/products";

export const params = {
	PATH_LIKES: "likes",
	PATH_DISCOUNTS: "discounts",
	PAGE_SIZE_LIKES: 5,
	PAGE_SIZE_DISCOUNTS: 3,
};

export const types = {
	FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
	FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
	FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",

	FETCH_DISCOUNTS_REQUEST: "HOME/DISCOUNTS_REQUEST",
	FETCH_DISCOUNTS_SUCCESS: "HOME/DISCOUNTS_SUCCESS",
	FETCH_DISCOUNTS_FAILURE: "HOME/DISCOUNTS_FAILURE",
};

const initialState = {
	likes: {
		isFetching: false,
		pageCount: 0,
		ids: [],
	},
	discounts: {
		isFetching: false,
		ids: [],
	},
};

export const actions = {
	loadLikes: () => {
		return (dispatch, getState) => {
			const {pageCount} = getState().home.likes;
			const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
			const endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES);
			return dispatch(fetchLikes(endpoint));
		};
	},
	loadDiscounts: () => {
		return (dispatch, getState) => {
			const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
			return dispatch(fetchDiscounts(endpoint));
		};
	},
};

const fetchLikes = (endpoint) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_LIKES_REQUEST, types.FETCH_LIKES_SUCCESS, types.FETCH_LIKES_FAILURE],
		endpoint,
		schema,
	},
});

const fetchDiscounts = (endpoint) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_DISCOUNTS_REQUEST, types.FETCH_DISCOUNTS_SUCCESS, types.FETCH_DISCOUNTS_FAILURE],
		endpoint,
		schema,
	},
});

const reducer = (state = {}, action) => {
	switch (action.type) {
		case types.FETCH_LIKES_REQUEST:
			//todo
			return;
		case types.FETCH_LIKES_SUCCESS:
			// todo
			return;
		case types.FETCH_LIKES_FAILURE:
			//todo
			return;
		default:
			return state;
	}
};

export default reducer;
