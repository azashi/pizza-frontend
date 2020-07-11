import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ContactCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      errmsg: "",
      showerr: false,
      isLoading: false
    };
  }

  handleChange = event => {
    const { name, value, type } = event.target;
    if (type === "text") {
      this.setState({ [name]: value });
    }
    this.validator(name, value);
  };
  handleSubmit = event => {
    event.preventDefault();
    const { address, firstName, lastName, contact } = this.state;
    if (
      address === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      contact === ""
    ) {
      alert("Please enter all values correctly!");
    } else {
      //console.log(firstName, lastName, contact, address);

      this.createUser(contact, firstName, lastName, address);

      // alert("Information sent...");
    }
  };

  createUser = (contact, fname, lname, addr) => {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pizza-back-end.herokuapp.com/createuser/${contact}/${fname}/${lname}/${addr}`
      )
      .then(res => {
        let data = res.data;
        this.setState({ isLoading: false });
        if (typeof data === "string") {
          let errMsg = data.slice(0, 12);
          if (errMsg === "ER_DUP_ENTRY") {
            alert(
              "Contact number already exists! Please try with new contact number."
            );
          }
        } else {
          this.setState({ userID: data.insertId });
          //console.log(this.state);
          alert("Please login now.");
          this.props.history.push("/");
        }
      });
  };

  validator = (name, value) => {
    let msg;
    switch (name) {
      case "firstName":
        msg = "Enter only alphabets between 2 and 10";
        value.match(/^[a-zA-z]{2,10}$/)
          ? this.setState({ showerr: false, [name]: value })
          : this.setState({ showerr: true, [name]: "" });
        break;
      case "lastName":
        msg = "Enter only alphabets between 2 and 10";
        value.match(/^[a-zA-z]{2,10}$/)
          ? this.setState({ showerr: false, [name]: value })
          : this.setState({ showerr: true, [name]: "" });
        break;
      case "contact":
        msg = "Enter only 9 numbers";
        value.match(/^[0-9]{9}$/)
          ? this.setState({ showerr: false, [name]: value })
          : this.setState({ showerr: true, [name]: "" });
        break;
      case "address":
        msg = "Enter correct address";
        value.match(/^([a-zA-Z0-9\s,'-]){1,30}$/)
          ? this.setState({ showerr: false, [name]: value })
          : this.setState({ showerr: true, [name]: "" });
        break;
      default:
        msg = "";
    }
    this.setState({ errmsg: msg });
  };

  render() {
    return (!this.state.isLoading ?
      (<div className="form-wrapper form-size">
        <div className="form-head">
          <h2>Sign Up</h2>
        </div>
        <form className="form-body">
          <p className="err-box pop">
            {this.state.showerr ? (
              this.state.errmsg
            ) : null}
          </p>

          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" onChange={this.handleChange} placeholder="Enter your first name" />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" onChange={this.handleChange} placeholder="Enter your last name" />
          <br />
          <label htmlFor="contact">Contact</label>
          <input type="text" name="contact" onChange={this.handleChange} placeholder="Enter 9 digit number" />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" name="address" onChange={this.handleChange} placeholder="Enter your address" />
          <br />
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="action-btn form-btn"
          >Submit <span className="material-icons">check_circle_outline</span>
          </button>

        </form>
        <div className="form-foot">
          <Link to="/">
            <button className="action-btn pop-border">
              Back to login <span className="material-icons">exit_to_app</span>
            </button>
          </Link>
        </div>
      </div>
      )
      : (<div className="loader-wrapper"><div className="loader"></div></div>)
    )

  }
}
