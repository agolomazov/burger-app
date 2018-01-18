import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
  state = {
    error: false
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner/>;

    if(!this.props.loading) {

      if(this.state.error) {
        orders = <p>Произошла какая-та хуйня</p>;
      } else {
        orders = !this.props.orders.length ? <p>Нет нихуя заказов</p> :
          (<Fragment>{
            this.props.orders.map(order => {
              return (<Order
                          key={order.id}
                          price={order.price}
                          ingredients={order.ingredients}
                      />);
            })
          }</Fragment>);
      }
    }

    return(
      <div>
        { orders }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));
