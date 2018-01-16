import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {
    label: 'Салат',
    type: 'salad'
  },
  {
    label: 'Бекон',
    type: 'bacon'
  },
  {
    label: 'Сыр',
    type: 'cheese'
  },
  {
    label: 'Котлета',
    type: 'meat'
  }
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((control, index) => (
      <BuildControl
        key={index}
        label={control.label}
        type={control.type}
        added={() => {
          props.ingredientAdded(control.type);
        }}
        removed={() => {
          props.ingredientRemove(control.type);
        }}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? 'Оформить заказ' : 'Войти для оформления заказа'}
    </button>
  </div>
);

export default BuildControls;
