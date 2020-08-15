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
	DELETE_ORDER: "ORDER/DELETE_ORDER",
};

export const USED_TYPE = 1; // paid
export const TO_PAY_TYPE = 2; // waiting for payment
export const AVAILABLE_TYPE = 3; // available order
export const REFUND_TYPE = 4;

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
	deleteOrder: (orderId) => ({
		type: types.DELETE_ORDER,
		orderId,
	}),
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const normalReducer = createReducer(schema.name);

const reducer = (state = {}, action) => {
	if (action.type === types.DELETE_ORDER) {
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
