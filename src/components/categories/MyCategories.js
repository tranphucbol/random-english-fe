import React, { useState, useEffect } from "react";
import "../..//css/categories.css";
import "../../css/tailwind.css";
import Categories from "./Categories";
import EmptyCategories from "./EmptyCategories";
import { useCookies } from "react-cookie";
import Modal from "../Modal";
import { apiEndpoint } from "../../constant";
import axios from "axios";
import { store } from "react-notifications-component";

const MyCategories = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [categoryNameInput, setCategoryNameInput] = useState("");
  const [cookies] = useCookies(["authentication"]);
  const token = cookies["authentication"];

  const hideModal = () => {
    setModal(false);
  };

  // useEffect(() => {
  //   fetch(`${apiEndpoint}/categories/get-private`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setCategories(res.data);
  //       }
  //     });
  // }, [token]);

  const handleClickCreateCategory = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const reload = () => {
    fetch(`${apiEndpoint}/categories/get-private`, {
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

  const handleClickSubmit = async () => {
    const data = { name: categoryNameInput };
    try {
      await axios.post(`${apiEndpoint}/categories/create`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      store.addNotification({
        title: "Thành công",
        message: "Tạo bộ sưu tập thành công",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      reload();
    } catch (err) {
      store.addNotification({
        title: "Lỗi",
        message: err.response.data.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  };

  return (
    <div className="container flex flex-col categories">
      <Modal
        opened={modal}
        hideModal={hideModal}
        onClickSubmit={handleClickSubmit}
        title="Tạo bộ sưu tập"
        textCancel="Hủy"
        textSubmit="Tạo"
      >
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap mx-3">
            <div class="w-full px-3">
              <label
                class="block tracking-wide text-gray-700 text-lg font-bold mb-2"
                for="grid-password"
              >
                Tên bộ sưu tập
              </label>
              <input
                class="text-lg appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="General"
                value={categoryNameInput}
                onChange={(e) => {
                  setCategoryNameInput(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
      </Modal>
      <div className="flex justify-end">
        <button
          onClick={handleClickCreateCategory}
          className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3"
        >
          <i className="fas fa-plus"></i> Tạo bộ sưu tập
        </button>
      </div>
      {categories === undefined || categories.length === 0 ? (
        <EmptyCategories />
      ) : (
        <Categories isPublicCategory={false} categories={categories} reload={reload} />
      )}
    </div>
  );
};

export default MyCategories;
