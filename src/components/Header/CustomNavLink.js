import React from 'react';

const CustomNavLink = (props) => {
    return (
        <button
        onClick={(e)=>{return props.history.push(props.link)}}
        style={{textShadow: '0 2px 4px rgba(0,0,0,10'}}
        className="text-xl block mt-4 lg:inline-block lg:mt-0 text-white font-weight-bold text-white-600 hover:text-gray-500 mr-4">
            {props.text}
        </button>
    );
}

export default CustomNavLink;