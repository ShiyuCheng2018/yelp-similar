import url from "../../utils/url";
import {FETCH_DATA} from "../middlewares/api";
import {getKeywordById, schema as keywordSchema} from "../modules/entities/keywords";
import {schema as shopSchema} from "./entities/shops";
import {combineReducers} from "redux";

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/

export const types = {
	FETCH_POPULAR_KEYWORDS_REQUEST: "FETCH_POPULAR_KEYWORDS_REQUEST",
	FETCH_POPULAR_KEYWORDS_SUCCESS: "FETCH_POPULAR_KEYWORDS_SUCCESS",
	FETCH_POPULAR_KEYWORDS_FAILURE: "FETCH_POPULAR_KEYWORDS_FAILURE",

	FETCH_RELATED_KEYWORDS_REQUEST: "FETCH_RELATED_KEYWORDS_REQUEST",
	FETCH_RELATED_KEYWORDS_SUCCESS: "FETCH_RELATED_KEYWORDS_SUCCESS",
	FETCH_RELATED_KEYWORDS_FAILURE: "FETCH_RELATED_KEYWORDS_FAILURE",

	FETCH_SHOPS_REQUEST: "FETCH_SHOPS_REQUEST",
	FETCH_SHOPS_SUCCESS: "FETCH_SHOPS_SUCCESS",
	FETCH_SHOPS_FAILURE: "FETCH_SHOPS_FAILURE",

	SET_INPUT_TEXT: "SEARCH/SET_INPUT_TEXT",
	CLEAR_INPUT_TEXT: "SEARCH/CLEAR_INPUT_TEXT",

	ADD_HISTORY_KEYWORD: "SEARCH/ADD_HISTORY_KEYWORD",
	CLEAR_HISTORY_KEYWORDS: "SEARCH/CLEAR_HISTORY_KEYWORD",
};

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/

const initialState = {
	inputText: "",
	popularKeywords: {
		isFetching: false,
		ids: [],
	},
	/*
	 *  relatedKeywords: {
	 * 		'XXX':{
	 * 			isFetching: false,
	 * 			ids: []
	 * 		}
	 *  }
	 * */
	relatedKeywords: {},
	historyKeywords: [],
	searchedShopsByKeyword: {},
};

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
	loadPopularKeywords: () => {
		return (dispatch, getState) => {
			const {ids} = getState().search.popularKeywords;
			if (ids.length > 0) {
				return null;
			}
			const endpoint = url.getPopularKeywords();
			return dispatch(fetchPopularKeywords(endpoint));
		};
	},
	loadRelatedKeywords: (text) => {
		return (dispatch, getState) => {
			const {relatedKeywords} = getState().search;
			if (relatedKeywords[text]) {
				return null;
			}
			const endpoint = url.getRelatedKeywords(text);
			return dispatch(fetchRelatedKeywords(text, endpoint));
		};
	},
	loadRelatedShops: (keyword) => {
		return (dispatch, getState) => {
			const {searchedShopsByKeyword} = getState().search;
			if (searchedShopsByKeyword[keyword]) {
				return null;
			}
			const endpoint = url.getRelatedShops(keyword);
			return dispatch(fetchRelatedShops(keyword, endpoint));
		};
	},
	setInputText: (text) => ({
		type: types.SET_INPUT_TEXT,
		text,
	}),
	clearInputText: () => ({
		type: types.CLEAR_INPUT_TEXT,
	}),
	addHistoryKeyword: (keywordId) => ({
		type: types.ADD_HISTORY_KEYWORD,
		text: keywordId,
	}),
	clearHistoryKeywords: () => ({
		type: types.CLEAR_HISTORY_KEYWORDS,
	}),
};

const fetchPopularKeywords = (endpoint) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_POPULAR_KEYWORDS_REQUEST, types.FETCH_POPULAR_KEYWORDS_SUCCESS, types.FETCH_POPULAR_KEYWORDS_FAILURE],
		endpoint,
		schema: keywordSchema,
	},
});

const fetchRelatedKeywords = (text, endpoint) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_RELATED_KEYWORDS_REQUEST, types.FETCH_RELATED_KEYWORDS_SUCCESS, types.FETCH_RELATED_KEYWORDS_FAILURE],
		endpoint,
		schema: keywordSchema,
	},
	text,
});

