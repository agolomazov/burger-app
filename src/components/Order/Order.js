import React from 'react';

import classes from './Order.css';

const Order = props => {
  let ingredients = [];
  for(let igKey in props.ingredients) {
    if(props.ingredients[igKey]) {
      ingredients.push(`${igKey} (${props.ingredients[igKey]})`);
    }
  }

  ingredients = ingredients.join(', ').trim();

  return (
    <div className={classes.Order}>
      <p>Ингредиенты: {ingredients}</p>
      <p>Цена: <strong>{props.price.toFixed(2)} р.</strong></p>
    </div>
  );
};

export default Order;
