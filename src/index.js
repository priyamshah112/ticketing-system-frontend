import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { counterReducer, testReducer } from './reducers/testReducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { userListReducer, userLoginReducer } from './reducers/userReducer';
import { roleReducer } from './reducers/roleReducer';
import { managerReducer } from './reducers/managerReducer';
import { ticketListReducer } from './reducers/ticketReducer';
import { addInventoryReducer } from './reducers/inventoryReducer';
import { modelReducer } from './reducers/modalReducer';

const allReducers = combineReducers({
  userDetails: userLoginReducer,
  roles: roleReducer,
  managers: managerReducer,
  userList: userListReducer,
  ticketList: ticketListReducer,
  inventoryList: addInventoryReducer,
  modal: modelReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  {},
  composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
