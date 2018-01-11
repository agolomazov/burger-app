import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false
  };

  componentDidMount() {
    axios.get('/orders.json').then(response => {
      let orders = [];
      for (let order in response.data) {
        orders = [...orders, {
          ...response.data[order],
          id: order
        }];
      }
      this.setState({ loading: false, orders });
    }).catch(error => {
      this.setState({ loading: false, error: true });
    })
  }

  render() {
    let orders = <Spinner/>;

    if(!this.state.loading) {

      if(this.state.error) {
        orders = <p>Произошла какая-та хуйня</p>;
      } else {
        orders = !this.state.orders.length ? <p>Нет нихуя заказов</p> :
          (<Fragment>{
            this.state.orders.map(order => {
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

export default WithErrorHandler(Orders, axios);
