import React, { useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';

const UserDropdown = (props) => {
    const user = props.user;
    const showDropdownFunc = () => {
        console.log(props.showDropdown);
        props.setShowDropdown(!props.showDropdown);
    }
    const redirectLogin = () => {
        return props.history.push('/login');
    }

    if(user === undefined)
    return(
        <div className="relative inline-block text-left">
            <div>
        <button onClick={redirectLogin} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
                Login
        </button>
        </div>
        </div>
    ); 
    else {
        return(
            <div className="relative inline-block text-left">
            <div>
                <span className="rounded-md shadow-sm">
                <button onClick={showDropdownFunc} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
                    Options
                    <svg className="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                </button>
                </span>
            </div>
            <div className={" origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg"} hidden={!props.showDropdown}>
                <div className="rounded-md bg-white shadow-xs">
                <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Account settings</a>
                    <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Support</a>
                    <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">License</a>
                    <form method="POST" action="#">
                    <button type="submit" className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                        Sign out
                    </button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        )
    }
}


const HeaderComponent = (props) => {
    const [searchInput,setSearchInput] = useState("");
    const [showDropdown,setShowDropdown] = useState(false);
    const history = useHistory();

    const handleSearchRequest = (e) => {
        if(e.keyCode !== 13)
            return;
        
        if(searchInput !== "")
            return <Redirect to={`word/${searchInput}`}></Redirect>
        // console.log(searchInput);
        //call API search and redirect        
    }

    const changeSearchQuery = (newQuery) =>{
        setSearchInput(newQuery.target.value);
    }

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
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <a href="#responsive-header" className=" text-xl block mt-4 lg:inline-block lg:mt-0 text-white font-weight-bold hover:text-white mr-4">
                Random
            </a>
            <a href="#responsive-header" className=" text-xl block mt-4 lg:inline-block lg:mt-0 text-white font-weight-bold hover:text-white mr-4">
                Learn
            </a>
            </div>
            <div>
            {/*USER DROPDOWN AND SEARCH BAR */}
            <div className="text-sm text-right lg:flex-grow">
            <input onChange={changeSearchQuery} onKeyDown={handleSearchRequest} type="search" className="bg-gray-200 focus:bg-white border-transparent focus:border-green-1000 shadow rounded border-2 p-3 mr-5" placeholder="Learn a specific word"></input>
            
            <UserDropdown history={history} user={props.user} setShowDropdown={setShowDropdown} showDropdown={showDropdown}></UserDropdown>
            </div>
        </div>
        </nav>
    );
}

export default HeaderComponent;