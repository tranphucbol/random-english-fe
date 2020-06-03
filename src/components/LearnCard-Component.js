import React, { useState } from 'react';
import '../css/tailwind.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';


const LearnCard = (props) => {

  const [test, setTest] = useState(false);

  const handleResponse = (resp) => {
    console.log(resp)
    const respJSON = JSON.parse(resp);
    const status = respJSON.status;
    if (status == 1) {
      const data = respJSON.data;
      return data;
    }
    return null;
  }

  const fetchData = () => {
    fetch('https://random-english.herokuapp.com/api/words/random', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.cookie,
      },
    })
      .then(res => handleResponse(res))
      .then(res => {
        console.log(res)
      })
  }

  return (
    <div className="rowBox container" style={{ "width": "70%", "margin": "50px auto" }}  >
      <div className="w-full m-6 ">
        <div className="panel" style={{ width: '100%', height: '100%' }}>
          <div className="panel-body" style={{ width: '100%', height: '100%', padding: '20px' }}>
            <div id="engKey" className="text-blue-700" >vui lên nào</div>
            <div id="concept" style={{ marginTop: '10px' }}>
              <b>Ngữ cảnh:</b>
              <p id="conceptText">Câu nói tuyên bố, cảm thán, cao giọng rằng hãy bắt đầu cuộc vui, thường dùng trong những dịp vui như lễ lộc, tiệc tùng, v.v.</p>
              <b>Ví dụ:</b>
              <div>Người phù rể chính nâng ly nói với cả phòng đầy khách rằng "<b>Bắt đầu cuộc vui nào</b>!"</div>
            </div>
            <label className="custom-label flex">
              <div className="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
                <input type="checkbox" className="hidden" checked />
                <svg class="hidden w-4 h-4 text-green-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><path d="M0 172V0h172v172z" /><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1" /></g></svg>
              </div>
              <span className="select-none"> This is a sample checkbox. All the text will toggle the state</span>
            </label>
            <button id='btnNext' onClick={fetchData} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnCard;

