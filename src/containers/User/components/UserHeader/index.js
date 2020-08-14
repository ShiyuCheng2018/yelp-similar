import React, {Component} from "react";
import "./style.css";

class UserHeader extends Component {
	render() {
		const {onBack, onLogout} = this.props;
		return (
			<header className="userHeader">
				<div className="userHeader__back" onClick={onBack}>
					HOME
				</div>
				<div className="userHeader__list">
					<span className="userHeader__item userHeader__item--selected">ORDERS</span>
					<span className="userHeader__item">COUPONS</span>
				</div>
				<div className="userHeader__right" onClick={onLogout}>
					EXIT
				</div>
			</header>
		);
	}
}

export default UserHeader;
