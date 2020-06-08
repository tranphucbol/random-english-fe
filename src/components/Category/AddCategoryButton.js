import React, {useState} from "react";
import { useCookies } from "react-cookie";
import { apiEndpoint } from "../../constant";
import axios from "axios";
import { store } from "react-notifications-component";
import Spinner from "../Spinner"

const AddCategoryButton = ({ id, className, reload }) => {

  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["authentication"]);
  const token = cookies["authentication"];

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    await axios.post(
        `${apiEndpoint}/categories/add-to-my-categories/${id}`,
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
        message: "Xóa bộ sưu tập thành công",
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
        title: "Lỗi!",
        message: "Đã có lỗi xảy ra",
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

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${className} flex items-center ${loading ? "bg-green-300" : "bg-green-500 hover:bg-green-700"} text-white text-lg font-bold py-1 px-4 rounded`}
    >
      {loading ? (
        <Spinner className="mr-1" />
      ) : (<i class="fas fa-plus mr-1"></i>
      )}
      Thêm vào bộ sưu tập
    </button>
  );
};

export default AddCategoryButton;
