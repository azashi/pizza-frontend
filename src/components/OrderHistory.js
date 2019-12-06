import React, { Component } from "react";
import axios from "axios";
import Orderitem from "./OrderItem";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: [], foodList: [] };
    this.userID = props.userID;
  }

  async componentDidMount() {
    try {
      let res = await axios.get(
        `https://pizza-back-end.herokuapp.com/getorderinfo/${this.userID}`
      );

      let res1 = await axios.get(
        "https://pizza-back-end.herokuapp.com/getpizzainfo"
      );

      this.setState({ orders: res.data, foodList: res1.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { orders } = this.state;
    return (
      <div>
        <ul>
          {orders.map((row, index) => {
            return (
              <Orderitem
                key={index}
                data={row}
                foodList={this.state.foodList}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
