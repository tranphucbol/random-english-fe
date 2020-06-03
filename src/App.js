import React, {useState} from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import './css/tailwind.css'
import  LoginForm  from "./components/Login-Component";
import RegisterForm from "./components/Register-Component";
import CardUploadForm from "./components/CardUpload-Component";
import HeaderComponent from "./components/Header-Component";
import Profile from "./components/Profile-Component";
import FooterComponent from "./components/Footer-Component";
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
    <div className="App relative content-center w-100 flex flex-col overflowx-scroll">
      <HeaderComponent login={login} removeCookie={removeCookie} setNewData={setNewData} user={data}></HeaderComponent>
      <div id="mainContent" className="mt-auto mb-auto ml-5 mr-5 w-100">
      <Switch>
        <Route exact path='/login' render={(props) => <LoginForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></LoginForm>} />
        <PrivateRoute path='/profile' component={Profile} login={login} cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}></PrivateRoute>
        <PrivateRoute path='/card/upload' component={CardUploadForm} login={login}></PrivateRoute>
        <Route exact path='/Register'  render={(props) => <RegisterForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></RegisterForm>} />
        <Route exact path='/' render={props => (
            login?
                <Redirect to='/profile'/>
            : <Redirect to="/login" />
        )} />
      </Switch>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

const PrivateRoute = ({component: Component,login, ...rest}) => {
  return (
      <Route {...rest} render={props => (
        login?
              <Component {...rest} {...props} />
          : <Redirect to="/login" />
      )} />
  );
};

export default App;
