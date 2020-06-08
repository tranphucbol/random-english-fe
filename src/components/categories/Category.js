import React from "react";
import PrivacyButton from "./PrivacyButton";

const Category = ({
  id,
  user,
  name,
  wordCount,
  learnedWordCount,
  isPublic,
  allowChangePrivacy,
}) => {
  return (
    <div className="rounded-lg shadow-lg" style={{ height: 275 }}>
      <header
        className="flex items-center justify-between rounded-t-lg bg-white px-3"
        style={{ height: "20%" }}
      >
        <a href="/" className="hover:text-blue-800">{name}</a>
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
          <a href="/"
            className="block text-white text-center"
            style={{ fontSize: "72pt", color: "rgba(255,255,255,0.5)" }}
          >
            {learnedWordCount}/{wordCount}
          </a>
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
      </footer>
    </div>
  );
};

export default Category;
