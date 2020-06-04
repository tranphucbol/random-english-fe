import React,{useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { Redirect ,useHistory} from 'react-router-dom';

const ResetPasswordForm = (props)=>{
  const [response,setResponse] = useState(null);
  const history = useHistory();

  const schema = yup.object().shape({
    Email: yup
      .string()
      .required()
      .email()
  });
  
  const onSubmit = data => {
    setResponse(null);
    fetch(props.apiEndpoint+'/users/resetPassword', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.Email
      })
    })
    .then(res => res.json())
    .then(res => {
        setResponse(res.message);
      });
  }
  
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  if (props.login) {
      return <Redirect to="/profile"></Redirect>;
  } else
      return (
          <div className="flex justify-center items-center flex-col">
              <div className="flex my-3 items-center">
                  <img
                      src={`${process.env.PUBLIC_URL}/dice.png`}
                      alt="logo"
                      width="50"
                  ></img>
                  <h2 className="ml-3 text-2xl text-gray-700 font-bold">
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
                      className="flex items-center justify-between text-yellow-700 text-md padding mb-4"
                      style={{ justifyContent: "center" }} 
                      >
                        {response && response}
                  </div>
                  <div
                      className="flex items-center justify-between"
                      style={{ justifyContent: "center" }}
                  >
                      <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                      >
                          Reset your password
                      </button>
                  </div>
                  <div className="mt-3 justify-center inline-block flex w-100">
                          <p className="text-sm text-gray-600 mr-1">Back to </p>
                          <button onClick={() => {history.push('/login')}} className="text-sm text-blue-700 hover:text-white">login</button>
                    </div>
              </form>
          </div>
      );
};

export default ResetPasswordForm;
