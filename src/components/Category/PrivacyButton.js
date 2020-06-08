import React, { useState } from "react";
import Spinner from "../Spinner";
import { useCookies } from "react-cookie";
import { apiEndpoint } from "../../constant";
import axios from "axios";
import { store } from "react-notifications-component";

const PrivacyButton = ({ id, isPublic, allowChangePrivacy }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(isPublic);
  const [cookies] = useCookies(["authentication"]);
  const token = cookies["authentication"];

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiEndpoint}/categories/change-privacy/${id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      store.addNotification({
        title: "Thành công!",
        message: response.data.message,
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
      setStatus(!status);
    } catch (err) {
      store.addNotification({
        title: "Lỗi!",
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
    } finally {
      setLoading(false);
    }
  };

  const publicButton = (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center ${
        loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
      } text-white text-lg font-bold py-1 px-4 rounded`}
    >
      {loading ? (
        <Spinner className="mr-1" />
      ) : (
        <i className="fas fa-globe-americas mr-1"></i>
      )}
      Công khai
    </button>
  );

  const privateButton = (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center ${
        loading ? "bg-red-300" : "bg-red-500 hover:bg-red-700"
      } text-white text-lg font-bold py-1 px-4 rounded`}
    >
      {loading ? (
        <Spinner className="mr-1" />
      ) : (
        <i className="fas fa-lock mr-1"></i>
      )}
      Riêng tư
    </button>
  );

  const disabledPrivateButton = (
    <button
      disabled
      className="bg-red-300 text-white text-lg font-bold py-1 px-4 rounded"
    >
      <i className="fas fa-lock mr-1"></i> Riêng tư
    </button>
  );

  if (allowChangePrivacy) {
    return !status ? publicButton : privateButton;
  }
  return disabledPrivateButton;
};

export default PrivacyButton;
