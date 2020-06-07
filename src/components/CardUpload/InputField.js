import React from "react";

const InputField = (props) => {
    const propName = props.name;
    const propDisplay = props.display;
    const errors = props.errors ? props.errors[propName] : null;
    return (
      <div className="mb-6">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor={props.name}
        >
          {props.display}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={props.name}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          ref={props.register}
        />
        <p className="text-left text-red-700 ">
          {errors ? errors.message : null}
        </p>
      </div>
    );
};

  export default InputField;