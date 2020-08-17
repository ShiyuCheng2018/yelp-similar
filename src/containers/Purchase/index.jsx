import React, {Component} from "react";
import Header from "../../components/Header";
import PurchaseForm from "./components/PurchaseForm";
import Tip from "../../components/Tip";
import {connect} from "react-redux";
import {actions as purchaseActions, getProduct, getQuantity, getTipStatus, getTotalPrice} from "../../redux/modules/purchase";
import {actions as detailActions} from "../../redux/modules/detail";
import {getUsername} from "../../redux/modules/login";
import {bindActionCreators} from "redux";

class Purchase extends Component {
	render() {
		const {product, phone, quantity, showTip, totalPrice} = this.props;

		return (
			<div>
				<Header title="Make an Order" onBack={this.handleBack} />
				{product ? (
					<PurchaseForm totalPrice={totalPrice} product={product} phone={phone} quantity={quantity} onSetQuantity={this.handleSetQuantity} onSubmit={this.handleSubmit} />
				) : null}
				{showTip ? <Tip message="Your just made an order ！" onClose={this.handleCloseTip} /> : null}
			</div>
		);
	}

	componentDidMount() {
		const {product} = this.props;
		if (!product) {
			const productId = this.props.match.params.id;
			this.props.detailActions.loadProductDetail(productId);
		}
	}

	componentWillUnmount() {
		this.props.purchaseActions.setOrderQuantity(1);
	}

	handleSetQuantity = (quantity) => {
		this.props.purchaseActions.setOrderQuantity(quantity);
	};
	handleSubmit = () => {
		const productId = this.props.match.params.id;
		this.props.purchaseActions.submitOrder(productId);
	};

	handleBack = () => {
		this.props.history.goBack();
	};

	handleCloseTip = () => {
		this.props.purchaseActions.closeTip();
	};
}

/***********************************************************************************************************************
 * 													MAPPING  														   *
 * *********************************************************************************************************************/

const mapStateToProps = (state, props) => {
	const productId = props.match.params.id;
	return {
		product: getProduct(state, productId),
		quantity: getQuantity(state),
		showTip: getTipStatus(state),
		phone: getUsername(state),
		totalPrice: getTotalPrice(state, productId),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		purchaseActions: bindActionCreators(purchaseActions, dispatch),
		detailActions: bindActionCreators(detailActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
