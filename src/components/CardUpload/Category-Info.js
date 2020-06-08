import React,{useEffect, useState} from 'react';
import handleResponse from '../../helper/ResponseHandler';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Eng',
        selector: 'eng',
    },
    {
        name: 'Vie',
        selector: 'vie',
    },
    {
        name: 'Concept',
        selector: 'concept',
    },
];

const CategoryInfo = (props) => {
    // Fetch data
    const [words,setWords] = useState(null);
    const [title,setTitle] = useState(null);
    useEffect(() => {
        fetch(props.apiEndpoint+'/categories/get-all-words', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props.cookie,
          },
          body: JSON.stringify({
              categoryId: props.category
          })
          })
          .then(res => handleResponse(res))
          .then(resdata => {
                setTitle(resdata.name);
                setWords(resdata.words);
        })
      }, []);    


    return (
        <div>
        <div>
            <p>{title}</p>
            <button className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3">Thêm từ</button>
        </div>
        <div>
        {words && <DataTable
            className="w-full h-full"
            // title={title}
            columns={columns}
            data={words}
            pagination
        />}
        </div>
        </div>
        );
};

export default CategoryInfo;