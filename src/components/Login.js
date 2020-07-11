import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", userid: undefined, hasSubmitted: false, isLoading: false };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.validator(this.state.value)
      ? this.checkUser(this.state.value)
      : alert("Please provide 9 digit contact number");
  };

  validator = value => {
    let valid = new RegExp(/^[0-9]{9}$/);
    return valid.test(value);
  };

  checkUser = async number => {
    this.setState({ isLoading: true });
    let res = await axios.get(
      `https://pizza-back-end.herokuapp.com/getuserinfo/${number}`
    );

    this.setState({ userid: res.data[0], hasSubmitted: true }, () => {
      this.setState({ isLoading: false })
    });
  };

  componentDidUpdate() {
    if (this.state.hasSubmitted === true && this.state.userid === undefined) {
      alert("No user found, redirecting to sign-up");
      this.props.history.push("/createuser");
    }
    if (this.state.hasSubmitted === true && this.state.userid !== undefined) {
      //this.props.history.push(`/orderhistory/${this.state.userid.USER_ID}`);
      this.props.history.push(`/menu/${this.state.userid.USER_ID}`);
    }
  }

  render() {

    return !this.state.isLoading ?
      (<div className="login-container" style={{ height: "80vh" }}>
        <div className="left">
          <ul>
            <li className="points"><span className="material-icons pop">star_border</span> Enter 9 digit number to login</li>
            <li className="points"><span className="material-icons pop">star_border</span> If new user then go to <span className="pop">Sign Up</span> page</li>
            <li className="points"><span className="material-icons pop">star_border</span> After logging in order delicious pizzas!</li>
          </ul>
        </div>
        <div className="right">
          <div className="form-wrapper">
            <div className="form-head">
              <h2>Sign In</h2>
            </div>
            <form className="form-body">
              <label htmlFor="contact">Please enter your <span className="pop">9</span> digit contact number</label>
              <input
                name="contact"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Number"
              />
              <button
                className="action-btn form-btn"
                type="submit"
                onClick={this.handleSubmit}
              >Login <span className="material-icons">exit_to_app</span></button>
            </form>
            <div className="form-foot">
              <p>New User? <Link to="/createuser" className="pop">Sign Up</Link> </p>
            </div>
          </div>
        </div>
      </div>)

      : (<div className="loader-wrapper"><div className="loader"></div></div>)
  }
}
