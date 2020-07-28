/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
import createReducer from "../../../utils/createReducer";

export const schema = {
	name: "shops",
	id: "id",
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

// const reducer = (state = {}, action) => {
// 	if(action.response && action.response.products){
// 		return {...state, ...action.response.products}
// 	}
// 	return state;
// };

const reducer = createReducer(schema.name);

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

export const getShopById = (state, id) => {
	return state.entities.shops[id];
};

export default reducer;
