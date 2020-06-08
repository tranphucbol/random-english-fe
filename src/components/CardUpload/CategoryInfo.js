import React, { useEffect, useState } from "react";
import handleResponse from "../../helper/ResponseHandler";
import DataTable from "react-data-table-component";
import Modal from "../Modal";
import CategoryAddForm from "./CategoryAdd";

const columns = [
  // {
  //   cell: () => (
  //     <div className="text-red-500 hover:text-red-700">
  //       <i class="far fa-trash-alt"></i>
  //     </div>
  //   ),
  //   width: "56px", // custom width for icon button
  //   style: {
  //     borderBottom: "1px solid #FFFFFF",
  //     marginBottom: "-1px",
  //   },
  // },
  {
    name: "Eng",
    selector: "eng",
  },
  {
    name: "Vie",
    selector: "vie",
  },
];

const CategoryInfo = ({ cookie, category, apiEndpoint }) => {
  // Fetch data
  const [words, setWords] = useState(null);
  const [title, setTitle] = useState(null);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    fetch(apiEndpoint + "/categories/get-all-words", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
      body: JSON.stringify({
        categoryId: category,
      }),
    })
      .then((res) => handleResponse(res))
      .then((resdata) => {
        setTitle(resdata.name);
        setWords(resdata.words);
      });
  }, [cookie, apiEndpoint, category]);

  const customStyles = {
    rows: {
      style: {
        fontSize: "14pt",
        color: "#6b46c1",
      },
    },
    headCells: {
      style: {
        fontSize: "14pt",
        color: "#4a5568",
        fontWeight: "bold",
        backgroundColor: "#f7fafc",
      },
    },
  };

  return (
    <div className="w-full rounded-tr-lg">
      <div className="flex p-3 bg-white text-xl border-b justify-between rounded-tr-lg">
        <h2 className="text-gray-700 font-bold rounded-tr-lg">{title}</h2>
        <div className="flex items-center text-lg text-blue-500 hover:text-blue-800 rounded-tr-lg">
          <h2 className="mr-1 cursor-pointer" onClick={() => setModal(true)}>
            Thêm từ
          </h2>
          <Modal opened={modal} title="Thêm từ" hideSubmit={true} textCancel={"Hủy"} height={600} hideModal={() => setModal(false)}>
            <CategoryAddForm curCollection={category} />
          </Modal>
        </div>
      </div>
      <div>
        {words && (
          <DataTable
            className="max-w-full h-full rounded-br"
            customStyles={customStyles}
            noHeader={true}
            columns={columns}
            data={words}
            pagination
            highlightOnHover
            pointerOnHover
          />
        )}
      </div>
    </div>
  );
};

export default CategoryInfo;
