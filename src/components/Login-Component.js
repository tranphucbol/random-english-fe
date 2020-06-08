import React,{useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { Redirect ,useHistory} from 'react-router-dom';

const LoginForm = (props)=>{
  const [loginErr,setLoginErr] = useState(null);
  const history = useHistory();

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
    setLoginErr(null);
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
    .then(res => {
      if(res.data && res.data.token != null){
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (24*3600*1000)); // 15 min expiration
        localStorage.setItem("login","true");
        props.setCookie('authentication',res.data.token,{
          expires: expireDate,
          path: '/',
          httpOnly: false,
        });
      }
      if(res.status === 0){
        if(res.message !== "User has not verified yet")
        setLoginErr(res.message);
        else{
          // redirects to verification page
          history.push({pathname: '/verify-user',state: {email:data.Email}});
        }
      }
    })
  }

  const redirect = (to) => {
    return history.push(to);
  }
  
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  if (props.login) {
      return <Redirect to="/profile"></Redirect>;
  } else
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
                  <div className="mb-6">
                      <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="password"
                      >
                          Mật khẩu 
                      </label>
                      <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="password"
                          name="password"
                          type="password"
                          placeholder="******************"
                          ref={register}
                      />
                      <p className="text-left text-red-700 text-sm">
                          {errors?.password?.message}
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
                          Đăng nhập
                      </button>
                  </div>
                  <div className="mt-3 justify-center inline-block flex w-100">
                          <p className="text-sm text-gray-600 ">Bạn chưa có tài khoản? </p>
                          <button onClick={()=>{redirect('/register')}} className="text-sm text-blue-700 hover:text-white ml-2">Tạo ngay</button>
                    </div>
                  <div className="mt-3 justify-center inline-block flex w-100">
                    <p className="text-sm text-gray-600 ">Quên mật khẩu? </p>
                    <button onClick={()=>{redirect('/reset-password')}} className="text-sm text-blue-700 hover:text-white ml-2">Đặt lại mật khẩu</button>
              </div>
              </form>
              <p className="text-center text-gray-500 text-sm">
                  &copy;2020 Acme Corp. All rights reserved.
              </p>
          </div>
        </div>
      );
};

export default LoginForm;