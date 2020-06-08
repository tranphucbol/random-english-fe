import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as yup from 'yup';

const ChangePasswordForm = (props)=>{
  const [loginErr,setLoginErr] = useState(null);
  const history = useHistory();
  const [oldPassword,setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [verified, setVerified] = useState(false);
  const [verificationStatus, setVerifcationStatus] = useState("");
  const [error,setError] = useState(null);

  const schema = yup.object().shape({
    oldPassword: yup.string().required(),

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
      oldPassword: oldPassword,
      newPassword: newPassword,
      newPasswordConfirmation: newPasswordConfirmation
    }).then((valid)=>{
      if(!valid) return false;
      setLoginErr(null);
      // truyen xuong back-end + render /profile
      fetch(props.apiEndpoint+'/users/change-password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.cookie
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
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

  const redirect = (to) => {
    return history.push(to);
  }
  
  // const { register, handleSubmit, errors } = useForm();
    
    return (
        <div className="container w-100 h-full flex flex-col justify-center items-center">
            <div className="flex justify-center items-center flex-col">

              <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                  <div className="mb-4">
                      <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="oldPassword"
                      >
                          Mật khẩu cũ
                      </label>
                      <input
                          className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "}
                          id="oldPassword"
                          name="oldPassword"
                          type="password"
                          value={oldPassword}
                          onChange={e=>setOldPassword(e.target.value)}
                          // ref={register}
                      />
                      <p className="text-left text-red-700 text-sm">
                            {error && error.path === 'oldPassword' && error.message}
                      </p>
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
                          placeholder=""
                          value={newPasswordConfirmation}
                          onChange={e=>setNewPasswordConfirmation(e.target.value)}
                      />
                      <p className="text-left text-red-700 text-sm">
                      {error && error.path === 'newPasswordConfirmation' && error.message}
                        </p>
                  </div>
                  {verificationStatus && <div
                      className={"mt-3 justify-center inline-block flex w-100 text-xs " + (verified?'text-green-700':'text-red-700')}
                      style={{ justifyContent: "center" }} 
                      >
                        {verificationStatus}
                      </div>}
                  <div
                      className="flex items-center justify-between space-x-2"
                      style={{ justifyContent: "center" }}
                  >
                      <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={()=>onSubmit()}
                      >
                          Đặt mật khẩu mới 
                      </button>
                  </div>

                      {/* {verified && <div className="mt-3 justify-center inline-block flex w-100">
                          <p className="text-sm text-gray-600 ">Quay về trang </p>
                          <button onClick={() => redirect('/login')} className="text-sm text-blue-700 hover:text-white">đăng nhập</button>
                    </div>} */}
              </form>
          </div>
        </div>
      );
};

export default ChangePasswordForm;