import React, { Component } from "react";
import axios from "axios";
import Orderitem from "./OrderItem";
//import { getPizzaInfo } from "../Functions/function";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: [], foodList: [] };
    this.userID = props.userID;
  }

  componentDidMount() {
    axios
      .get(`https://pizza-back-end.herokuapp.com/getorderinfo/${this.userID}`)
      .then(res => {
        this.setState({ orders: res.data });
        return new Promise(resolve => {
          resolve();
        });
      })
      .then(() => {
        axios
          .get("https://pizza-back-end.herokuapp.com/getpizzainfo")
          .then(res => {
            this.setState({ foodList: res.data });
            //console.log(this.state.orders);
            //const mo = getPizzaInfo(this.state.orders, this.state.foodList);
            //this.setState({ mappedOrder: mo });
            //console.log(mo);
            console.log(this.state.foodList);
          });
      });
  }

  render() {
    const { orders } = this.state;
    return (
      <div>
        <ul>
          {orders.map((row, index) => {
            return (
              <li key={index}>
                <Orderitem data={row} foodList={this.state.foodList} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
