import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Ingredient.module.css';

class Ingredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case 'bread-top':
        ingredient = <div className={classes.BreadTop} />;
        break;
      case 'meat':
        ingredient = <div className={classes.Meat} />;
        break;
      case 'cheese':
        ingredient = <div className={classes.Cheese} />;
        break;
      case 'salad':
        ingredient = <div className={classes.Salad} />;
        break;
      case 'bacon':
        ingredient = <div className={classes.Bacon} />;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

Ingredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default Ingredient;
