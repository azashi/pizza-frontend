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

      <div className="card">
        <div className="card-image">
          <img src={img} alt="pizza" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{name}</h3>
          <p>{desc}</p><br />
          <div>Rs. {price} /-</div><br />

          <div>{type === "PIZZA_VEG" ?
            (<span className="pizza-type"><span style={{ "color": "green" }} className="material-icons">
              trip_origin
          </span>Veg</span>) :
            (<span className="pizza-type"><span style={{ "color": "red" }} className="material-icons">
              trip_origin
            </span>Non-Veg</span>)}</div><br />
          <div>Any addons: {addons}</div><br />

          <label className="qty-label" htmlFor="quantity">
            Quantity:
          <input
              className="qty"
              type="number"
              value={this.state.quantity}
              name="quantity"
              onChange={this.handleQuantity}
            />
          </label>

        </div>
      </div>

    );
  }
}
