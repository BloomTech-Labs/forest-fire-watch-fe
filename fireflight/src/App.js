import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Danger from './components/Danger'
import Update from './components/Update'
import Login from './components/Login'
import Register from './components/Register'


function App() {

  const [user,setUser]=useState(null)
  const [location,setLocation]=useState('')

  return (
    <div className="App">
      <Navigation/>
      <Route exact path="/" component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/update" component={Update}/>
      <Route path="/danger" component={Danger}/>
    </div>
  );
}

export default App;
