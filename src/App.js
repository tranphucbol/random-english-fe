
import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import './css/tailwind.css'
import LoginForm from "./components/Login-Component";
import RegisterForm from "./components/Register-Component";
import HeaderComponent from "./components/Header/Header-Component";
import Profile from "./components/Profile/Profile-Component";
import RandomCard from "./components/RandomCard-Component"
import FooterComponent from "./components/Footer-Component";
import ResetPasswordForm from "./components/VerifyResetPassword/ResetPassword-Component";
import { useCookies } from "react-cookie"
import CategoryEdit from './components/CardUpload/CategoryEdit-Component';
import VerifyUserForm from './components/VerifyResetPassword/VerifyUser-Component';

function App() {
  const login = (localStorage.getItem("login") === 'true');
  const apiEndpoint = "http://128.199.168.137:3637/api";
  const [cookies, setCookie, removeCookie] = useCookies(['authentication']);

  const location = useLocation();
  const setAuthCookie = (cookieName, cookieValue, options) => setCookie(cookieName, cookieValue, options);
  const authCookie = cookies['authentication'];
  const [data, setData] = useState(localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")));
  const setNewData = (data) => setData(data);

  const checkOuter = (pathName) => {
    console.log(pathName);
    if (['/login', '/register', '/reset-password','/verify-user'].includes(pathName)) {
      return false;
    } 
    return true;
  }

  return (
    <div className="container max-w-full min-h-screen flex flex-col justify-between" style={{background: 'linear-gradient(#10405f 10%, #005d96 100%)'}}>
      {checkOuter(location.pathname) && <HeaderComponent login={login}justify removeCookie={removeCookie} setNewData={setNewData} cookie={authCookie} user={data}  apiEndpoint={apiEndpoint}></HeaderComponent>}
      <div id="mainContent" className="container mx-auto min-h-full">
      <Switch>
        <Route exact path='/login' render={(props) => <LoginForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></LoginForm>} />
        <PrivateRoute path='/profile' component={Profile} login={login} cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}></PrivateRoute>
        <PrivateRoute path='/category/edit' component={CategoryEdit} cookie={authCookie} login={login} apiEndpoint={apiEndpoint} ></PrivateRoute>
        <Route exact path='/verify-user' render={(props) => <VerifyUserForm apiEndpoint={apiEndpoint} {...props}></VerifyUserForm>} />
        <Route exact path='/register'  render={(props) => <RegisterForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></RegisterForm>} />
        <Route exact path='/reset-password' render={(props) => <ResetPasswordForm apiEndpoint={apiEndpoint} {...props}></ResetPasswordForm>} />
        
        <Route exact path='/' render={props => (
            login?
                <Redirect to='/profile'/>
            : <Redirect to="/login" />
        )} />
      </Switch>
          <Route path='/card/random' render={(props) => <RandomCard></RandomCard>}></Route>
      </div>
      {checkOuter(location.pathname) && <FooterComponent></FooterComponent>}
    </div>
  );
}

const PrivateRoute = ({ component: Component, login, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      login ?
        <Component {...rest} {...props} />
        : <Redirect to="/login" />
    )} />
  );
};

export default App;