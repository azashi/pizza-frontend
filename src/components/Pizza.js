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
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img src={img} alt="pizza" />
              <span class="card-title">
                <h3>{name}</h3>
              </span>
            </div>
            <div class="card-content">
              <h5>{name}</h5>
              <p>{desc}</p>
              <div>Rs.{price}</div>
              <div>Type: {type === "PIZZA_VEG" ? "VEG" : "NONVEG"}</div>
              <div>Any addons: {addons}</div>
            </div>
            <div class="card-action">
              Quantity:{" "}
              <span className="badge blue accent-1 white-text">{qty}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
