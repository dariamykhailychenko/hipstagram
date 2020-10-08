import React  from 'react';
import { Provider } from 'react-redux';
import AppHandler from '../AppHandler';
import store from '../../store/store';
import {BrowserRouter as Router} from 'react-router-dom';
import '../../App.css';


const Layout = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppHandler/>
      </Router>
    </Provider>
  );
};


export default Layout;
