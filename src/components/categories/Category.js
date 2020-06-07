import React from "react";

const Category = ({ id, user, name, wordCount, learnedWordCount }) => {
  return (
    <div className="rounded-lg shadow-lg" style={{ height: 275 }}>
      <header
        className="flex items-center justify-between rounded-t-lg bg-white px-3"
        style={{ height: "20%" }}
      >
        <h2>{name}</h2>
        <div className="flex items-center text-lg text-blue-500 hover:text-blue-800">
        <a className="mr-1" href="/">Xem Chi tiết</a>
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
          {/* <h2><i class="fas fa-user"></i> TraiChuongCong</h2> */}
          <h2 className="text-white text-center" style={{fontSize: "72pt", color: "rgba(255,255,255,0.5)"}}>{learnedWordCount}/{wordCount}</h2>
        </div>
      </div>
      <footer
        className="flex items-center flex-row-reverse rounded-b-lg bg-white px-3"
        style={{ height: "20%" }}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-1 px-4 rounded">
          <i className="fas fa-globe-americas"></i> Công khai
        </button>
      </footer>
    </div>
  );
};

export default Category;
