import React, { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { MDBProgress } from 'mdbreact';
import { ProgressBar } from 'react-bootstrap';
import '../css/categories.css'
import '../css/tailwind.css'

const MyCategories = (props) => {
    const history = useHistory();
    const [categories, setCategories] = useState([
        {
            "id": 1,
            "name": "General",
            "user": {
                "id": 1,
                "name": "TraiChuoiCong",
                "email": "admin@gmail.com"
            },
            "wordCount": 152,
            "learnedWordCount": 123,
            "public": true
        },
        {
            "id": 2,
            "name": "Test 2",
            "user": {
                "id": 2,
                "name": "Kha Tran Minh",
                "email": "pogger2810@gmail.com"
            },
            "wordCount": 100,
            "learnedWordCount": 10,
            "public": true
        },
        {
            "id": 4,
            "name": "Test 3",
            "user": {
                "id": 1,
                "name": "TraiChuoiCong",
                "email": "admin@gmail.com"
            },
            "wordCount": 100,
            "learnedWordCount": 70,
            "public": false
        }, {
            "id": 2,
            "name": "Test 2",
            "user": {
                "id": 2,
                "name": "Kha Tran Minh",
                "email": "pogger2810@gmail.com"
            },
            "wordCount": 0,
            "learnedWordCount": 0,
            "public": true
        },
        {
            "id": 4,
            "name": "Test 3",
            "user": {
                "id": 1,
                "name": "Tradsadong",
                "email": "admin@gmail.com"
            },
            "wordCount": 0,
            "learnedWordCount": 0,
            "public": false
        }, {
            "id": 2,
            "name": "Test 2",
            "user": {
                "id": 2,
                "name": "Kh1nh",
                "email": "pogger2810@gmail.com"
            },
            "wordCount": 0,
            "learnedWordCount": 0,
            "public": true
        },
        {
            "id": 4,
            "name": "Test 3",
            "user": {
                "id": 1,
                "name": "Tr3",
                "email": "admin@gmail.com"
            },
            "wordCount": 0,
            "learnedWordCount": 0,
            "public": false
        }, {
            "id": 2,
            "name": "Test 2",
            "user": {
                "id": 2,
                "name": "Khanh",
                "email": "pogger2810@gmail.com"
            },
            "wordCount": 0,
            "learnedWordCount": 0,
            "public": true
        },
        {
            "id": 4,
            "name": "Test 3",
            "user": {
                "id": 1,
                "name": "TraiChuoiCong",
                "email": "admin@gmail.com"
            },
            "wordCount": 0,
            "learnedWordCount": 0,
            "public": false
        }
    ]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const handleChangePage = (page) => {
        setActivePage(page);
    }

    // useEffect(() => {
    //     fetch('http://128.199.168.137:3637/api/categories/get-private', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + props.cookie,
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(res => {
    //         if(res.data){
    //             setCategories(res.data);
    //         }
    //     })
    // }, [])

    const moveToLearn = id =>{
        return history.push('/learn/category/' + id);
    }

    const handlePublishCategory = id =>{
        
    }


    const renderCategories = () => {
        const pageIndex = activePage - 1;
        let categoryIndex = pageIndex * 4;
        const currentCategory1 = categories.slice(categoryIndex, categoryIndex + 2);
        const currentCategory2 = categories.slice(categoryIndex + 2, categoryIndex + 4);
        const row1 = (<div className="rowBox flex" >
            {currentCategory1.map(category => {
                const percent = category.wordCount !== 0 ? Math.floor((category.learnedWordCount / category.wordCount) * 100) : 0;
                return (<div key={category.name + category.user.name + 'row1'} className='categories-panel panel w-1/2 flex-col' onClick={()=>{moveToLearn(category.id)}} >
                    <div key={category.name + category.user.name + 'name-row2'} className="panel-header" style={{ height: '20%' }}>
                        {category.name}
                    </div>
                    <div key={category.name + category.user.name + 'body-row2'} className="panel-body bg-blue-300" style={{ height: '60%' }}>
                        <h2><b>Người tạo:</b> {category.user.name}</h2>
                        <h2><b>Email: </b>{category.user.email}</h2>
                        <div className="flex items-center">
                            <span>Tiến độ hoàn thành: </span><ProgressBar now={percent} style={{ width: '50%', margin: '0 20px' }} label={`${percent}%`} />
                        </div>
                    </div>
                    <div key={category.name + category.user.name + 'footer-row2'} className="panel-footer flex justify-end" style={{ height: '20%' }}>
                        {category.public
                            ? <button className="bg-blue-500 text-white m-1 rounded btnPublish cursor-not-allowed">Published</button>
                            : <button className="bg-blue-500 hover:bg-blue-700 text-white m-1 rounded btnPublish ">Publish</button>}
                    </div>
                </div>)
            })}
        </div>)

        const row2 = (<div className="rowBox flex" >
            {currentCategory2.map(category => {
                const percent = category.wordCount !== 0 ? Math.floor((category.learnedWordCount / category.wordCount) * 100) : 0;
                return (<div key={category.name + category.user.name + 'row2'} className='categories-panel panel w-1/2' onClick={()=>{moveToLearn(category.id)}} >
                    <div key={category.name + category.user.name + 'name-row2'} className="panel-header" style={{ height: '20%' }}>
                        {category.name}
                    </div>
                    <div key={category.name + category.user.name + 'body-row2'} className="panel-body bg-blue-300" style={{ height: '60%' }}>
                        <h2><b>Người tạo:</b> {category.user.name}</h2>
                        <h2><b>Email: </b>{category.user.email}</h2>
                        <div className="flex items-center">
                            <span>Tiến độ hoàn thành: </span><ProgressBar now={percent} style={{ width: '50%', margin: '0 20px' }} label={`${percent}%`} />
                        </div>
                    </div>
                    <div key={category.name + category.user.name + 'footer-row2'} className="panel-footer flex justify-end" style={{ height: '20%' }}>
                        {category.public
                            ? <button className="bg-blue-500 text-white m-1 rounded btnPublish cursor-not-allowed">Published</button>
                            : <button className="bg-blue-500 hover:bg-blue-700 text-white m-1 rounded btnPublish " onClick={()=>{handlePublishCategory(category.id)}}>Publish</button>}
                    </div>
                </div>)
            })}
        </div>)
        return [row1, row2];
    }

    return (
        <div className="container-fluid w-full categories">
            <div className='flex justify-end'><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" style={{ margin: '0 20px' }}>
                Create category</button></div>
            {renderCategories()}
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={totalPage * 4}
                pageRangeDisplayed={totalPage}
                onChange={handleChangePage}
            />
        </div>

    )

}

export default MyCategories;

