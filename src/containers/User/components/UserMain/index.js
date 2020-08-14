import React, {Component} from "react";
import OrderItem from "../OrderItem";
import "./style.css";

const tabTitles = ["All orders", "Waiting", "Available", "Refund/Services"];

class UserMain extends Component {
	render() {
		const {currentTab, data} = this.props;

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
			</div>
		);
	}

	renderOrderList = (data) => {
		return data.map((item) => {
			return <OrderItem key={item.id} data={item} />;
		});
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
		this.props.onSetCurrentTab(index);
	};
}

export default UserMain;
