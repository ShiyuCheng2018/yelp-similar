import React, {Component} from "react";
import "./style.css";

class LoginForm extends Component {
	render() {
		const {username, password, onChange, onSubmit} = this.props;
		console.log(this.props);
		return (
			<div className="loginForm">
				<div className="loginForm__inputContainer">
					<div className="loginForm__row">
						<label className="loginForm__mobileLabel">+1</label>
						<input className="loginForm__input" name="username" value={username} onChange={onChange}></input>
					</div>
					<div className="loginForm__row">
						<label className="loginForm__passwordLabel">Password</label>
						<input className="loginForm__input" name="password" type="password" value={password} onChange={onChange}></input>
					</div>
				</div>
				<div className="loginForm__btnContainer">
					<button className="loginForm__btn" onClick={onSubmit}>
						Continue
					</button>
				</div>
			</div>
		);
	}
}

export default LoginForm;
