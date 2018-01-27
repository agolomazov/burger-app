import * as actionTypes from './actionTypes';

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

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
}

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT
})

export const checkAuthTimeout = (expirationTime) => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime
});

export const auth = (email, password, isSignup) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignup
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT,
  path
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE
});
