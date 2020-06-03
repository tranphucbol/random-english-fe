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
  return (<div className="w-full max-w-xs" style={{margin: '50px auto'}}>
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
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  )
}

export default Profile;

