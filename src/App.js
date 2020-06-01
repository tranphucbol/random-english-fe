import React, {useState} from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import './css/tailwind.css'
import  LoginForm  from "./components/Login-Component";
import RegisterForm from "./components/Register-Component";
import CardUploadForm from "./components/CardUpload-Component";
import HeaderComponent from "./components/Header-Component";
import Profile from "./components/Profile-Component";
import {useCookies} from "react-cookie"

function App() {
  const login = (localStorage.getItem("login")==='true');
  const apiEndpoint = "https://random-english.herokuapp.com/api";
  const [cookies,setCookie] = useCookies(['authentication']);

  const setAuthCookie = (cookieName,cookieValue,options) => setCookie(cookieName,cookieValue,options);
  const authCookie = cookies['authentication'];
  const [data,setData] = useState(null);
  const setNewData = (data) => setData(data);

  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <Switch>
        <Route exact path='/login' render={(props) => <LoginForm login={login} setCookie={setAuthCookie} apiEndpoint={apiEndpoint}></LoginForm>} />
        <PrivateRoute path='/profile' login={login} cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}></PrivateRoute>
        <Route path='/card/upload' render={(props) => <CardUploadForm></CardUploadForm>}></Route>
        {/* <Route exact path='/profile' render={props => (
            login?
                <Profile cookie={authCookie} data={data} setNewData={setNewData} apiEndpoint={apiEndpoint}/>
            : <Redirect to="/login" />
        )} /> */}
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

const PrivateRoute = ({component: Component,login, ...rest}) => {
  return (
      <Route {...rest} render={props => (
        login?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};

export default App;
