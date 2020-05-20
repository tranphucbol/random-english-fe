import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import './css/tailwind.css'
import  LoginForm  from "./components/Login-Component";
import RegisterForm from "./components/Register-Component";
import Profile from "./components/Profile-Component";
import {useCookies} from "react-cookie"

function App() {
  const login = (localStorage.getItem("login")==='true');
  const apiEndpoint = "https://random-english.herokuapp.com/api";
  const [cookies,setCookie,removeCookie] = useCookies(['authentication']);

  const setAuthCookie = (cookieName,cookieValue,options) => setCookie(cookieName,cookieValue,options);
  const authCookie = cookies['authentication'];
  const [data,setData] = useState(null);
  const setNewData = (data) => setData(data);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/login' render={(props) => <LoginForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></LoginForm>} />
        <Route exact path='/profile' render={props => (
            login?
                <Profile cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}/>
            : <Redirect to="/login" />
        )} />
        <Route exact path='/Register'  render={(props) => <RegisterForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></RegisterForm>} />
        <Route path='/' render={props => (
            login?
                <Profile cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}/>
            : <Redirect to="/login" />
        )} />
      </Switch>
    </div>
  );
}

export default App;