const fetchRelatedShops = (text, endpoint) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_SHOPS_REQUEST, types.FETCH_SHOPS_SUCCESS, types.FETCH_SHOPS_FAILURE],
		endpoint,
		schema: shopSchema,
	},
	text,
});

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const popularKeywords = (state = initialState.popularKeywords, action) => {
	switch (action.type) {
		case types.FETCH_POPULAR_KEYWORDS_REQUEST:
			return {...state, isFetching: true};
		case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
			return {...state, isFetching: false, ids: state.ids.concat(action.response.ids)};
		case types.FETCH_POPULAR_KEYWORDS_FAILURE:
			return {...state, isFetching: false};
		default: {
			return state;
		}
	}
};

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
	switch (action.type) {
		case types.FETCH_RELATED_KEYWORDS_REQUEST:
		case types.FETCH_RELATED_KEYWORDS_SUCCESS:
		case types.FETCH_RELATED_KEYWORDS_FAILURE:
			return {
				...state,
				[action.text]: relatedKeywordsByText(state[action.text], action),
			};
		default:
			return state;
	}
};
const searchShopsByKeyword = (state = initialState.searchedShopsByKeyword, action) => {
	switch (action.type) {
		case types.FETCH_SHOPS_REQUEST:
		case types.FETCH_SHOPS_SUCCESS:
		case types.FETCH_SHOPS_FAILURE:
			return {
				...state,
				[action.text]: searchShops(state[action.text], action),
			};
		default:
			return state;
	}
};

const relatedKeywordsByText = (state = {isFetching: false, ids: []}, action) => {
	switch (action.type) {
		case types.FETCH_RELATED_KEYWORDS_REQUEST:
			return {...state, isFetching: true};
		case types.FETCH_RELATED_KEYWORDS_SUCCESS:
			return {...state, isFetching: false, ids: state.ids.concat(action.response.ids)};
		case types.FETCH_RELATED_KEYWORDS_FAILURE:
			return {...state, isFetching: false};
		default:
			return state;
	}
};

const searchShops = (state = {isFetching: false, ids: []}, action) => {
	switch (action.type) {
		case types.FETCH_SHOPS_REQUEST:
			return {...state, isFetching: true};
		case types.FETCH_SHOPS_SUCCESS:
			return {...state, isFetching: false, ids: action.response.ids};
		case types.FETCH_SHOPS_FAILURE:
			return {...state, isFetching: false};
		default:
			return state;
	}
};

const inputText = (state = initialState.inputText, action) => {
	switch (action.type) {
		case types.SET_INPUT_TEXT:
			return action.text;
		case types.CLEAR_INPUT_TEXT:
			return "";
		default:
			return state;
	}
};

const historyKeywords = (state = initialState.historyKeywords, action) => {
	switch (action.type) {
		case types.ADD_HISTORY_KEYWORD:
			const data = state.filter((item) => {
				return item !== action.text;
			});
			return [action.text, ...data];
		case types.CLEAR_HISTORY_KEYWORDS:
			return [];

		default:
			return state;
	}
};

export default combineReducers({
	popularKeywords,
	relatedKeywords,
	inputText,
	historyKeywords,
	searchShopsByKeyword,
});
/***********************************************************************************************************************
 * 													SELECTORS 														   *
 * *********************************************************************************************************************/

export const getPopularKeywords = (state) => {
	return state.search.popularKeywords.ids.map((id) => {
		return getKeywordById(state, id);
	});
};

export const getRelatedKeywords = (state) => {
	const text = state.search.inputText;
	if (!text || text.trim().length === 0) {
		return [];
	}
	const relatedKeywords = state.search.relatedKeywords[text];

	if (!relatedKeywords) {
		return [];
	}
	return relatedKeywords.ids.map((id) => {
		return getKeywordById(state, id);
	});
};

export const getInputText = (state) => {
	return state.search.inputText;
};

export const getHistoryKeywords = (state) => {
	return state.search.historyKeywords.map((id) => {
		return getKeywordById(state, id);
	});
};
