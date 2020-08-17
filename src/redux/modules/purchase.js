import {getProductDetail} from "./entities/products";
import {AVAILABLE_TYPE} from "./entities/orders";
import {actions as orderActions} from "./entities/orders";
import {createSelector} from "reselect";
/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/

export const types = {
	SET_ORDER_QUANTITY: "PURCHASE/SET_ORDER_QUANTITY",
	CLOSE_TIP: "PURCHASE/CLOSE_TIP",

	SUBMIT_ORDER_REQUEST: "PURCHASE/SUBMIT_ORDER_REQUEST",
	SUBMIT_ORDER_SUCCESS: "PURCHASE/SUBMIT_ORDER_SUCCESS",
	SUBMIT_ORDER_FAILURE: "PURCHASE/SUBMIT_ORDER_FAILURE",
};

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
	quantity: 1,
	showTip: false,
};

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
	setOrderQuantity: (quantity) => ({
		type: types.SET_ORDER_QUANTITY,
		quantity,
	}),
	closeTip: () => ({
		type: types.CLOSE_TIP,
	}),
	submitOrder: (productId) => {
		return (dispatch, getState) => {
			dispatch({type: types.SUBMIT_ORDER_REQUEST});
			new Promise((resolve, reject) => {
				setTimeout(() => {
					const product = getProductDetail(getState(), productId);
					const quantity = getState().purchase.quantity;
					const totalPrice = (product.currentPrice * quantity).toFixed(1);
					const first = `quantity: ${quantity} | total: ${totalPrice} $`;
					const second = product.validityPeriod;
					const order = {
						title: `${product.shop}:${product.product}`,
						orderPicUrl: product.picture,
						channel: "GROUP",
						statusText: "Waiting",
						text: [first, second],
						type: AVAILABLE_TYPE,
					};
					dispatch(orderActions.addOrder(order));
					dispatch({type: types.SUBMIT_ORDER_SUCCESS});
				}, 500);
			});
		};
	},
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_ORDER_QUANTITY:
			return {...state, quantity: action.quantity};
		case types.CLOSE_TIP:
			return {...state, showTip: false};
		case types.SUBMIT_ORDER_SUCCESS:
			return {...state, showTip: true};
		default:
			return state;
	}
};

export default reducer;

/***********************************************************************************************************************
 * 													SELECTORS 														   *
 * *********************************************************************************************************************/
export const getQuantity = (state) => {
	return state.purchase.quantity;
};

export const getTipStatus = (state) => {
	return state.purchase.showTip;
};

export const getProduct = (state, id) => {
	return getProductDetail(state, id);
};

export const getTotalPrice = createSelector([getProduct, getQuantity], (product, quantity) => {
	if (!product) {
		return 0;
	}
	return product.currentPrice * quantity.toFixed(1);
});
