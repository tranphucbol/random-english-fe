import React, { useState } from 'react';

const LoginForm = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    alert("email: " + email +"\n password: "+ password)
  }

  return (<div className="w-full max-w-xs" style={{margin: '50px auto'}}>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
          Email
        </label>
        <input  onChange={event => setEmail(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="text" placeholder="Email"/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input  onChange={event => setPassword(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
      </div>
      <div className="flex items-center justify-between" style={{justifyContent:"center"}}>
        <button onClick={()=>{login()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Sign In
        </button>
      </div>
    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>)
}

export default LoginForm;

