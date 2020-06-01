import React from 'react';

const headerComponent = (props) => {
    return(
        <nav className="flex items-center justify-between flex-wrap p-6 bg-opacity-50"  style={{background: "linear-gradient(90deg, #233329 0%, #63D471 100%)"}}>

        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img
                src={`${process.env.PUBLIC_URL}/dice.png`}
                alt="logo"
                width="54">
            </img>
            <span className="font-semibold text-xl tracking-tight pl-5">Random English</span>
        </div>
        <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm text-right lg:flex-grow">
            </div>
        </div>
        </nav>
    );
}

export default headerComponent;