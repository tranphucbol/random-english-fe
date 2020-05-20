import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';

const LoginForm = (props)=>{

  const schema = yup.object().shape({
    Email: yup
      .string()
      .required()
      .email(),
    password: yup
      .string()
      .required()
      .max(45),
  });
  
  const onSubmit = data => {
    // truyen xuong back-end + render /profile
    fetch(props.apiEndpoint+'/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.Email,
      password: data.password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.token != null){
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (15*60*1000)); // 15 min expiration
        localStorage.setItem("login","true");
        props.setCookie('authentication',data.token,{
          expires: expireDate,
          path: '/',
          httpOnly: false,
        });
      }
    })
  }
  
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  if(props.login){
    return <Redirect to="/profile"></Redirect>
  } else
  return (<div className="w-full max-w-xs" style={{margin: '50px auto'}}>
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
          Email
        </label>
        <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" name="Email" type="text" placeholder="Email" ref={register}/>
        <p className="text-left text-red-700 text-xs">{errors?.Email?.message}</p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" ref={register} />
        <p className="text-left text-red-700 text-xs">{errors?.password?.message}</p>
      </div>
      <div className="flex items-center justify-between" style={{justifyContent:"center"}}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Login
      </button>
      </div>
    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>)
}

export default LoginForm;