import React, { Component } from "react";

export default class MenuPizza extends Component {
  constructor(props) {
    super(props);

    this.state = { pizza: this.props.data, quantity: 0 };
  }

  handleOrder = () => {
    this.props.order();
  };

  handleQuantity = event => {
    let { name, value } = event.target;
    //this.props.order(this.state.quantity);
    if (value > 15) {
      alert("Quantity cannot exceed 15");
      value = 15;
    } else if (value < 0) {
      alert("Quantity cannot be lower than 0");
      value = 0;
    } else if (isNaN(value)) {
      alert("Enter correct quantity number");
      value = 0;
    } else {
      this.setState({ [name]: value }, () => {
        this.props.order(this.state.quantity, this.state.pizza.FOOD_PRICE);
      });
    }
    //console.log(this.state.pizza.FOOD_PRICE);
  };

  render() {
    const {
      // FOOD_ID,
      FOOD_TYPE: type,
      FOOD_NAME: name,
      FOOD_DESCRIPTION: desc,
      FOOD_PRICE: price,
      FOOD_ADDONS: addons,
      FOOD_IMG: img
    } = this.state.pizza;
    //const qty = this.state.quantity;

    return (
      <div className="row">
        <div className="col s12 m8">
          <div className="card">
            <div className="card-image">
              <img src={img} alt="pizza" />
              <span className="card-title black-text">
                <h2>{name}</h2>
              </span>
            </div>
            <div className="card-content">
              <h4>{name}</h4>
              <p>{desc}</p>
              <div>Rs.{price}</div>
              <div>Type: {type === "PIZZA_VEG" ? "VEG" : "NONVEG"}</div>
              <div>Any addons: {addons}</div>
            </div>
            <div className="card-action">
              <p className="card-panel cyan brown lighten-3 white-text">
                Quantity:
              </p>
              <input
                type="number"
                value={this.state.quantity}
                name="quantity"
                onChange={this.handleQuantity}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
