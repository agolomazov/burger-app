import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
});

export const removeIngredient = (name) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
});

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
};

export const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json').then(response => {
      dispatch(setIngredients(response.data));
    }).catch(error => {
      dispatch(fetchIngredientsFailed(error));
    })
  }
}
