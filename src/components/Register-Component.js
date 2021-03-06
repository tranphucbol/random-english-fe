import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Redirect, useHistory } from "react-router-dom";

const RegisterForm = (props) => {
    const schema = yup.object().shape({
        Email: yup.string().required().email(),

        password: yup.string().required().matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must contains 8 characters, 1 uppercase, 1 lowercase and 1 number"
          ),

        passwordConfirmation: yup
            .string()
            .required()
            .oneOf([yup.ref("password"), null], "Password must match"),

        name: yup.string().required().max(20),

        phoneNumber: yup
            .number()
            .typeError("Must be a number")
            .required()
            .test(
                "minlen",
                "Must be more than 8 characters",
                (val) => val.toString().length >= 8
            )
            .test(
                "maxlen",
                "Must be less than 15 characters",
                (val) => val.toString().length <= 15
            ),
    });

    const onSubmit = (data) => {
        // truyen xuong back-end + render /profile
        fetch(props.apiEndpoint + "/users/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.Email,
                password: data.password,
                name: data.name,
                numberPhone: data.phoneNumber.toString(),
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                //TODO: redirect to verification
                console.log(res);
                if (res.data && res.data.token != null) {
                    history.push({pathname: '/verify-user',state: {email:data.Email}});
                }
            });
    };

    const history = useHistory();

    const redirectLogin = () => {
        return history.push('/login');
      }

    const { register, handleSubmit, errors } = useForm({
        validationSchema: schema,
    });

    if (props.login) {
        return <Redirect to="/"></Redirect>;
    } else
        return (
            <div className="h-screen w-full flex justify-center items-center flex-col">
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
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
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
                            placeholder="example@gmail.com"
                            ref={register}
                        />
                        <p className="text-left text-red-700 text-sm">
                            {errors?.Email?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="password"
                        >
                            Mật khẩu
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Ít nhất 1 ký tự hoa, thường và số"
                            ref={register}
                        />
                        <p className="text-left text-red-700 text-sm">
                            {errors?.password?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="passwordConfirmation"
                        >
                            Nhập lại mật khẩu
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            type="password"
                            placeholder=""
                            ref={register}
                        />
                        <p className="text-left text-red-700 text-sm">
                            {errors?.passwordConfirmation?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="name"
                        >
                            Họ và tên
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Kha Tran Minh"
                            ref={register}
                        />
                        <p className="text-left text-red-700 text-sm">
                            {errors?.name?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="phoneNumber"
                        >
                            Số điện thoại
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                            name="phoneNumber"
                            id="phoneNumber"
                            type="text"
                            placeholder="0482246257"
                            ref={register}
                        />
                        <p className="text-left text-red-700 text-sm">
                            {errors?.phoneNumber?.message}
                        </p>
                    </div>
                    <div
                        className="flex items-center justify-between"
                        style={{ justifyContent: "center" }}
                    >
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Đăng ký
                        </button>
                    </div>
                    <div className="mt-3 justify-center inline-block flex w-100">
                          <p className="text-sm text-gray-600 ">Bạn đã có tài khoản? </p>
                          <button onClick={redirectLogin} className="text-sm text-blue-700 hover:text-white">Đăng nhập!</button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-sm">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        );
};

export default RegisterForm;
