import React, { Component } from "react";
import axios from "axios";
import Orderitem from "./OrderItem";
import { Link } from "react-router-dom";

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      foodList: [],
      userID: props.match.params.id,
      hasError: false
    };
  }

  async componentDidMount() {
    try {
      let res = await axios.get(
        `http://pizza-back-end.herokuapp.com/getorderinfo/${this.state.userID}`
      );

      let res1 = await axios.get(
        "http://pizza-back-end.herokuapp.com/getpizzainfo"
      );

      this.setState({ orders: res.data, foodList: res1.data });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { orders } = this.state;
    //console.log(orders);
    return (
      <div className="container">
        {orders.length === 0 ? (
          <>
            <h4>It seems you haven't ordered anything yet! </h4>
            <Link to={`/menu/${this.state.userID}`}>
              <button className="waves-effect waves-light btn">
                Order now
              </button>
            </Link>
            <br />
            <br />
            <br />{" "}
          </>
        ) : (
          <>
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
            <Link to={`/menu/${this.state.userID}`}>
              {" "}
              <button className="waves-effect waves-light btn">
                Back to Menu
              </button>
            </Link>
            <br />
            <br />
          </>
        )}
      </div>
    );
  }
}
