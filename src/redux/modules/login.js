/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
	LOGIN_REQUEST: "AUTH/LOGIN_REQUEST",
	LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
	LOGIN_FAILURE: "AUTH/LOGIN_FAILURE",

	LOGOUT: "AUTH/LOGOUT",
	SET_USERNAME: "AUTH/SET_USERNAME",
	SET_PASSWORD: "SET_PASSWORD",
};

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
	username: localStorage.getItem("username") || "",
	password: "",
	isFetching: false,
	status: localStorage.getItem("login") || false, // login flag
};

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/

export const actions = {
	login: () => {
		return (dispatch, getState) => {
			const {username, password} = getState().login;
			if (!(username && username.length > 0 && password && password.length > 0)) {
				return dispatch(loginFailure("Please fill your username and password."));
			}
			dispatch(loginRequest());
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					localStorage.setItem("username", username);
					localStorage.setItem("login", true);
					resolve(dispatch(loginSuccess()));
				}, 1000);
			});
		};
	},
	logout: () => {
		localStorage.removeItem("username");
		localStorage.removeItem("login");
		return {type: types.LOGOUT};
	},
	setUsername: (username) => ({
		type: types.SET_USERNAME,
		username,
	}),
	setPassword: (password) => ({
		type: types.SET_PASSWORD,
		password,
	}),
};

const loginFailure = (error) => ({
	type: types.LOGIN_FAILURE,
	error,
});

const loginRequest = () => ({
	type: types.LOGIN_REQUEST,
});

const loginSuccess = () => ({
	type: types.LOGIN_SUCCESS,
});
/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN_REQUEST:
			return {...state, isFetching: true};
		case types.LOGIN_SUCCESS:
			return {...state, isFetching: false, status: true};
		case types.LOGIN_FAILURE:
			return {...state, isFetching: false};
		case types.LOGOUT:
			return {...state, status: false, username: "", password: ""};
		case types.SET_USERNAME:
			return {...state, username: action.username};
		case types.SET_PASSWORD:
			return {...state, password: action.password};
		default:
			return state;
	}
};

export default reducer;
/***********************************************************************************************************************
 * 													SELECTORS 														   *
 * *********************************************************************************************************************/

export const getUsername = (state) => {
	return state.login.username;
};

export const getPassword = (state) => {
	return state.login.password;
};

export const isLogin = (state) => {
	return state.login.status;
};
