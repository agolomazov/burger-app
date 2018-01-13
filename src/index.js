import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import burgerBuilderReducer from './store/reducers/burgerBuilder';

// Example simple middleware
// const logger = store => {
//   return next => {
//     return action => {
//       console.log('[Middleware] Dispatching ', action);
//       const result = next(action);
//       console.log('[Middleware] next state', store.getState());
//       return result;
//     }
//   }
// }

const store = createStore(burgerBuilderReducer, composeWithDevTools(applyMiddleware()));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  app, document.getElementById('root'));
registerServiceWorker();
