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
        `https://pizza-back-end.herokuapp.com/createuser/${contact}/${fname}/${lname}/${addr}`
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
        msg = "Enter only alphabets betwwen 2 and 10";
        value.match(/^[a-zA-z]{2,10}$/)
          ? this.setState({ showerr: false, [name]: value })
          : this.setState({ showerr: true, [name]: "" });
        break;
      case "lastName":
        msg = "Enter only alphabets betwwen 2 and 10";
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
        value.match(/^([a-zA-Z0-9],?-?){5,20}[a-z].?$/)
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
      <form>
        {this.state.showerr ? this.state.errmsg : null}
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
        <hr />
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </form>
    );
  }
}
