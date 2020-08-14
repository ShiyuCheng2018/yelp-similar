import url from "../../utils/url";
import {FETCH_DATA} from "../middlewares/api";
import {AVAILABLE_TYPE, REFUND_TYPE, schema, TO_PAY_TYPE} from "./entities/orders";
import {combineReducers} from "redux";

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/

export const types = {
	FETCH_ORDERS_REQUEST: "USER/FETCH_ORDERS_REQUEST",
	FETCH_ORDERS_SUCCESS: "USER/FETCH_ORDERS_SUCCESS",
	FETCH_ORDERS_FAILURE: "USER/FETCH_ORDERS_FAILURE",

	SET_CURRENT_TAB: "USER/SET_CURRENT_TAB",
};

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
	orders: {
		isFetching: false,
		ids: [],
		toPayIds: [], // waiting for the payment
		availableIds: [],
		refundIds: [],
	},
	currentTab: 0,
};

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/

export const actions = {
	loadOrders: () => {
		return (dispatch, getState) => {
			const {ids} = getState().user.orders;
			if (ids.length > 0) {
				return null;
			}
			const endpoint = url.getOrders();
			return dispatch(fetchOrders(endpoint));
		};
	},
	setCurrentTab: (index) => ({
		type: types.SET_CURRENT_TAB,
		index,
	}),
};

const fetchOrders = (endpoint) => ({
	[FETCH_DATA]: {
		types: [types.FETCH_ORDERS_REQUEST, types.FETCH_ORDERS_SUCCESS, types.FETCH_ORDERS_FAILURE],
		endpoint,
		schema,
	},
});

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const orders = (state = initialState.orders, action) => {
	switch (action.type) {
		case types.FETCH_ORDERS_REQUEST:
			return {...state, isFetching: true};
		case types.FETCH_ORDERS_SUCCESS:
			const toPayIds = action.response.ids.filter((id) => action.response.orders[id].type === TO_PAY_TYPE);
			const availableIds = action.response.ids.filter((id) => action.response.orders[id].type === AVAILABLE_TYPE);
			const refundIds = action.response.ids.filter((id) => action.response.orders[id].type === REFUND_TYPE);
			return {
				...state,
				isFetching: false,
				ids: state.ids.concat(action.response.ids),
				toPayIds: state.toPayIds.concat(toPayIds),
				availableIds: state.availableIds.concat(availableIds),
				refundIds: state.refundIds.concat(refundIds),
			};
	}
};

const currentTab = (state=initialState.currentTab, action) => {
	switch(action.type){
		case types.SET_CURRENT_TAB:
			return action.index
		default:
			return state;
	}
}

const reducer = combineReducers({
	currentTab,
	orders
})

export default reducer;


/***********************************************************************************************************************
 * 													SELECTORS 														   *
 * *********************************************************************************************************************/
