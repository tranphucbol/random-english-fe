import React from 'react';

const CategoryListItem = (props) =>{
    const className = props.active?
    "bg-blue-700 text-white border-white flex items-center justify-center h-12 w-64 text-center text-md"
    :"hover:border-blue-700 hover:bg-white hover:text-blue-700 flex text-gray-700 items-center justify-center h-12 w-64 text-center text-md";
    return <li className={className}>{props.name}</li>
}

export default CategoryListItem;