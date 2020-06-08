import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import ExampleField from "./ExampleField"
import InputField from "./InputField"

const CardUploadForm = (props) => {
  const [examples, setExamples] = useState([]);

  const [imgUpload, SetImgUpload] = useState(null);

  const [collections, setCollections] = useState([]);

  const [collection, setCollection] = useState("new");

  const [rawCollectionVal, setCollectionVal] = useState([]);

  useEffect(() => {
    // fetch(props.apiEndpoint+'/user/collections', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + props.cookie,
    //   },
    //   })
    //   .then(res => handleResponse(res))
    //   .then(resdata => {
    //     const collectionOptions = resdata.map(value =>
    //       <option key={value} value={value}>{value}</option>);
    //     setCollections(collections.concat(collectionOptions));
    //   })
    //fetch categories here
    const resdata = ["animal", "tech", "meme"];
      resdata.unshift('new');
      setCollectionVal(rawCollectionVal.concat(resdata));

      const collectionOptions = resdata.map(value =>
              <option key={value} value={value}>{value}</option>);
      if(collectionOptions.length > 0){
            setCollections(collections.concat(collectionOptions));
            setCollection(resdata[1]);
      }
      else{
        setCollections(collections.concat(<option selected key={'new'} value={'new'}>{'new'}</option>));
        setCollection('new');
      }
    },[]);

  const schema = yup.object().shape({
    Eng: yup.string().required(),
    Vie: yup.string().required(),
    Concept: yup.string().required(),
    Collection: yup.string().required(),
    NewCollection: yup.string().notOneOf(collections).max(15).when('Collection',{
      is: 'new',
      then: yup.string().required()
    })
    });

  const onCollectionChanged = (e) => {
    const newCol = e.target.value;
    setCollection(newCol);
  };

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

  const onSubmit = (data) => {
    if (data.hasOwnProperty("Image") && data["Image"].length === 0) {
      delete data["Image"];
    } else {
      data["Image"] = data["Image"][0];
      data["Image"]["content"] = imgUpload;
    }
    let i = 0;
    data["examples"] = [];
    for (i = 0; i < examples.length; i++) {
      // if(!data[i+'English'] || !data[i+'Vietnamese']){
      data["examples"].push({
        English: data[i + "English"],
        Vietnamese: data[i + "Vietnamese"],
      });
      // }
      delete data[i + "English"];
      delete data[i + "Vietnamese"];
    }

    //call POST API here
    console.log(data);
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
        SetImgUpload(`data:${file.type};charset=utf-8;${reader.result}`);
      };
    }
  };

  if (props.login) {
    return <Redirect to="/login"></Redirect>;
  } else
    return (
      //bg-white shadow-lg rounded-lg
      <div
        className="flex w-full h-full"
        style={{ justifyContent: "center"}}
      >
        <form
          className="flex w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-2/3 bg-gray-500 rounded-lg shadow-lg">
            <h2 className="p-3 bg-white rounded-t-lg text-lg">Thông tin thẻ</h2>
            <div className="p-3">
              <h2 className="mb-2">Phân loại từ</h2>
              <div className="relative">
                {/* <label className="mr-2">Select a collection</label> */}
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={onCollectionChanged}
                  value={collection}
                  name="Collection"
                  id="collection"
                  ref={register}
                >
                  {collections && collections}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              {collection && collection === "new" && (
                <div className="ml-5 inline w-1/2">
                  <label className="mr-2">Phân loại mới</label>
                  <input
                    type="text"
                    name="NewCollection"
                    ref={register}
                  ></input>
                </div>
              )}
              <InputField
                name="Eng"
                placeholder="The word in English"
                register={register}
                display="Tiếng Anh"
                errors={errors}
              ></InputField>
              <InputField
                name="Vie"
                placeholder="The word in Vietnamese"
                register={register}
                display="Tiếng Việt"
                errors={errors}
              ></InputField>
              <InputField
                name="Concept"
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
          </div>
          <div className="w-1/3 bg-gray-400 rounded-lg shadow-lg">
            <h2 className="p-3 bg-white rounded-t-lg text-lg">Upload ảnh</h2>
            <div className="p-3">
              <input
                accept="image/*"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="file"
                ref={register}
                id="Image"
                name="Image"
                onChange={handleImageUpload}
              ></input>
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

export default CardUploadForm;
