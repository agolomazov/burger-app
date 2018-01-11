import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredients = Object.keys(props.ingredients).map((igKey, index) => (
    <li key={index}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Fragment>
      <h3>Ваш заказ</h3>
      <p>Превосходный бургер со следующими ингредиентами:</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Итоговая стоимость: {props.price.toFixed(2)}</strong>
      </p>
      <p>Продолжить оформление?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        Отмена
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Продолжить
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
