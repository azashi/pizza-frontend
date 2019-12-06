import React, { Component } from "react";
import { getTime, getQtyID } from "../Functions/function";
import Pizza from "./Pizza";
export default class OrderItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      food: getQtyID(props.data.FOOD_DETAILS),
      price: props.data.NET_PRICE,
      date: getTime(props.data.DATECREATED),
      foodList: props.foodList
    };
  }

  componentDidMount() {
    console.log(this.state.foodList);
  }

  render() {
    const { price, date } = this.state;

    return (
      <>
        <p>
          Price : {price} | Order Date : {date}
        </p>

        <ul>
          {this.state.food.map((value, index) => {
            return (
              <li key={index}>
                {" "}
                <Pizza
                  key={index}
                  data={value}
                  foodList={this.state.foodList}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
