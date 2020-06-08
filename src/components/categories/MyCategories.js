import React, { useState, useEffect } from "react";
import "../..//css/categories.css";
import "../../css/tailwind.css";
import Categories from "./Categories";
import EmptyCategories from "./EmptyCategories";

const MyCategories = ({cookie, apiEndpoint}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${apiEndpoint}/categories/get-private`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setCategories(res.data);
        }
      });
  }, [cookie, apiEndpoint]);

  return (
    <div className="container flex flex-col categories">
      <div className="flex justify-end">
        <button className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3">
          <i className="fas fa-plus"></i> Tạo bộ sưu tập
        </button>
      </div>
      {(categories === undefined || categories.length === 0) ? <EmptyCategories /> : <Categories categories={categories} />}
    </div>
  );
};

export default MyCategories;
