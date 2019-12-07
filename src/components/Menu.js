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
      order: []
    };
  }

  componentDidMount() {
    axios
      .get("https://pizza-back-end.herokuapp.com/getpizzainfo")
      .then(resp => {
        this.setState({
          pizzaList: resp.data
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    let ost = this.placeorder("order");
    //console.log(ost);
    //console.log("Price is ", ost[1]);

    //console.log(getQtyID(ost));
    axios
      .get(
        `https://pizza-back-end.herokuapp.com/createorder/${this.state.userid}/${ost}/${this.state.finalPrice}`
      )
      .then(res => {
        //console.log(res.data.insertId);
        if (res.data.insertId) {
          alert("Order is being placed...");
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
    return (
      <div>
        <h4>Menu</h4>
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
        <p>Total Price Rs.{this.state.finalPrice}</p>
        <br />
        <input type="submit" value="Place order" onClick={this.handleSubmit} />
        <br />
        <br />
        <Link to={`/orderhistory/${this.state.userid}`}>View Past orders</Link>
        <br />
        <Link to="/">Back to login</Link>
        <br />
      </div>
    );
  }
}
