/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/

import url from "../../utils/url";
import {FETCH_DATA} from "../middlewares/api";
import {getProductById, getProductDetail, schema as productSchema} from "./entities/products";
import {getShopById, schema as shopSchema} from "./entities/shops";
import {combineReducers} from "redux";

export const types = {
	FETCH_PRODUCT_DETAIL_REQUEST: "DETAIL/FETCH_PRODUCT_DETAIL_REQUEST",
	FETCH_PRODUCT_DETAIL_SUCCESS: "DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS",
	FETCH_PRODUCT_DETAIL_FAILURE: "DETAIL/FETCH_PRODUCT_DETAIL_FAILURE",

	FETCH_SHOP_REQUEST: "DETAIL/FETCH_SHOP_REQUEST",
	FETCH_SHOP_SUCCESS: "DETAIL/FETCH_SHOP_SUCCESS",
	FETCH_SHOP_FAILURE: "DETAIL/FETCH_SHOP_FAILURE",
};

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/

const initialState = {
	product: {
		isFetching: false,
		id: null,
	},
	relatedShop: {
		isFetching: false,
		id: null,
	},
};

/***********************************************************************************************************************
 * 													ACTIONS   														   *
 * *********************************************************************************************************************/

export const actions = {
	loadProductDetail: (id) => {
		return (dispatch, getState) => {
			const product = getProductDetail(getState(), id);
			if (product) {
				return dispatch(fetchProductDetailSuccess(id));
			}
			const endpoint = url.getProductDetail(id);
			return dispatch(fetchProductDetail(endpoint, id));
		};
	},
	loadShopById: (id) => {
		return (dispatch, getState) => {
			const shop = getShopById(getState(), id);
			if (shop) {
				return dispatch(fetchShopSuccess(id));
			}
			const endpoint = url.getShopById(id);
			return dispatch(fetchShopById(endpoint, id));
		};
	},
};

const fetchProductDetail = (endpoint, id) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_PRODUCT_DETAIL_REQUEST, types.FETCH_PRODUCT_DETAIL_SUCCESS, types.FETCH_PRODUCT_DETAIL_FAILURE],
		endpoint,
		schema: productSchema,
	},
	id,
});

const fetchShopById = (endpoint, id) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_SHOP_REQUEST, types.FETCH_SHOP_SUCCESS, types.FETCH_SHOP_FAILURE],
		endpoint,
		schema: shopSchema,
	},
	id,
});

const fetchProductDetailSuccess = (id) => ({
	id,
	type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
});

const fetchShopSuccess = (id) => ({
	id,
	type: types.FETCH_SHOP_SUCCESS,
});

/***********************************************************************************************************************
 * 													REDUCERS   														   *
 * *********************************************************************************************************************/

const product = (state = initialState.product, action) => {
	switch (action.types) {
		case types.FETCH_PRODUCT_DETAIL_REQUEST:
			return {...state, isFetching: true};
		case types.FETCH_PRODUCT_DETAIL_SUCCESS:
			return {...state, id: action.id, isFetching: false};
		case types.FETCH_PRODUCT_DETAIL_FAILURE:
			return {...state, isFetching: false, id: null};
		default:
			return state;
	}
};

const relatedShop = (state = initialState.relatedShop, action) => {
	switch (action.types) {
		case types.FETCH_SHOP_REQUEST:
			return {...state, isFetching: true};
		case types.FETCH_SHOP_SUCCESS:
			return {...state, id: action.id, isFetching: false};
		case types.FETCH_SHOP_FAILURE:
			return {...state, isFetching: false, id: null};
		default:
			return state;
	}
};

const reducer = combineReducers({product, relatedShop});

export default reducer;

/***********************************************************************************************************************
 * 													SELECTORS 														   *
 * *********************************************************************************************************************/

export const getProduct = (state, id) => {
	return getProductDetail(state, id);
};

export const getRelatedShop = (state, productId) => {
	const product = getProductById(state, productId);
	let shopId = product ? product.nearestShop : null;
	if (shopId) {
		return getShopById(state, shopId);
	}
	return null;
};
