import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import ExampleField from "./ExampleField";
import InputField from "./InputField";
import { apiEndpoint } from "../../constant";
import axios from "axios";
import { useCookies } from "react-cookie";
import { store } from "react-notifications-component";

const CategoryAddForm = (props) => {
  const [examples, setExamples] = useState([]);

  const [imgUpload, SetImgUpload] = useState(null);

  const [cookies] = useCookies(["authentication"]);
  const token = cookies["authentication"];

  const schema = yup.object().shape({
    eng: yup.string().required(),
    vie: yup.string().required(),
    concept: yup.string().required(),
  });

  const addExampleField = () => {
    const exampleName = examples.length;
    const example = (
      <ExampleField
        name={exampleName}
        register={register}
        key={examples.length}
      ></ExampleField>
    );
    setExamples(examples.concat(example));
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (data.hasOwnProperty("Image") && data["Image"].length === 0) {
      delete data["Image"];
    } else if (data["Image"]) {
      // data["Image"] = data["Image"][0];
      // data["Image"]["content"] = imgUpload;
      delete data["Image"];
      data["base64Image"] = imgUpload;
    }
    let i = 0;
    data["examples"] = [];
    for (i = 0; i < examples.length; i++) {
      // if(!data[i+'English'] || !data[i+'Vietnamese']){
      data["examples"].push({
        eng: data[i + "English"],
        vie: data[i + "Vietnamese"],
      });
      // }
      delete data[i + "English"];
      delete data[i + "Vietnamese"];
    }

    if (props.curCollection) {
      data["categoryId"] = props.curCollection;
    } else data["categoryId"] = undefined;

    //call POST API here
    console.log(data);
    try {
      data.answers = [];
      await axios.post(`${apiEndpoint}/words/create`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      store.addNotification({
        title: "Thành công",
        message: "Thêm từ thành công",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } catch (err) {
      console.log(err.response.data);
      store.addNotification({
        title: "Lỗi",
        message: err.response.data.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
    
  };

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const handleImageUpload = (input) => {
    if (input && input.target) {
      var file = input.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        SetImgUpload(`${reader.result}`);
      };
    }
  };

  if (props.login) {
    return <Redirect to="/login"></Redirect>;
  } else
    return (
      //bg-white shadow-lg rounded-lg
      <div className="flex w-full h-full" style={{ justifyContent: "center" }}>
        <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-2/3 p-3 border-r border-gray-300">
            <InputField
              name="eng"
              placeholder="The word in English"
              register={register}
              display="Tiếng Anh"
              errors={errors}
            ></InputField>
            <InputField
              name="vie"
              placeholder="The word in Vietnamese"
              register={register}
              display="Tiếng Việt"
              errors={errors}
            ></InputField>
            <InputField
              name="concept"
              placeholder="Explain the word above"
              register={register}
              display="Nghĩa của từ"
              errors={errors}
            ></InputField>

            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-4"
              onClick={addExampleField}
            >
              Thêm ví dụ
            </button>
            <div>{examples && examples}</div>

            <div
              className="flex items-center justify-between"
              style={{ justifyContent: "center" }}
            >
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Lưu
              </button>
            </div>
          </div>
          <div className="w-1/3">
            <h2 className="p-3 block text-gray-700 font-bold mb-2">
              Upload ảnh
            </h2>
            <div className="p-3">
              <div className="flex w-full items-center justify-center bg-grey-lighter">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-700 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-800 hover:text-white">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Select a file
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    name="Image"
                    ref={register}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-left text-red-700 text-sm">
                {errors["Image"] && errors["Image"].message}
              </p>
              {imgUpload && <img alt="" src={imgUpload}></img>}
            </div>
          </div>
        </form>
      </div>
    );
};

export default CategoryAddForm;
