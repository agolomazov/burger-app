import React from 'react';

import classes from './Input.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && (props.shouldValidate || props.touched)) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        onBlur={props.onBlur}
      />;
      break;
    case 'textarea':
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        onBlur={props.onBlur}
      ></textarea>;
      break;
    case 'select':
      inputElement = (
        <select
          value={props.value}
          className={inputClasses.join(' ')}
          onChange={props.changed}
          onBlur={props.onBlur}
        >
          { props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          )) }
        </select>
      )
      break;
    default:
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        onBlur={props.onBlur}
      />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      { inputElement }
    </div>
  );
};

export default Input;
