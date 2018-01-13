import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;
    if(this.props.ings) {
      summary = (<CheckoutSummary
        ingredients={this.props.ings}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />);
    }

    return(
      <div>
        { summary }
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice
});

export default connect(mapStateToProps)(Checkout);
