import React, { useState } from "react";
import Category from "./Category";
import Pagination from "react-js-pagination";
import EmptyCategory from "./EmptyCategory";

const Categories = ({ categories }) => {
  const [activePage, setActivePage] = useState(1);
  const handleChangePage = (page) => {
    setActivePage(page);
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {categories
          .slice((activePage - 1) * 4, (activePage - 1) * 4 + 4)
          .map((category) => (
            <div key={category.id} className="col-span-1">
              <Category {...category} />
            </div>
          ))}

        {(activePage - 1) * 4 + 4 - categories.length > 0 &&
          Array.apply(null, Array((activePage - 1) * 4 + 4 - categories.length)).map(
            (category,index) => (
              <div key={`empty-${index}`} className="col-span-1">
                <EmptyCategory />
              </div>
            )
          )}

        {/* <div className="col-span-1">
          <Category />
        </div>
        <div className="col-span-1">
          <Category />
        </div>
        <div className="col-span-1">
          <Category />
        </div> */}
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={4}
        totalItemsCount={categories.length}
        pageRangeDisplayed={10}
        hideFirstLastPages={true}
        itemClassNext="rounded-r px-2"
        itemClassPrev="rounded-l px-2"
        itemClass="block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 hover:bg-gray-20 text-lg"
        prevPageText="Trước"
        nextPageText="Tiếp"
        onChange={handleChangePage}
      />
    </div>
  );
};

export default Categories;