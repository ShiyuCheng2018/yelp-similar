import React, {Component} from "react";
import ErrorToast from "../../components/ErrorToast";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actions as appActions, getError} from "../../redux/modules/app"
import "./style.css";

const mapStateToProps = (state, props) =>{
	return {
		error: getError(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		appActions: bindActionCreators(appActions, dispatch)
	}
}


class App extends Component {

	render() {

		const {error, appActions: {clearError}} = this.props;

		return <div className={"App"}>
			{error? <ErrorToast msg={error} clearError={clearError}/>
				:null}
		</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
