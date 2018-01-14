import * as actions from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actions.AUTH_START
});

export const authSuccess = (authData) => ({
  type: actions.AUTH_SUCCESS,
  authData
});

export const authFail = (error) => ({
  type: actions.AUTH_FAIL,
  error
});

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
      dispatch(authSuccess(response.data));
    }).catch(error => {
      dispatch(authFail(error));
    })
  }
}
