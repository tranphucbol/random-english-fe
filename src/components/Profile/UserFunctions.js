import React from 'react';
import {Link} from 'react-router-dom'

const UserFunctions = (props) => {
    const curUrl = props.url;

    // const functionEntries = ['Thong tin ca nhan','Bo suu tap the'];

    // const functions = functionEntries.map((entry)=>
    //     <Link to={`${curUrl}/${entry}`} className="mx-3 my-1 flex items-center justify-center h-12 w-64 text-center rounded-lg text-md bg-gray-600">{entry}</Link>
    // );

    return(
        <div className="w-100 bg-gray-400 rounded-lg shadow-lg h-auto">
            <h2 className="p-3 bg-white rounded-t-lg text-xl">Bảng điều khiển</h2>
            <div className="flex items-center justify-center">
                {/* User menu */}
                <ul className="flex-row text-center">
                <Link to={`${curUrl}/info`} className="flex items-center justify-center h-12 w-64 text-center text-md">Thong tin ca nhan</Link>
                <Link to={`${curUrl}/collections`} className="flex items-center justify-center h-12 w-64 text-center rounded-lg text-md">Bo suu tap the</Link>
                </ul>
            </div>
          </div>
    )
}

export default UserFunctions;