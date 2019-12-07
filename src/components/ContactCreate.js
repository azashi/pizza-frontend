import React, { Component } from "react";
import axios from "axios";

export default class ContactCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      errmsg: "",
      showerr: false
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

      alert("Information sent...");
    }
  };

  createUser = (contact, fname, lname, addr) => {
    axios
      .get(
        `http://pizza-back-end.herokuapp.com/createuser/${contact}/${fname}/${lname}/${addr}`
      )
      .then(res => {
        let data = res.data;
        //console.log(data);
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
    return (
      <div className="container">
        <form>
          {this.state.showerr ? (
            <p className="card-panel lime lighten-2 teal-darken-4-text">
              {" "}
              {this.state.errmsg}{" "}
            </p>
          ) : null}
          <br />
          <label>First Name</label>
          <input type="text" name="firstName" onChange={this.handleChange} />
          <br />
          <label>Last Name</label>
          <input type="text" name="lastName" onChange={this.handleChange} />
          <br />
          <label>Contact</label>
          <input type="text" name="contact" onChange={this.handleChange} />
          <br />
          <label>Address</label>
          <input type="text" name="address" onChange={this.handleChange} />
          <br />
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
            className="waves-effect waves-light btn"
          />
          <br />
          <br />
        </form>
      </div>
    );
  }
}
