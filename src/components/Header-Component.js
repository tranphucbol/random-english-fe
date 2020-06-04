import React, { useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';  

const UserDropdown = (props) => {
    const user = props.user;
    const handleSignout = () => {
        console.log('alo');
        localStorage.removeItem('login');
        props.removeCookie('authentication');
        props.setNewData(null);
    }
    const showDropdownFunc = () => {
        props.setShowDropdown(!props.showDropdown);
    }
    const redirectLogin = () => {
        return props.history.push('/login');
    }

    if(user === null)
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
                <button onBlur={showDropdownFunc} onClick={showDropdownFunc} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
                    {user.name}
                    <svg className="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                </button>
                </span>
            </div>
            <div className={" origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg"} hidden={!props.showDropdown}>
                <div className="rounded-md bg-white shadow-xs">
                <div className="py-1">
                    <button onClick={()=>{props.history.push('/profile')}} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Profile</button>
                    <form method="POST" action="#">
                    <button type="button" onMouseDown={handleSignout} className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
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

const CustomNavLink = (props) => {
    return (
        <button
        onClick={(e)=>{return props.history.push(props.link)}}
        style={{textShadow: '0 2px 4px rgba(0,0,0,10'}}
        className="text-xl block mt-4 lg:inline-block lg:mt-0 text-white font-weight-bold text-white-600 hover:text-green-700 mr-4">
            {props.text}
        </button>
    );
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
        <nav className="mb-10 .shadow-md flex items-center justify-between flex-wrap p-2 bg-opacity-75 " 
        style={{background:'linear-gradient(135deg, rgba(31,59,8,0.9) 0%, rgba(31,59,8,0.9) 45%, rgba(34,38,31,1) 84%, rgba(34,38,31,1) 100%)',
        boxShadow:'0px 0px 10px 5px #888888'}}>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img
                src={`${process.env.PUBLIC_URL}/dice.png`}
                alt="logo"
                width="54">
            </img>
            <button
                onClick={()=> {history.push('/')}}
                style={{textShadow: '0 1px 2px rgba(0,0,0,10'}}
                className="text-2xl track:tight block ml-4 mr-3 mt-1 lg:inline-block lg:mt-0 text-white font-weight-bold text-white-600 hover:text-green-700 mr-4">
                    Random English
            </button>
        </div>
        <div className="w-75 block flex-grow lg:flex lg:items-center">
            <CustomNavLink history={history} text="Random" link="/card/random"></CustomNavLink>
            <CustomNavLink history={history} text="Learn" link="/card/learn"></CustomNavLink>
            {/* only logged in user can see this */}
            {props.login && <CustomNavLink history={history} text="Upload" link="/card/upload"></CustomNavLink>}
            </div>
            {/*USER DROPDOWN AND SEARCH BAR */}
            <div className="text-xs text-right flex-grow">
            <input onChange={changeSearchQuery} onKeyDown={handleSearchRequest} type="search" className="w-7/12 bg-gray-200 focus:bg-white border-transparent focus:border-green-1000 shadow rounded border-2 p-3 mr-5 inline-block" placeholder="Learn a specific word"></input>
            
            <UserDropdown history={history} setNewData={props.setNewData} removeCookie={props.removeCookie} user={props.user} setShowDropdown={setShowDropdown} showDropdown={showDropdown}></UserDropdown>
            </div>
        </nav>
    );
}

export default HeaderComponent;