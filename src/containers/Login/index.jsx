import React, {Component} from "react";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import {getPassword, getUsername, isLogin, actions as authActions} from "../../redux/modules/login";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Login extends Component {
	render() {
		const {username, password, login} = this.props;
		if (login) {
			return <Redirect to={"/user"} />;
		}
		return (
			<div>
				<LoginHeader />
				<LoginForm username={username} password={password} onChange={this.handleChange} onSubmit={this.handleSubmit} />
			</div>
		);
	}

	handleChange = (e) => {
		if (e.target.name === "username") {
			this.props.authActions.setUsername(e.target.value);
		} else if (e.target.name === "password") {
			this.props.authActions.setPassword(e.target.value);
		}
	};

	handleSubmit = () => {
		this.props.authActions.login();
	};
}

/***********************************************************************************************************************
 * 													MAPPING  														   *
 * *********************************************************************************************************************/

const mapStateToProps = (state, props) => {
	return {
		username: getUsername(state),
		password: getPassword(state),
		login: isLogin(state),
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		authActions: bindActionCreators(authActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
