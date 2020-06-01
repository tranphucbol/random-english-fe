import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';


const InputField = (props) => {
  const propName= props.name;
  const errors = props.errors?props.errors[propName]:null;
  return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.name}>
          {props.name}
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={props.name} name={props.name} type={props.type} placeholder={props.placeholder}
        ref={props.register}/>
        <p className="text-left text-red-700 text-xs">{errors?errors.message:null}</p>
      </div>
  );
}

const ExampleField=(props) => {
  const exampleName = "Example " + props.name;
  const engName = "English";
  const vieName = "Vietnamese";


  return (
    <div className="mb-4 border rounded px-8 pt-6 pb-8 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {exampleName}
      </label>

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={engName}>
        {engName}
      </label>
      <input className="shadow appearance-none mb-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={engName} name={props.name+engName} type={props.type} placeholder={props.placeholder}
      ref={props.register}/>

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={vieName}>
        {vieName}
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={vieName} name={props.name+vieName} type={props.type} placeholder={props.placeholder}
      ref={props.register}/>
    </div>
);
}

const CardUploadForm = (props)=>{
  const [examples,setExamples] = useState([]);

  const [imgUpload,SetImgUpload] = useState(null);

  const schema = yup.object().shape({
    Eng:yup.string().required(),
    Vie:yup.string().required(),
    Concept: yup.string().required(),
    });

  const addExampleField = () => {
    const exampleName = examples.length;
    const example = <ExampleField name={exampleName} register={register} key={examples.length}></ExampleField>;
    setExamples(examples.concat(example));
  };
  
  const onSubmit = data => {
    if(data.hasOwnProperty('Image') && data['Image'].length === 0){
      delete data['Image'];
    } else{
      data['Image'] = data['Image'][0];
      data['Image']['content'] = imgUpload;
    }
    let i =0;
    data['examples'] = [];
    for(i = 0; i < examples.length;i++){
      if(!data[i+'English'] === "" && !data[i+'Vietnamese'] === ""){
        data['examples'].push({
          "English": data[i+'English'],
          "Vietnamese": data[i+'Vietnamese']
        })
      }
      delete data[i+'English'];
      delete data[i+'Vietnamese'];
    }
    
    //call POST API here
    console.log(data);
  }

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  const handleImageUpload= (input) =>{
    if(input && input.target){
    var file = input.target.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
      SetImgUpload(`data:${file.type};charset=utf-8;${reader.result}`);
    };
  }
  };

  if(props.login){
      return <Redirect to="/login"></Redirect>
  } else
    return (
    <div className="flex h-75 w-75" style={{justifyContent:"center",margin: '50px auto'}}>
      <form className="flex w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-1/3 bg-gray-400 px-8 pt-6 pb-8 rounded">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image upload
        </label>
        <input accept="image/*" className="mb-2" type="file" ref={register} id="Image" name="Image" onChange={handleImageUpload}></input>
        <p className="text-left text-red-700 text-xs">{errors['Image'] && errors['Image'].message}</p>
        {imgUpload && <img alt="" src={imgUpload}></img>}
      </div>
      <div className="w-2/3 bg-gray-500 ml-5 rounded px-8 pt-6 pb-8">
        <InputField name="Eng" placeholder="The word in English" register={register} errors={errors}></InputField>
        <InputField name="Vie" placeholder="The word in Vietnamese" register={register} errors={errors}></InputField>
        <InputField name="Concept" placeholder="Explain the word above" register={register} errors={errors}></InputField>
        
        <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mb-4" onClick={addExampleField}>Add an example</button>
        <div>
        {examples && examples}
        </div>

        <div className="flex items-center justify-between"  style={{justifyContent:"center"}}>
          <button  type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save this card
          </button>
        </div>
      </div>
      </form>
    </div>
    )
}

export default CardUploadForm;

