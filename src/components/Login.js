import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", userid: undefined, hasSubmitted: false };
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
    let res = await axios.get(
      `https://pizza-back-end.herokuapp.com/getuserinfo/${number}`
    );
    this.setState({ userid: res.data[0], hasSubmitted: true }, () => {
      //console.log(this.state.userid);
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
    return (
      <>
        <form>
          <label>Please enter your contact number</label>
          <br />
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
      </>
    );
  }
}
