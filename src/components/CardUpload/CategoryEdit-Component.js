import React, { useEffect, useState } from "react";
import handleResponse from "../../helper/ResponseHandler";
import { Redirect } from "react-router-dom";
import CategoryListItem from "./CategoryListItem";
import CategoryInfo from "./CategoryInfo";
import EmptyCollection from "./EmptyCollection";

const CategoryEdit = (props) => {
  const [myCollectionList, setMyCollectionList] = useState([]);

  const [myCollections, setMyCollections] = useState([]);

  const [curCollection, setCurCollection] = useState(null);

  const handleCategoryChange = (id) => {
    console.log(id);
    setCurCollection(id);
  };
  // Fetch my categories

  useEffect(() => {
    fetch(props.apiEndpoint + "/categories/get-private", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.cookie,
      },
    })
      .then((res) => handleResponse(res))
      .then((resData) => {
        if (resData) {
          setMyCollections(resData);
          let cols = resData.map((col) => (
            <li className="border-b">
              <CategoryListItem
                id={col["id"]}
                key={col["id"]}
                name={col["name"]}
                active={curCollection === col["id"]}
                onClick={(e) => handleCategoryChange(col["id"])}
              ></CategoryListItem>
            </li>
          ));
          setMyCollectionList(myCollectionList.concat(cols));
        }
      });
  }, []);

  // if authorization fails
  if (props.login === false) return <Redirect to="/login"></Redirect>;
  // render the profile page
  else
    return (
      <div
        className="w-full max-w-full grid grid-cols-5"
        style={{ height: 600 }}
      >
        {/* User Dashboard */}
        <div className="flex col-span-1 items-center">
          {/* Show my categories */}
          <div className="h-full w-full bg-white rounded-l-lg shadow-lg">
            <h2 className="p-3 bg-white rounded-tl-lg font-bold text-gray-700 text-xl border-b">
              Danh sách bộ sưu tập
            </h2>
            <div className="flex-col justify-center overflow-y-auto overflow-x-hidden items-start">
              {/* User menu */}
              <ul className="list-reset flex-col">
                {myCollectionList && myCollectionList}
              </ul>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="col-span-4">
          {/* Edit the collection */}
          <div className="min-w-full h-full bg-white border-l rounded-r-lg">
            <div className="flex flex-col overflow-y-auto items-start bg-white h-full rounded-r-lg">
              {/* Category */}
              {myCollections && curCollection ? (
                <CategoryInfo
                  apiEndpoint={props.apiEndpoint}
                  cookie={props.cookie}
                  category={curCollection}
                ></CategoryInfo>
              ) : (
                <EmptyCollection />
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default CategoryEdit;
