import React,{useState} from 'react';
import {useForm} from 'react-hook-form';
import { Redirect ,useHistory} from 'react-router-dom';

const VerifyUserForm = (props)=>{
  const [loginErr,setLoginErr] = useState(null);
  const history = useHistory();
  const api = props.api;
  
  const onSubmit = data => {
    setLoginErr(null);
    // truyen xuong back-end + render /profile
    fetch(props.apiEndpoint+'/users/verify-mail', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: data.verificationCode
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.data && res.status !== 0){
        verified = true;
      }
      if(res.status === 0){
        setLoginErr(res.message);
      }
    })
  }

  const redirect = (to) => {
    return history.push(to);
  }
  
  const { register, handleSubmit, errors } = useForm();
    
    return (
        <div className="container w-100 h-screen flex flex-col justify-center align-items">
            <div className="flex justify-center items-center flex-col">
              <div className="flex my-3 items-center">
                  <img
                      src={`${process.env.PUBLIC_URL}/dice.png`}
                      alt="logo"
                      width="50"
                  ></img>
                  <h2 className="ml-3 text-2xl text-gray-200 font-bold">
                      Random English
                  </h2>
              </div>
              <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleSubmit(onSubmit)}
              >
                  <div className="mb-4">
                      <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="Email"
                      >
                          Email
                      </label>
                      <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="Email"
                          name="Email"
                          type="text"
                          placeholder="Email"
                          ref={register}
                      />
                      <p className="text-left text-red-700 text-sm">
                      {errors?.Email?.message}
                      </p>
                  </div>
                  <div
                      className="flex items-center justify-between text-red-700 text-sm padding mb-4"
                      style={{ justifyContent: "center" }} 
                      >
                        {loginErr && loginErr}
                  </div>
                  <div
                      className="flex items-center justify-between"
                      style={{ justifyContent: "center" }}
                  >
                      <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                      >
                          Gửi
                      </button>
                  </div>
                  {verified && <
                      div className="mt-3 justify-center inline-block flex w-100">
                          <p className="text-sm text-gray-600 ">Quay lại trang </p>
                          <button onClick={()=>{redirect('/login')}} className="text-sm text-blue-700 hover:text-white ml-2">đăng nhập</button>
                    </div>}
                    <div className="mt-3 justify-center inline-block flex w-100">
                          <p className="text-sm text-gray-600 ">Gửi lại mail </p>
                          <button onClick={()=>{redirect('/login')}} className="text-sm text-blue-700 hover:text-white ml-2">xác thực</button>
                    </div>
              </form>
              <p className="text-center text-gray-500 text-sm">
                  &copy;2020 Acme Corp. All rights reserved.
              </p>
          </div>
        </div>
      );
};

export default VerifyUserForm;