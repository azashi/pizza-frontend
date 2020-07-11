import React, { Component } from "react";
import axios from "axios";
import MenuPizza from "./MenuPizza";
import { Link } from "react-router-dom";
//import { getQtyID } from "../Functions/function";

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: parseInt(this.props.match.params.userid),
      order: [],
      finalPrice: 0,
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("https://pizza-back-end.herokuapp.com/getpizzainfo")
      .then(resp => {
        this.setState({
          pizzaList: resp.data,
          isLoading: false
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    let ost = this.placeorder("order");

    if (this.state.finalPrice === 0) {
      alert("Please add Pizza by increasing quantity and then place order");
      return '';
    }
    //console.log(ost);
    //console.log("Price is ", ost[1]);

    //console.log(getQtyID(ost));
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pizza-back-end.herokuapp.com/createorder/${this.state.userid}/${ost}/${this.state.finalPrice}`
      )
      .then(res => {
        this.setState({ isLoading: false });
        //console.log(res.data.insertId);
        if (res.data.insertId) {
          alert("Order is placed...");
          this.props.history.push(`/orderhistory/${this.state.userid}`);
        } else {
          alert(
            "It seems there was trouble placing your order,please try again"
          );
        }
      });
  };

  placeorder = out => {
    let str = "";
    let price = [];
    for (let i = 1001; i < 1013; i++) {
      if (this.state[i] !== undefined && !isNaN(this.state[i])) {
        str += `${i}:${this.state[i]},`;
        price[i - 1001] = parseFloat(this.state[i + "p"]);
        //  console.log("this is price: ", price);
      }
    }
    //this.setState({ totalPrice: price }, () => {
    //console.log(this.state);
    //});
    if (out === "price") {
      return price;
    }
    if (out === "order") {
      return str.slice(0, -1);
    }

    return [str.slice(0, -1), price];
  };

  orderDetails = (foodid, qty, price) => {
    let tp = parseInt(qty) * parseFloat(price);

    this.setState({ [foodid]: parseInt(qty), [foodid + "p"]: tp }, () => {
      // console.log(foodid, qty, this.state[foodid]);
      let total = this.placeorder("price");
      let finalPrice = total.reduce((a, b) => a + b, 0);
      //console.log(finalPrice);
      this.setState({ finalPrice });
    });
  };

  render() {
    const pizzaList = this.state.pizzaList;
    return (!this.state.isLoading ?
      (<div className="menu-container">
        <h2>Menu</h2>
        <hr />
        <ul>
          {pizzaList &&
            pizzaList.map((row, i) => {
              return (
                <MenuPizza
                  key={row.FOOD_ID}
                  data={row}
                  order={this.orderDetails.bind(this, row.FOOD_ID)}
                />
              );
            })}
        </ul>
        <br />
        <hr />
        <div className="action-wrapper">

          <span
            className="price-wrapper"
            style={{
              fontSize: "1.4rem"
            }}
          >
            Total Price <span className="price">Rs. {this.state.finalPrice} /-</span>
          </span>

          <div className="action">
            <button
              className="action-btn"
              onClick={this.handleSubmit}
            >Place order <span className="material-icons">payment</span>
            </button>

            <Link to={`/orderhistory/${this.state.userid}`}>
              <button className="action-btn">
                View Past orders <span className="material-icons">receipt_long</span>
              </button>
            </Link>

            <Link to="/">
              <button className="action-btn">
                Back to login <span className="material-icons">exit_to_app</span>
              </button>
            </Link>
          </div>
        </div>
      </div>)
      : (<div className="loader-wrapper"><div className="loader"></div></div>)
    );
  }
}
