import React, { useState, useEffect } from "react";
import "../..//css/categories.css";
import "../../css/tailwind.css";
import Categories from "./Categories";
import EmptyCategories from "./EmptyCategories";
import { useCookies } from "react-cookie";
import { apiEndpoint } from '../../constant'

const PublicCategories = () => {
  const [categories, setCategories] = useState([]);
  const [cookies] = useCookies(["authentication"]);
  const token = cookies["authentication"];

  useEffect(() => {
    fetch(`${apiEndpoint}/categories/get-public`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setCategories(res.data);
        }
      });
  }, [token]);

  const reload = () => {
    fetch(`${apiEndpoint}/categories/get-public`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setCategories(res.data);
        }
      });
  }

  return (
    <div className="container flex flex-col categories">
      {categories === undefined || categories.length === 0 ? (
        <EmptyCategories />
      ) : (
        <Categories isPublicCategory={true} categories={categories} reload={reload} />
      )}
    </div>
  );
};

export default PublicCategories;
