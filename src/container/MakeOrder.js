import React, { Component } from 'react';
import axios from 'axios';
import classes from './MakeOrder.module.css';
import Ingredient from '../components/Ingredient';
import Modal from '../components/Order';

const PRICE = {
  salad: 0.2,
  cheese: 0.5,
  meat: 1.2,
  bacon: 1.7
};

class Sandwich extends Component {
  state = {
    ingredients: {
      meat: 0,
      bacon: 0,
      cheese: 0,
      salad: 0
    },
    totalPrice: 2,
    purchaseable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    let count = 0;
    for (const ig in ingredients) {
      count += ingredients[ig];
    }
    this.setState({ purchaseable: count > 0 });
  }

  addIngredientHandler = type => {
    let count = this.state.ingredients[type];
    count++;
    let newIngredients = { ...this.state.ingredients };
    newIngredients[type] = count;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + PRICE[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    this.updatePurchaseState(newIngredients);
  };

  removeIngredientHandler = type => {
    let count = this.state.ingredients[type];
    if (count <= 0) {
      return;
    }
    count--;
    let newIngredients = { ...this.state.ingredients };
    newIngredients[type] = count;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - PRICE[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    this.updatePurchaseState(newIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({
      ingredients: {
        meat: 0,
        bacon: 0,
        cheese: 0,
        salad: 0
      },
      totalPrice: 2,
      purchaseable: false,
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Jonathan',
        mobile: 5556667777,
        address: {
          street: '101 Fairytale Street',
          state: 'Washington',
          zipCode: 55555
        },
        email: 'test@test.com'
      }
    };
    axios
      .post('https://sandwich-2f4a2.firebaseio.com/orders.json', order);
    alert('Your order is received!');
    this.purchaseCancelHandler();
  };

  render() {
    let sandwich = [];
    for (const ig in this.state.ingredients) {
      let i = 0;
      while (i < this.state.ingredients[ig]) {
        sandwich.push(<Ingredient key={ig + i} type={ig} />);
        i++;
      }
    }

    let igControl = [];
    for (const ig in this.state.ingredients) {
      igControl.push(
        <div className={classes.BuildControl} key={ig}>
          <div className={classes.Label}>{ig}</div>
          <button
            className={classes.Less}
            onClick={() => {
              this.removeIngredientHandler(ig);
            }}
          >
            Less
          </button>
          <button
            className={classes.More}
            onClick={() => {
              this.addIngredientHandler(ig);
            }}
          >
            More
          </button>
        </div>
      );
    }

    let ingredientSummary = [];
    for (const ig in this.state.ingredients) {
      ingredientSummary.push(
        <li key={ig}>
          <div className={classes.OrderSummary}>{ig}:
          </div>
           {this.state.ingredients[ig]}
        </li>
      );
    }

    let orderSummary = (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious sandwich with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.state.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <button
          className={[classes.Button, classes.Danger].join(' ')}
          onClick={this.purchaseCancelHandler}
        >
          CANCEL
        </button>
        <button
          className={[classes.Button, classes.Success].join(' ')}
          onClick={this.purchaseContinueHandler}
        >
          CONTINUE
        </button>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {/* This div shows OrderSummary */}
        <Modal show={this.state.purchasing}>{orderSummary}</Modal>
        {/* This div draws Sandwich */}
        <div className={classes.Sandwich}>
          <Ingredient type="bread-top" />
          {sandwich}
          <Ingredient type="bread-bottom" />
        </div>
        {/* This div draws Selection Panel */}
        <div className={classes.BuildControls}>
          <p>
            Current Price:{' '}
            <strong>{this.state.totalPrice.toFixed(2)}</strong>
          </p>
          {igControl}
          <button
            className={classes.OrderButton}
            disabled={!this.state.purchaseable}
            onClick={this.purchaseHandler}
          >
            ORDER NOW
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Sandwich;
