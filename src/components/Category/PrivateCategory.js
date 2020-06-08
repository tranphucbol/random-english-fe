import React from "react";
import PrivacyButton from "./PrivacyButton";
import DeleteButton from "./DeleteButton";
import { apiEndpoint } from "../../constant";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';

const Category = ({
  id,
  user,
  name,
  wordCount,
  learnedWordCount,
  isPublic,
  allowChangePrivacy,
  reload,
}) => {
  const history = useHistory();
  return (
    <div className="rounded-lg shadow-lg" style={{ height: 275 }}>
      <header
        className="flex items-center justify-between rounded-t-lg bg-white px-3"
        style={{ height: "20%" }}
      >
        <Link
          to={`/learn/category/${id}`}
          className="text-gray-700 font-bold hover:text-blue-800"
        >
          {name}
        </Link>
        <div className="flex items-center text-lg text-blue-500 hover:text-blue-800">
          <a className="mr-1" href="/">
            Xem Chi tiết
          </a>
          <i className="fas fa-chevron-right"></i>
        </div>
      </header>
      <div
        className="flex items-center bg-white px-3"
        style={{
          height: "60%",
          background: "linear-gradient(#075788 0%, #0b7cc1 80%)",
        }}
      >
        <div className="w-full">
          <Link
            to={`/learn/category/${id}`}
            className="block text-white text-center"
            style={{ fontSize: "72pt", color: "rgba(255,255,255,0.5)" }}
          >
            {learnedWordCount}/{wordCount}
          </Link>
        </div>
      </div>
      <footer
        className="flex items-center flex-row-reverse rounded-b-lg bg-white px-3"
        style={{ height: "20%" }}
      >
        <PrivacyButton
          id={id}
          isPublic={isPublic}
          allowChangePrivacy={allowChangePrivacy}
        />

        <button onClick={() => history.push(`/learn/category/${id}`)} className="mr-2 text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded my-3">
          Học
        </button>

        <DeleteButton className="mr-2" id={id} reload={reload} />
      </footer>
    </div>
  );
};

export default Category;
