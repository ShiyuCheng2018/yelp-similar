/***********************************************************************************************************************
 * 													CONSTANTS 														   *
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
};
