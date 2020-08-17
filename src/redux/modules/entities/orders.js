import createReducer from "../../../utils/createReducer";

/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
export const schema = {
	name: "orders",
	id: "id",
};

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/

export const types = {
	ADD_ORDER: "ORDERS/ADD_ORDER",
	DELETE_ORDER: "ORDERS/DELETE_ORDER",
	ADD_COMMENT: "ORDERS/ADD_COMMENT",
};

export const USED_TYPE = 1; // paid
export const TO_PAY_TYPE = 2; // waiting for payment
export const AVAILABLE_TYPE = 3; // available order
export const REFUND_TYPE = 4;

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
let orderIdCounter = 10;

export const actions = {
	addOrder: (order) => {
		const orderId = `o-${orderIdCounter++}`;
		return {
			type: types.ADD_ORDER,
			orderId,
			order: {...order, id: orderId},
		};
	},
	deleteOrder: (orderId) => ({
		type: types.DELETE_ORDER,
		orderId,
	}),
	addComment: (orderId, commentId) => ({
		type: types.ADD_COMMENT,
		orderId,
		commentId,
	}),
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const normalReducer = createReducer(schema.name);

const reducer = (state = {}, action) => {
	if (action.type === types.ADD_COMMENT) {
		return {
			...state,
			[action.orderId]: {
				...state[action.orderId],
				commentId: action.commentId,
			},
		};
	} else if (action.type === types.ADD_ORDER) {
		return {
			...state,
			[action.orderId]: action.order,
		};
	} else if (action.type === types.DELETE_ORDER) {
		const {[action.orderId]: deleteOrder, ...restOrders} = state;
		return restOrders;
	} else {
		return normalReducer(state, action);
	}
};

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getOrderById = (state, id) => {
	return state.entities.orders[id];
};

export default reducer;
