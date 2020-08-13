import React, {Component} from "react";
import ErrorToast from "../../components/ErrorToast";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {actions as appActions, getError} from "../../redux/modules/app";
import "./style.css";
import Home from "../Home";
import ProductDetail from "../ProductDetail";
import Search from "../Search";
import SearchResult from "../SearchResult";
import Login from "../Login";

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
						<Route exact path={"/auth/login"} component={Login} />
						<Route path="/search_result" component={SearchResult} />
						<Route exact path={"/detail/:id"} component={ProductDetail} />
						<Route path={"/"} component={Home} />
					</Switch>
				</Router>

				{error ? <ErrorToast msg={error} clearError={clearError} /> : null}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
