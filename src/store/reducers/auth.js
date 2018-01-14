import * as actionsTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true, error: false });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    loading: false,
    error: null
  })
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
};

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: null,
    loading: false
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START: return authStart(state, action);
    case actionsTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionsTypes.AUTH_FAIL: return authFail(state, action);
    case actionsTypes.AUTH_LOGOUT: return authLogout(state);
    default:
      return state;
  }
};

export default reducer;
