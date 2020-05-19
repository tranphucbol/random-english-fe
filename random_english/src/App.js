import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import './css/tailwind.css'
import  LoginForm  from "./components/Login-Component";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/login' component={LoginForm}/>
        {/* <Route path='/Register' component={RegisterForm}/> */}
        <Route path='/' component={LoginForm}/>
      </Switch>
    </div>
  );
}

export default App;
