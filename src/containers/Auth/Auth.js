import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Ваш email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Пароль'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        shouldValidate: false,
        touched: false
      }
    },
    isSignup: true
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    })
    this.setState({controls: updatedControls});
  }

  onBlurHandler(key) {
    this.setState({
      orderForm: {
        ...this.state.controls,
        [key]: {
          ...this.state.controls[key],
          touched: true
        }
      }
    })
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      isSignup: !prevState.isSignup
    }));
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  render() {
    let formElements = [];
    let redirect = null;

    if (this.props.isAuthenticated) {
      redirect = <Redirect to={this.props.authRedirectPath}/>;
    }

    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        value={formElement.config.value}
        elementConfig={formElement.config.elementConfig}
        changed={(event) => {
          this.inputChangedHandler(event, formElement.id)
        }}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.shouldValidate}
        touched={formElement.config.touched}
        onBlur={() => {
          this.onBlurHandler(formElement.id)
        }}
      />
    ));

    if (this.props.loading) {
      form = <Spinner/>;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{ this.props.error.message }</p>
      );
    }

    return (
      <div className={classes.Auth}>
        { redirect }
        { errorMessage }
        <form onSubmit={this.submitHandler}>
          { form }
          <Button btnType="Success">Войти</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >Войти как {this.state.isSignup ? 'новый пользователь' : 'зарегистрированный пользователь'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.userId !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirect
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
