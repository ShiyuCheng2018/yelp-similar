import React, {Component} from "react";
import ErrorToast from "../../components/ErrorToast";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {actions as appActions, getError} from "../../redux/modules/app";
import "./style.css";
import AsyncComponent from "../../utils/AsyncComponent";

/***********************************************************************************************************************
 * 										STATIC COMPONENTS' IMPORTS (X)													*
 * *********************************************************************************************************************/

// import Home from "../Home";
// import ProductDetail from "../ProductDetail";
// import Search from "../Search";
// import SearchResult from "../SearchResult";
// import Login from "../Login";
// import PrivateRoute from "../PrivateRoute";
// import User from "../User";
// import Purchase from "../Purchase";

/***********************************************************************************************************************
 * 										DYNAMIC COMPONENTS' IMPORTS (√)													*
 * *********************************************************************************************************************/

const Home = AsyncComponent(() => import("../Home"));
const ProductDetail = AsyncComponent(() => import("../ProductDetail"));
const Search = AsyncComponent(() => import("../Search"));
const SearchResult = AsyncComponent(() => import("../SearchResult"));
const Login = AsyncComponent(() => import("../Login"));
const PrivateRoute = AsyncComponent(() => import("../PrivateRoute"));
const User = AsyncComponent(() => import("../User"));
const Purchase = AsyncComponent(() => import("../Purchase"));

class App extends Component {
	render() {
		const {
			error,
			appActions: {clearError},
		} = this.props;

		return (
			<div className={"App"}>
				<Router>
					<Switch>
						<Route path="/search" component={Search} />
						<Route path={"/auth/login"} component={Login} />
						<PrivateRoute path={"/user"} component={User} />
						<PrivateRoute path={"/purchase/:id"} component={Purchase} />
						<Route path="/search_result" component={SearchResult} />
						<Route path={"/detail/:id"} component={ProductDetail} />
						<Route path={"/"} component={Home} />
					</Switch>
				</Router>

				{error ? <ErrorToast msg={error} clearError={clearError} /> : null}
			</div>
		);
	}
}

/***********************************************************************************************************************
 * 													MAPPING  														   *
 * *********************************************************************************************************************/
const mapStateToProps = (state, props) => {
	return {
		error: getError(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		appActions: bindActionCreators(appActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
