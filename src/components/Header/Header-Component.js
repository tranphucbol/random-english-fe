import React, { useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';  
import handleResponse from '../../helper/ResponseHandler';
import UserDropdown from './UserDropdown';
import CustomNavLink from './CustomNavLink';

const HeaderComponent = (props) => {
    const [searchInput,setSearchInput] = useState("");
    const [showDropdown,setShowDropdown] = useState(false);
    const history = useHistory();

    if(!props.user && props.cookie){
    fetch(props.apiEndpoint+'/users/profile', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + props.cookie,
            },
            })
            .then(res => handleResponse(res))
            .then(resdata => {
              props.setNewData(resdata);
            },[]);
    }

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
        <nav className="mb-10 flex items-center justify-between flex-wrap p-2 bg-opacity-75 " 
        style={{background:'rgba(51,54,59,.95)'}}>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img
                src={`${process.env.PUBLIC_URL}/dice.png`}
                alt="logo"
                width="54">
            </img>
            <button
                onClick={()=> {history.push('/')}}
                style={{textShadow: '0 1px 2px rgba(0,0,0,10'}}
                className="text-2xl track:tight block ml-4 mr-3 mt-1 lg:inline-block lg:mt-0 text-white font-weight-bold text-white-600 hover:text-gray-500 mr-4">
                    Random English
            </button>
        </div>
        <div className="w-75 block flex-grow lg:flex lg:items-center">
            <CustomNavLink history={history} text="Random" link="/card/random"></CustomNavLink>
            <CustomNavLink history={history} text="Edit" link="/category/edit"></CustomNavLink>
            {/* only logged in user can see this */}
            {props.login && <CustomNavLink history={history} text="Upload" link="/card/upload"></CustomNavLink>}
            </div>
            {/*USER DROPDOWN AND SEARCH BAR */}
            <div className="text-sm text-right flex-grow">
            <input onChange={changeSearchQuery} onKeyDown={handleSearchRequest} type="search" className="w-7/12 bg-gray-200 focus:bg-white border-transparent focus:border-green-1000 shadow rounded border-2 p-3 mr-5 inline-block" placeholder="Learn a specific word"></input>
            
            <UserDropdown history={history} setNewData={props.setNewData} removeCookie={props.removeCookie} user={props.user} setShowDropdown={setShowDropdown} showDropdown={showDropdown}></UserDropdown>
            </div>
        </nav>
    );
}

export default HeaderComponent;