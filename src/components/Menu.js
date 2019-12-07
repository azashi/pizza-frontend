import React, { Component } from "react";
import axios from "axios";
import MenuPizza from "./MenuPizza";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: parseInt(this.props.match.params.userid),
      order: []
    };
  }

  componentDidMount() {
    axios
      .get("https://pizza-back-end.herokuapp.com/getpizzainfo")
      .then(resp => {
        this.setState({
          pizzaList: resp.data
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  //1001:2,1003:4,1006:1

  placeorder = user => {};

  orderDetails = (foodid, qty) => {
    this.setState({ [foodid]: parseInt(qty) }, () => {
      // console.log(foodid, qty, this.state[foodid]);
      //console.log(this.state);
    });
  };

  render() {
    const pizzaList = this.state.pizzaList;
    return (
      <div>
        <h4>Menu</h4>
        <ul>
          {pizzaList &&
            pizzaList.map((row, i) => {
              return (
                <MenuPizza
                  key={row.FOOD_ID}
                  data={row}
                  order={this.orderDetails.bind(this, row.FOOD_ID)}
                />
              );
            })}
        </ul>
        <input type="submit" value="Place order" onClick={this.handleSubmit} />
        <br />
        <Link to={`/orderhistory/${this.state.userid}`}>View Past orders</Link>
        <br />
      </div>
    );
  }
}
