
import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import './css/tailwind.css'
import LoginForm from "./components/Login-Component";
import RegisterForm from "./components/Register-Component";
import LearnCard from "./components/LearnCard-Component"
import TestWord from "./components/Test/Test"
import HeaderComponent from "./components/Header/Header-Component";
import Profile from "./components/Profile/Profile-Component";
import RandomCard from "./components/RandomCard-Component"
import FooterComponent from "./components/Footer-Component";
import MyCategories from "./components/Category/MyCategories"
import PublicCategories from "./components/Category/PublicCategories"
import ResetPasswordForm from "./components/VerifyResetPassword/ResetPassword-Component";
import { useCookies } from "react-cookie"
import CategoryEdit from './components/CardUpload/CategoryEdit-Component';
import VerifyUserForm from './components/VerifyResetPassword/VerifyUser-Component';
import ReactNotification from 'react-notifications-component'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ChangePasswordForm from './components/VerifyResetPassword/ChangePassword-Component'

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
    <div className="max-w-full min-h-screen flex flex-col" style={{ background: 'linear-gradient(#10405f 10%, #005d96 100%)' }}>
      {checkOuter(location.pathname) && <HeaderComponent login={login} cookie={authCookie} justify removeCookie={removeCookie} setNewData={setNewData} user={data}></HeaderComponent>}
      <ReactNotification />
      <div id="mainContent" className="container mx-auto min-h-full">
        <TransitionGroup className="w-full">
          <CSSTransition key={location.key} classNames="page" timeout={300} unmountOnExit>
            <Switch>
              <Route exact path='/login' render={(props) => <LoginForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></LoginForm>} />
              {/* <PrivateRoute exact path='/profile' component={Profile} login={login} cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}></PrivateRoute> */}
              {/* <PrivateRoute path='/card/upload' component={CardUploadForm} login={login}></PrivateRoute> */}
              <Route exact path='/register' render={(props) => <RegisterForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></RegisterForm>} />
              <PrivateRoute path='/learn/category/:id' component={LearnCard} cookie={authCookie} login={login} apiEndpoint={apiEndpoint} ></PrivateRoute>
              <PrivateRoute path='/change-password' component={ChangePasswordForm} cookie={authCookie} login={login} apiEndpoint={apiEndpoint} ></PrivateRoute>
              <PrivateRoute path='/my-categories/' component={MyCategories} cookie={authCookie} login={login} apiEndpoint={apiEndpoint}></PrivateRoute>
              <PrivateRoute path='/public-categories/' component={PublicCategories} cookie={authCookie} login={login} apiEndpoint={apiEndpoint}></PrivateRoute>
              <PrivateRoute path='/test/category/:id' cookie={authCookie} login={login} apiEndpoint={apiEndpoint} component={TestWord}></PrivateRoute>
              <Route path='/card/random' render={(props) => <RandomCard></RandomCard>}></Route>
              <Route exact path='/verify-user' render={(props) => <VerifyUserForm apiEndpoint={apiEndpoint} {...props}></VerifyUserForm>} />
              <PrivateRoute path='/category/edit' component={CategoryEdit} cookie={authCookie} login={login} apiEndpoint={apiEndpoint} ></PrivateRoute>
              <Route exact path='/reset-password' render={(props) => <ResetPasswordForm apiEndpoint={apiEndpoint} {...props}></ResetPasswordForm>} />
              <Route path='/' render={props => (
                  <Redirect to='/card/random' />)} />
            </Switch>
          </CSSTransition>
        </TransitionGroup >
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