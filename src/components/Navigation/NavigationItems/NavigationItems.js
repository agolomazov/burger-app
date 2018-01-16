import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact={true}>BurgerBuilder</NavigationItem>
    { !props.isAuthenticated ? null : <NavigationItem link="/orders">Orders</NavigationItem> }
    { !props.isAuthenticated
      ? <NavigationItem link="/auth">Authenticate</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>
    }
  </ul>
);

export default NavigationItems;
