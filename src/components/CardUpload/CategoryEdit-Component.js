import React,{useEffect, useState} from 'react';
import handleResponse from '../../helper/ResponseHandler';
import { Redirect, useRouteMatch, Switch, Route } from 'react-router-dom';
import CategoryAddForm from './CategoryAdd';
import CategoryListItem from './CategoryListItem';
import CategoryInfo from './Category-Info';

const CategoryEdit = (props)=>{

    console.log(props.apiEndpoint);

  let {url,path} = useRouteMatch();

  const [formData, setFormData] = useState(null);

  const [myCollectionList,setMyCollectionList] = useState([]);

  const [myCollections, setMyCollections] = useState([]);

  const [curCollection, setCurCollection] = useState(null);


  const handleCategoryChange = (target)=>{
    console.log(target);
    setCurCollection(target['id']);
  }
// Fetch my categories

  useEffect(() => {
    fetch(props.apiEndpoint+'/categories/get-private', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.cookie,
      },
      })
      .then(res => handleResponse(res))
      .then(resdata => {
          if(resdata){
        setMyCollections(resdata);
        let cols = resdata.map(col=>
            <CategoryListItem id={col['id']} key={col['id']} name={col['name']} active={curCollection===col['id']} onClick={(e) => handleCategoryChange(e.target)}></CategoryListItem>);
        setMyCollectionList(myCollectionList.concat(cols));
        }            
    })
  }, []);

  // if authorization fails
  if(props.login === false)
    return <Redirect to="/login"></Redirect>
  else // render the profile page
  return (
  <div className="w-full max-w-full m-auto grid grid-cols-5 flex-1">
    {/* User Dashboard */}
    <div className="flex-1 col-span-1 items-center flex-grow-0">
      {/* Show my categories */}
      <div className="w-100 bg-gray-400 rounded-l-lg shadow-lg" style={{height:"70%"}}>
            <h2 className="p-3 bg-white rounded-tl-lg text-xl" style={{height:"10%"}}>Danh sách bộ sưu tập</h2>
            <div className="flex-col justify-center overflow-y-auto overflow-x-hidden items-start" style={{height:"90%"}}>
                {/* User menu */}
                <ul className=" list-reset flex-col">
                    { myCollectionList && myCollectionList}
	            </ul>
            </div>
          </div>
    
    </div>
      {/* Content */}
    <div className="flex-1 col-span-4 flex-grow-0" style={{height:"70%"}}>
      {/* Edit the collection */}
      <div className="w-100 bg-white shadow-lg rounded-tr-lg" style={{height:"10%"}}>
            <div className="p-3 bg-white rounded-tr-lg text-xl">
                <ul className="flex ">
                <li className="mr-1">
                    <a className="bg-white inline-block border-l border-t border-r rounded-t pt-1 px-3 text-blue-700 font-semibold" href="#">Thêm từ</a>
                </li>
                <li className="mr-1">
                    <a className="bg-white inline-block py-1 px-3 text-blue-500 hover:text-blue-800 font-semibold" href="#">Chi tiết</a>
                </li>
                </ul>
            </div>
        </div>
            <div className="flex-col flex-1 flex-grow-0 justify-center overflow-y-auto items-start bg-gray-500" style={{height:"90%"}}>
                {/* Category */}
                {myCollections && curCollection && <CategoryInfo apiEndpoint={props.apiEndpoint} cookie={props.cookie} category={curCollection}></CategoryInfo>}
                </div>
    </div>
    </div>
  )
}

export default CategoryEdit;
