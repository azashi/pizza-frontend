import React, { Component } from "react";

export default class Pizza extends Component {
  constructor(props) {
    super(props);

    this.state = { food: props.data, foodInfo: props.foodInfo };
  }

  componentDidMount() {
    // console.log(this.state.foodInfo);
    // console.log(this.state.food);
  }

  render() {
    const { FOOD_QTY: qty /*, FOOD_ID: id*/ } = this.state.food;
    const [
      {
        FOOD_NAME: name,
        FOOD_PRICE: price,
        FOOD_TYPE: type,
        FOOD_IMG: img,
        FOOD_DESCRIPTION: desc,
        FOOD_ADDONS: addons
      }
    ] = this.state.foodInfo;

    return (
      <li>
        <p>{name}</p>
        <img src={img} alt="pizza" />
        <div>Description: {desc}</div>
        <div>Rs.{price}</div>
        <div>Type: {type === "PIZZA_VEG" ? "VEG" : "NONVEG"}</div>
        <div>Any addons: {addons}</div>
        <div>Quantity: {qty}</div>
      </li>
    );
  }
}
