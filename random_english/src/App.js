import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import './css/tailwind.css'
import  LoginForm  from "./components/Login-Component";
import RegisterForm from "./components/Register-Component";
import Profile from "./components/Profile-Component";

function App() {
  const [login, setLogin] = useState(false);
  const apiEndpoint = "http://localhost:3001/api";
  const [curUser,setUser] = useState(null);

  const setLoginTrue = () => setLogin(true);
  const setCurUser = (user) => setUser(user);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/login' render={(props) => <LoginForm login={login} setLogin={setLoginTrue} setCurUser={setCurUser} apiEndpoint={apiEndpoint}></LoginForm>} />
        <Route exact path='/profile' render={props => (
            login?
                <Profile curUser={curUser}/>
            : <Redirect to="/login" />
        )} />
        <Route exact path='/Register' render={(props) => <RegisterForm login={login} setLogin={setLoginTrue} setCurUser={setCurUser} apiEndpoint={apiEndpoint}></RegisterForm>} />
        <Route path='/' render={props => (
            login?
                <Profile curUser={curUser}/>
            : <Redirect to="/login" />
        )} />
      </Switch>
    </div>
  );
}

export default App;
