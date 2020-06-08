import React, { useState, useEffect } from "react";
import "../..//css/categories.css";
import "../../css/tailwind.css";
import Categories from "./Categories";
import EmptyCategories from "./EmptyCategories";

const PublicCategories = ({cookie, apiEndpoint}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${apiEndpoint}/categories/get-public`, {
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
    <div className="container w-full categories">
      {/* <Categories categories={categories} /> */}
      {(categories === undefined || categories.length === 0) ? <EmptyCategories /> : <Categories categories={categories} />}
    </div>
  );
};

export default PublicCategories;
