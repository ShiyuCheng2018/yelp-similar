import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actions as userActions, getCurrentTab, getDeletingOrderId} from "../../../../redux/modules/user";
import OrderItem from "../../components/OrderItem";
import Confirm from "../../../../components/Confirm";
import "./style.css";

const tabTitles = ["All orders", "Waiting", "Available", "Refund/Services"];

class UserMain extends Component {
	render() {
		const {currentTab, data, deletingOrderId} = this.props;

		return (
			<div className="userMain">
				<div className="userMain__menu">
					{tabTitles.map((item, index) => {
						return (
							<div key={index} className="userMain__tab" onClick={this.handleClickTab.bind(this, index)}>
								<span className={currentTab === index ? "userMain__title userMain__title--active" : "userMain__title"}>{item}</span>
							</div>
						);
					})}
				</div>
				<div className="userMain__content">{data && data.length > 0 ? this.renderOrderList(data) : this.renderEmpty()}</div>
				{deletingOrderId ? this.renderConfirmationDialog() : null}
			</div>
		);
	}

	renderOrderList = (data) => {
		return data.map((item) => {
			return <OrderItem key={item.id} data={item} onRemove={this.handleRemove.bind(this, item.id)} />;
		});
	};

	handleRemove = (orderId) => {
		this.props.userActions.showDeleteDialog(orderId);
	};

	renderConfirmationDialog = () => {
		const {
			userActions: {hideDeleteDialog, removeOrder},
		} = this.props;
		return <Confirm content={"Are you sure to delete this order?"} cancelText={"CANCEL"} confirmText={"YES"} onCancel={hideDeleteDialog} onConfirm={removeOrder} />;
	};

	renderEmpty = () => {
		return (
			<div className="userMain__empty">
				<div className="userMain__emptyIcon" />
				<div className="userMain__emptyText1">You don't have any order</div>
				<div className="userMain__emptyText2">Back to home, see what you like</div>
			</div>
		);
	};

	handleClickTab = (index) => {
		this.props.userActions.setCurrentTab(index);
	};
}

/***********************************************************************************************************************
 * 													MAPPING  														   *
 * *********************************************************************************************************************/

const mapStateToProps = (state, props) => {
	return {
		currentTab: getCurrentTab(state),
		deletingOrderId: getDeletingOrderId(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userActions: bindActionCreators(userActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMain);
