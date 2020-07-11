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
              value={qty}
              disabled
            />
          </label>

        </div>
      </div>
    );
  }
}
