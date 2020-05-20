import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';

const RegisterForm = (props)=>{

  const schema = yup.object().shape({
    Email: yup
      .string()
      .required()
      .email(),
    password: yup
      .string()
      .required()
      .max(45),
    passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Password must match"),
  });

  const onSubmit = data => {
    // truyen xuong back-end + render /profile
    const login = fetch(props.apiEndpoint + '/users/register', {
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
        if(data.token != null){
          props.setLogin(true);
          props.setCurUser(data.email);
          localStorage.setItem("access-token",data.token);
        }
    })
    console.log(data);
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
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" name="Email" type="text" placeholder="Email"
          ref={register}/>
          <p className="text-left text-red-700 text-xs">{errors?.Email?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="******************" ref={register}/>
          <p className="text-left text-red-700 text-xs">{errors?.password?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
            Re-Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" name="passwordConfirmation" id="passwordConfirmation" type="password" placeholder="******************" ref={register}/>
          <p className="text-left text-red-700 text-xs">{errors?.passwordConfirmation?.message}</p>
        </div>
        <div className="flex items-center justify-between"  style={{justifyContent:"center"}}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Register
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>)
}

export default RegisterForm;

