/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/

import createReducer from "../../../utils/createReducer";

export const schema = {
	name: "products",
	id: "id",
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = createReducer(schema.name);

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

export const getProductDetail = (state, id) => {
	const product = state.entities.products[id];
	return product && product.detail && product.purchaseNotes ? product : null;
};

export default reducer;
