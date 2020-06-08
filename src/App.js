
import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import './css/tailwind.css'
import LoginForm from "./components/Login-Component";
import RegisterForm from "./components/Register-Component";
import CardUploadForm from "./components/CardUpload-Component";
import HeaderComponent from "./components/Header-Component";
import Profile from "./components/Profile-Component";
import LearnCard from "./components/LearnCard-Component"
import RandomCard from "./components/RandomCard-Component"
import FooterComponent from "./components/Footer-Component";
import ResetPasswordForm from "./components/ResetPassword-Component";
import MyCategories from "./components/categories/MyCategories"
import PublicCategories from "./components/categories/PublicCategories"
import { useCookies } from "react-cookie"
import ReactNotification from 'react-notifications-component'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function App() {
  const login = (localStorage.getItem("login") === 'true');
  // const apiEndpoint = "http://128.199.168.137:3637/api";
  const apiEndpoint = "http://localhost:3001/api";
  const [cookies, setCookie, removeCookie] = useCookies(['authentication']);

  const location = useLocation();
  const setAuthCookie = (cookieName, cookieValue, options) => setCookie(cookieName, cookieValue, options);
  const authCookie = cookies['authentication'];
  const [data, setData] = useState(null);
  const setNewData = (data) => setData(data);

  const checkOuter = (pathName) => {
    console.log(pathName);
    if (['/login', '/register', '/reset-password'].includes(pathName)) {
      return false;
    }
    return true;
  }

  return (
    <div className="max-w-full min-h-screen flex flex-col" style={{ background: 'linear-gradient(#10405f 10%, #005d96 100%)' }}>
      {checkOuter(location.pathname) && <HeaderComponent login={login} justify removeCookie={removeCookie} setNewData={setNewData} user={data}></HeaderComponent>}
      <ReactNotification />
      <div id="mainContent" className="container mx-auto min-h-full">
        <TransitionGroup className="w-full">
          <CSSTransition key={location.key} classNames="page" timeout={300} unmountOnExit>
            <Switch>
              <Route exact path='/login' render={(props) => <LoginForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></LoginForm>} />
              <PrivateRoute path='/profile' component={Profile} login={login} cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}></PrivateRoute>
              <PrivateRoute path='/card/upload' component={CardUploadForm} login={login}></PrivateRoute>
              <Route exact path='/register' render={(props) => <RegisterForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></RegisterForm>} />
              <Route exact path='/reset-password' render={(props) => <ResetPasswordForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></ResetPasswordForm>} />
              <Route path='/learn/category/:id' render={(props) => <LearnCard></LearnCard>}></Route>
              <Route path='/my-categories/' render={(props) => <MyCategories cookie={authCookie} apiEndpoint={apiEndpoint} />}></Route>
              <Route path='/public-categories/' render={(props) => <PublicCategories cookie={authCookie} apiEndpoint={apiEndpoint} />}></Route>
              <Route path='/card/random' render={(props) => <RandomCard></RandomCard>}></Route>
              <Route exact path='/' render={props => (
                login ?
                  <Redirect to='/profile' />
                  : <Redirect to="/login" />
              )} />
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