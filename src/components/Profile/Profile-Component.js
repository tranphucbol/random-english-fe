import React,{useEffect} from 'react';
import handleResponse from '../../helper/ResponseHandler';
import { Redirect, useRouteMatch, Switch, Route } from 'react-router-dom';
import UserFuctions from './UserFunctions';
import UserInfo from './UserInfo';
import CategorySummary from './CategorySummary';

const Profile = (props)=>{

  let {url,path} = useRouteMatch();

  useEffect(() => {
    fetch(props.apiEndpoint+'/users/profile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.cookie,
      },
      })
      .then(res => handleResponse(res))
      .then(resdata => {
        localStorage.setItem("user",JSON.stringify(resdata));
        props.setNewData(resdata);
      })
  }, []);

  // if authorization fails
  if(props.data === false)
    return <Redirect to="/login"></Redirect>
  else // render the profile page
  return (
  <div className="w-full max-w-full m-auto space-x-12 grid grid-cols-3 gap-4">
    {/* User Dashboard */}
    <div className="col-span-1 m-auto max-h-full items-center">
      {/* Links */}
      <UserFuctions url={url}></UserFuctions>
      {/* <div className="mb-5 align-center flex flex-wrap items-center justify-center">
      <img className="mb-1 rounded-full h-48 w-48 flex items-center justify-center" src="https://previews.123rf.com/images/artshock/artshock1210/artshock121000046/15557821-imag-of-water-drops-on-window-and-blue-sky-background.jpg" alt="Avatar"/>
      <hr style={{width:'100%',height:'0',border:'0',shadow:'0'}}></hr>
      <div className="text-2xl text-black"
      style={{textShadow:'2px 2px 4px #000000'}}
      >{props.data && props.data.name}</div> */}
    </div>
      {/* Content */}
    <div className="col-span-2">
      {/* Switch & Components */}
      <Switch>
        <Route path={`${path}/info`}>
          <UserInfo></UserInfo>
        </Route>
        <Route path={`${path}/categories`}>
          <CategorySummary></CategorySummary>
        </Route>
      </Switch>
    </div>
    </div>
  )
}

export default Profile;

