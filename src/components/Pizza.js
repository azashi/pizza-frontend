import React, { Component } from "react";

export default class Pizza extends Component {
  constructor(props) {
    super(props);

    this.state = { food: props.data, foodList: props.foodList };
  }

  componentDidMount() {
    console.log(this.state.foodList);
  }

  render() {
    const { FOOD_QTY, FOOD_ID } = this.state.food;

    return (
      <div>
        {FOOD_ID} | {FOOD_QTY}
      </div>
    );
  }
}
