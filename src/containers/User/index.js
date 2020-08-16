import React, {Component} from "react";
import UserMain from "./containers/UserMain";
import UserHeader from "./components/UserHeader";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as userActions, getCurrentTab, getOrders} from "../../redux/modules/user";
import {actions as authActions} from "../../redux/modules/login";

class User extends Component {
	render() {
		const {orders} = this.props;
		return (
			<div>
				<UserHeader onBack={this.handleBack} onLogout={this.handleLogout} />
				<UserMain data={orders} />
			</div>
		);
	}

	componentDidMount() {
		this.props.userActions.loadOrders();
	}

	handleBack = () => {
		this.props.history.push("/");
	};

	handleLogout = () => {
		this.props.authActions.logout();
	};
}

/***********************************************************************************************************************
 * 													MAPPING  														   *
 * *********************************************************************************************************************/
const mapStateToProps = (state, props) => {
	return {
		orders: getOrders(state),
		currentTab: getCurrentTab(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		authActions: bindActionCreators(authActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
