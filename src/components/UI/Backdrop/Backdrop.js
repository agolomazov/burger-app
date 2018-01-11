import React from 'react';
import classes from './Backdrop.css';

const Backdrop = props =>
  props.show ? (
    <div
      className={classes.Backdrop}
      style={{
        backgroundColor: props.backdropBG ? props.backdropBG : 'black',
        opacity: props.backdropOpacity ? props.backdropOpacity : '1'
      }}
      onClick={props.clicked}
    />
  ) : null;

export default Backdrop;
