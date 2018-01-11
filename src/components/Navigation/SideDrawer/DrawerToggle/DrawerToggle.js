import React from 'react';
import Button from '../../../UI/Button/Button';

const DrawerToggle = props => (
  <Button clicked={props.clicked}>{props.children}</Button>
);

export default DrawerToggle;
