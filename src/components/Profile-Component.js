import React,{useEffect} from 'react';
import handleResponse from '../helper/ResponseHandler';
import { Redirect } from 'react-router-dom';

const Profile = (props)=>{
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
        props.setNewData(resdata);
      })
  }, []);

  // if authorization fails
  if(props.data === false)
    return <Redirect to="/login"></Redirect>
  else // render the profile page
  return (
  <div className="flex w-full max-w-full m-auto space-x-12">
    <div className="w-1/4 m-auto max-h-full items-center">
      {/* Avatar zone */}
      <div className="mb-5 align-center flex flex-wrap items-center justify-center">
      <img className="mb-1 rounded-full h-48 w-48 flex items-center justify-center" src="https://previews.123rf.com/images/artshock/artshock1210/artshock121000046/15557821-imag-of-water-drops-on-window-and-blue-sky-background.jpg" alt="Avatar"/>
      <hr style={{width:'100%',height:'0',border:'0',shadow:'0'}}></hr>
      <div className="text-2xl text-black"
      style={{textShadow:'2px 2px 4px #000000'}}
      >{props.data && props.data.name}</div>
    </div>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2">
            Email
          </label>
          <p className="block text-gray-700 text-sm font-bold mb-2">
            {props.data && props.data['email']}
          </p>
        </div>
        <div className="mb-4">
         <label className="block text-gray-500 text-sm font-bold mb-2">
            Full Name
          </label>
          <p className="block text-gray-700 text-sm font-bold mb-2">
            {props.data && props.data['name']}
          </p>
        </div>
        <div className="mb-4">
         <label className="block text-gray-500 text-sm font-bold mb-2">
            Phone Number
          </label>
          <p className="block text-gray-700 text-sm font-bold mb-2">
            {props.data && props.data['numberPhone']}
          </p>
        </div>
        <div className="text-right">
        <button className="text-right .justify-end">Edit profile</button>
        </div>
      </form>
      </div>
      <div className="w-3/4 m-auto max-h-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
        <div>
          Statistics
        </div>
      </form>
      </div>
    </div>
  )
}

export default Profile;

