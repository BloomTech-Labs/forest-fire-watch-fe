import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import GlobalState from './context/GlobalContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
//setting state to global for use
ReactDOM.render(
    <GlobalState>
        <Header/>
        <Router>
            <App/>
        </Router>
    </GlobalState>
, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
