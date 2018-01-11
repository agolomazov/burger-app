import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  });
  let countIngedients = 0;
  Object.keys(props.ingredients).map(igKey => {
    return countIngedients += props.ingredients[igKey];
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {countIngedients
        ? transformedIngredients
        : 'Добавьте ингредиенты в ваш бурер'}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
