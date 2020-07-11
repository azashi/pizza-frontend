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
      hasError: false,
      isLoading: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      let res = await axios.get(
        `https://pizza-back-end.herokuapp.com/getorderinfo/${this.state.userID}`
      );

      let res1 = await axios.get(
        "https://pizza-back-end.herokuapp.com/getpizzainfo"
      );

      this.setState({ orders: res.data, foodList: res1.data, isLoading: false });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { orders } = this.state;
    //console.log(orders);
    return (!this.state.isLoading ?
      (<div className="history-container">
        {orders.length === 0 ? (
          <>
            <h4>It seems you haven't ordered anything yet! </h4>
            <Link to={`/menu/${this.state.userID}`}>
              <button className="action-btn">
                Order now <span className="material-icons">restaurant_menu</span>
              </button>
            </Link>
            <br />

          </>
        ) : (
            <>
              <ul>
                {orders.slice(0).reverse().map((row, index) => {
                  return (
                    <Orderitem
                      key={index}
                      data={row}
                      foodList={this.state.foodList}
                    />
                  );
                })}
              </ul>
              <div className="action-wrapper">
                <Link to={`/menu/${this.state.userID}`}>
                  <button className="action-btn anti-btn">
                    <span className="material-icons">reply</span>
                    Back to Menu
                  </button>
                </Link>
              </div>
            </>
          )}
      </div>)
      : (<div className="loader-wrapper"><div className="loader"></div></div>)
    );
  }
}
