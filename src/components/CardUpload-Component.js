import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';
import '../css/randomCard.css'
const CardUploadForm = (props)=>{

  const InputField = (props) => {
    return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.name}>
            {props.name}
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={props.name} name={props.name} type={props.type} placeholder={props.placeholder}
          ref={props.ref}/>
          {/* <p className="text-left text-red-700 text-xs">{props.errors?.(props.name).message}</p> */}
        </div>
    );
}

const ExampleField=(props) => {
  const engName = (props.name) + "eng";
  const vieName = (props.name) + "vie";
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.name}>
        {props.name}
      </label>

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={engName}>
        {engName}
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={engName} name={engName} type={props.type} placeholder={props.placeholder}
      ref={props.ref}/>

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={vieName}>
        {vieName}
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={vieName} name={vieName} type={props.type} placeholder={props.placeholder}
      ref={props.ref}/>
      {/* <p className="text-left text-red-700 text-xs">{props.errors?.(props.name).message}</p> */}
    </div>
);
}


  const examples = [];

  const schema = yup.object().shape({
    Eng:yup.string().required(),
    Vie:yup.string().required(),
    Concept: yup.string().required(),
    Image: yup.mixed().test('fileType', "Unsupported File Format", value => ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type) ),
  });

  

  const addExampleField = () => {
    const exampleName = "E"+examples.length;
    const example = <ExampleField name={exampleName} eng="" vie="" register={register}></ExampleField>;
    examples.push(example);
    // schema[example] = yup.string.required(); 
  };

  const onSubmit = data => {

  }

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });

  if(props.login){
      return <Redirect to="/login"></Redirect>
  } else
    return (<div className="flex  h-75  w-full " style={{margin: '50px auto'}}>
      <form className="flex w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div class="w-1/2 bg-gray-400">
        <InputField name="Image" placeholder="Add an image" type="file" ref={register} errors={errors}></InputField>
        </div>
      <div class="w-1/2 bg-gray-500">
        <InputField name="Eng" placeholder="The word in English" ref={register} errors={errors}></InputField>
        <InputField name="Vie" placeholder="The word in Vietnamese" ref={register} errors={errors}></InputField>
        <InputField name="Concept" placeholder="Explain the word above" ref={register} errors={errors}></InputField>
        
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={addExampleField}>Add example</button>

        {examples && examples}

        <div className="flex items-center justify-between"  style={{justifyContent:"center"}}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save this card
          </button>
        </div>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>)
}

export default CardUploadForm;

