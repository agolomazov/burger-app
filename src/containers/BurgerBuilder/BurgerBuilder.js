import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import {connect} from 'react-redux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey];
    })
    .reduce((acc, item) => acc + item, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true
      });
    } else {
      this.props.onSetAuthRedirect('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let type in disabledInfo) {
      disabledInfo[type] = disabledInfo[type] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ошибка при загрузка ингридиентов</p> : <Spinner />;

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );

      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          backdropBG="#C3852B"
          backdropOpacity="0.85"
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
  onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
