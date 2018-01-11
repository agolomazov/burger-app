import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h1>Мы надеемся что тест пройдет успешно</h1>
    <div style={{ height: '300px', margin: '0 auto 50px' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button
      btnType="Danger"
      clicked={props.checkoutCancelled}
    >
      Отмена
    </Button>
    <Button
      btnType="Success"
      clicked={props.checkoutContinued}
    >
      Продолжить
    </Button>
  </div>
);

export default CheckoutSummary;
