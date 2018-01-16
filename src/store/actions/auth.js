import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
})

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBvyzb-1dmTpFGaT6atLI25n_To4Z0p1vs';

    if(!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBvyzb-1dmTpFGaT6atLI25n_To4Z0p1vs';
    }

    axios.post(url, {
      email,
      password,
      returnSecureToken: true
    }).then(response => {
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn))
    }).catch(error => {
      dispatch(authFail(error.response.data.error));
    })
  }
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT,
  path
})
