import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

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

  checkValidity = (value, rules) => {
    let isValid = true;

    if(!rules) {
      return true;
    }

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({ controls: updatedControls });
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

  render() {
    let formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        value={formElement.config.value}
        elementConfig={formElement.config.elementConfig}
        changed={(event) => { this.inputChangedHandler(event, formElement.id) }}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.shouldValidate}
        touched={formElement.config.touched}
        onBlur={() => { this.onBlurHandler(formElement.id) }}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          { form }
          <Button btnType="Success">Войти</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
});

export default connect(null, mapDispatchToProps)(Auth);
