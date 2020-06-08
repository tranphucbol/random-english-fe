import React from "react";

const CategoryListItem = (props) => {
  const className = props.active
    ? "w-full border-white bg-blue-700 text-white border-white flex items-center h-12 text-md px-4"
    : "w-full border-white hover:border-blue-700 hover:bg-white hover:text-blue-700 flex text-gray-700 items-center h-12 text-md px-4";
  return (
    <button className={className} id={props.id} onClick={props.onClick} style={{borderLeftWidth: '5px'}}>
      {props.name}
    </button>
  );
};

export default CategoryListItem;
