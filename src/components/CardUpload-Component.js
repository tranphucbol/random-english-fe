import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';

const inputField = (props) => {
    return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.name}>
            {props.name}
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={props.name} name={props.name} type={props.type} placeholder={props.placeholder}
          ref={props.ref}/>
          <p className="text-left text-red-700 text-xs">{props.errors?.(props.name).message}</p>
        </div>
    );
}

const RegisterForm = (props)=>{

  const schema = yup.object().shape({
    eng:yup.string.required(),
    vie:yup.string.required(),
    concept: yup.string.required(),
    image: Yup.mixed().test('fileType', "Unsupported File Format", value => ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type) ),
  });

  const onSubmit = data => {
    // truyen xuong back-end + render /profile
    const register = fetch(props.apiEndpoint + '/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.Email,
        password: data.password,
        name: data.name,
        numberPhone: data.phoneNumber.toString(),
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.data && res.data.token != null){
          let expireDate = new Date();
          expireDate.setTime(expireDate.getTime() + (15*60*1000)); // 15 min expiration
          localStorage.setItem("login","true");
          props.setCookie('authentication',res.data.token,{
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

  if(!props.login){
      return <Redirect to="/login"></Redirect>
  } else
    return (<div className="w-full max-w-xs" style={{margin: '50px auto'}}>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <inputField name="eng" placeholder="the word in English" ref={register} errors={errors}></inputField>
        <div className="flex items-center justify-between"  style={{justifyContent:"center"}}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save this card
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>)
}

export default RegisterForm;

