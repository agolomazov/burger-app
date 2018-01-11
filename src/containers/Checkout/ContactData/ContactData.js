import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ваше имя'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ваш адрес'
        },
        validation: {
          required: true
        },
        value: '',
        valid: false,
        shouldValidate: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Ваш почтовый индекс',
          maxLength: '6'
        },
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        value: '',
        valid: false,
        shouldValidate: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Страна'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Ваш e-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{
            value: 'fastest',
            displayValue: 'В ближайшее время'
          }, {
            value: 'cheapest',
            displayValue: 'Через 2 часа'
          }]
        },
        value: 'fastest',
        valid: true,
        shouldValidate: true,
        touched: true
      }
    },
    isValidForm: false,
    loading: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const formData = {};
    for(let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: {...formData}
    };
    axios
    .post('/orders.json', order)
    .then(response => {
      this.setState({
        loading: false
      });
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({
        loading: false
      });
    });
  }

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

  inputChangedHandler = (event, key) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const updatedOrderElement = {
      ...updatedOrderForm[key]
    }

    updatedOrderElement.value = event.target.value;
    updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
    updatedOrderElement.touched = true;
    updatedOrderForm[key] = updatedOrderElement;
    this.setState({
      orderForm: updatedOrderForm
    })

    let formIsValid = true;
    for(let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
    this.setState({
      isValidForm: formIsValid
    });
  }

  onBlurHandler(key) {
    this.setState({
      orderForm: {
        ...this.state.orderForm,
        [key]: {
          ...this.state.orderForm[key],
          touched: true
        }
      }
    })
  }

  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <div className={classes.ContactData}>
        <h4>Укажите свои контактные данные</h4>
        <form onSubmit={this.orderHandler}>
          { formElements.map(formElement => (
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
          )) }
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            disabled={!this.state.isValidForm}
          >
            Заказать
          </Button>
        </form>
      </div>
    );

    if (this.state.loading) {
      form = <Spinner/>;
    }

    return form;
  }
}

export default WithErrorHandler(ContactData, axios);
