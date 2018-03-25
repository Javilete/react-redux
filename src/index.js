/*eslint-disable import/default */ //To avoid it complains a file does not have default export (configureStore.js)
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { loadCourses } from "./actions/courseActions";
import { loadAuthors } from "./actions/authorActions";
import './styles/styles.css'; // Webpack also bundles css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();
store.dispatch(loadCourses()); // Load courses on app load
store.dispatch(loadAuthors()); // Load authors on app load

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app')
);
