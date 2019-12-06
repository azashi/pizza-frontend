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
      foodList: props.foodList,
      foodItem: []
    };
  }

  componentDidMount() {
    // console.log(this.state.foodList);
    // this.setState({foodItem:this.getFoodInfo(,this.state.foodList)})
  }

  getFoodInfo = (foodid, foodList) => {
    let newarr = [];

    newarr = foodList.filter((row, index) => {
      if (row.FOOD_ID === foodid) {
        return true;
      } else {
        return false;
      }
    });
    return newarr;
  };

  render() {
    const { price, date } = this.state;

    return (
      <li>
        <p>
          Price : {price} | Order Date : {date}
        </p>

        <ul>
          {this.state.food.map((value, index) => {
            return (
              <Pizza
                key={index}
                data={value}
                foodInfo={this.getFoodInfo(value.FOOD_ID, this.state.foodList)}
              />
            );
          })}
        </ul>
      </li>
    );
  }
}
