import React from 'react';

const UserDropdown = (props) => {
    const user = props.user;
    const handleSignout = () => {
        console.log('alo');
        localStorage.removeItem('login');
        localStorage.removeItem('user');
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
        <button onClick={redirectLogin} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
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
                <button onBlur={showDropdownFunc} onClick={showDropdownFunc} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
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
                    <button type="button" onMouseDown={()=>{props.history.push('/change-password')}} className="block px-4 py-2 leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Change Password</button>
                    <form method="POST" action="#">
                    <button type="button" onMouseDown={handleSignout} className="block w-full text-left px-4 py-2 leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
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

export default UserDropdown;