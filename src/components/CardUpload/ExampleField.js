
import React from "react";

const ExampleField = (props) => {
    const exampleName = "Example " + props.name;
    const engName = "English";
    const vieName = "Vietnamese";
  
    return (
      <div className="mb-4 border rounded px-8 pt-6 pb-8 mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          {exampleName}
        </label>
  
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor={engName}
        >
          {engName}
        </label>
        <input
          className="shadow appearance-none mb-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={engName}
          name={props.name + engName}
          type={props.type}
          placeholder={props.placeholder}
          ref={props.register}
        />
  
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor={vieName}
        >
          {vieName}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={vieName}
          name={props.name + vieName}
          type={props.type}
          placeholder={props.placeholder}
          ref={props.register}
        />
      </div>
    );
  };

  export default ExampleField;