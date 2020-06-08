import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as yup from 'yup';

const ResetPasswordForm = (props)=>{
  const [loginErr,setLoginErr] = useState(null);
  const history = useHistory();
  const [Email,setEmail] = useState(props.location.state?props.location.state.email:'');
  const [verificationToken, setVerificationToken] = useState(props.location.search? props.location.search.substring(7,):'');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [verified, setVerified] = useState(false);
  const [resendStatus, setResendStatus] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [verificationStatus, setVerifcationStatus] = useState("");
  const [error,setError] = useState(null);

  const schema = yup.object().shape({
    verificationToken: yup.string().required(),

    newPassword: yup.string().required().matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contains 8 characters, 1 uppercase, 1 lowercase and 1 number"
      ),

    newPasswordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("newPassword"), null], "Password must match"),});

  const onSubmit = data => {
    setError(null);

    schema.validate({
      verificationToken: verificationToken,
      newPassword: newPassword,
      newPasswordConfirmation: newPasswordConfirmation
    }).then((valid)=>{
      if(!valid) return false;
      setLoginErr(null);
      // truyen xuong back-end + render /profile
      fetch(props.apiEndpoint+'/users/reset-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: verificationToken,
        newPassword: newPassword
        })
      })
      .then(res => res.json())
      .then(res => {
        setVerified(res.status === 1);
        setVerifcationStatus(res.message);
      })
    }).catch(err => {
      console.log(err);
      setError(err);
      return false;
    });
  }

  const resendEmail = () => {
    setVerifcationStatus("");
    fetch(props.apiEndpoint+'/users/resend-reset-password-mail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: Email
        })
      })
      .then(res => res.json())
      .then(res => {
        setResendStatus(res.status === 1);
        setResendMessage(res.message);
      })
  }

  const redirect = (to) => {
    return history.push(to);
  }
  
  // const { register, handleSubmit, errors } = useForm();
    
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
              >
                  <div className="mb-4">
                      <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="Email"
                      >
                          Email
                      </label>
                      <input
                          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "}
                          disabled={verificationToken}
                          id="Email"
                          name="Email"
                          type="text"
                          placeholder="Email nhận mã xác thực"
                          value={Email}
                          onChange={e=>setEmail(e.target.value)}
                          // ref={register}
                      />
                      {/* <p className="text-left text-red-700 text-sm">
                      {errors?.Email?.message}
                      </p> */}
                  </div>
                  <div className="mb-4">
                      <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="newPassword"
                      >
                          Mật khẩu mới
                      </label>
                      <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          disabled={!verificationToken}
                          placeholder=">=8 ký tự hoa, thường và số"
                          value={newPassword}
                          onChange={e=>setNewPassword(e.target.value)}
                      />
                      <p className="text-left text-red-700 text-sm">
                            {error && error.path === 'newPassword' && error.message}
                      </p>
                  </div>
                  <div className="mb-4">
                      <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="newPasswordConfirmation"
                      >
                          Nhập lại mật khẩu mới
                      </label>
                      <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="newPasswordConfirmation"
                          name="newPasswordConfirmation"
                          type="password"
                          disabled={!verificationToken}
                          placeholder=""
                          value={newPasswordConfirmation}
                          onChange={e=>setNewPasswordConfirmation(e.target.value)}
                      />
                      <p className="text-left text-red-700 text-sm">
                      {error && error.path === 'newPasswordConfirmation' && error.message}
                        </p>
                  </div>
                  <div className="mb-4">
                      <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="verificationCode"
                      >
                          Mã xác thực
                      </label>
                      <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="verificationCode"
                          name="verificationCode"
                          type="text"
                          placeholder="Nhập mã để đổi mật khẩu"
                          value={verificationToken}
                          onChange={e=>setVerificationToken(e.target.value)}
                          // ref={register}
                      />
                      <p className="text-left text-red-700 text-sm">
                            {error && error.path === 'verificationToken' && error.message}
                      </p>
                  </div>
                  <div
                      className="flex items-center justify-between text-red-700 text-sm padding mb-4"
                      style={{ justifyContent: "center" }} 
                      >
                        {loginErr && loginErr}
                  </div>
                  <div
                      className="flex items-center justify-between space-x-2"
                      style={{ justifyContent: "center" }}
                  >
                    <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={()=>resendEmail()}
                      >
                          Gửi lại
                      </button>
                      <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={()=>onSubmit()}
                      >
                          Đặt lại mật khẩu
                      </button>
                  </div>
                  {resendMessage && <div
                      className={"mt-3 justify-center inline-block flex w-100 text-xs " + (resendStatus?'text-green-700':'text-red-700')}
                      style={{ justifyContent: "center" }} 
                      >
                        {resendMessage}
                      </div>}
                      {verificationStatus && <div
                      className={"mt-3 justify-center inline-block flex w-100 text-xs " + (verified?'text-green-700':'text-red-700')}
                      style={{ justifyContent: "center" }} 
                      >
                        {verificationStatus}
                      </div>}
                      {verified && <div className="mt-3 justify-center inline-block flex w-100">
                          <p className="text-sm text-gray-600 ">Quay về trang </p>
                          <button onClick={() => redirect('/login')} className="text-sm text-blue-700 hover:text-white">đăng nhập</button>
                    </div>}
              </form>
              <p className="text-center text-gray-500 text-sm">
                  &copy;2020 Acme Corp. All rights reserved.
              </p>
          </div>
        </div>
      );
};

export default ResetPasswordForm;