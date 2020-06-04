import React, { useState, useEffect } from 'react';
import '../css/tailwind.css'
import Radio from '@material-ui/core/Radio';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';


const RandomCard = (props) => {

  let question='';
  const [doneAnswer, setDoneAnswer] = useState(false);
  const [haveData, setHaveData] = useState(false);
  const [data, setData] = useState({});
  const [download, setDownload] = useState(false);
  console.log('run again')


  useEffect(() => {
    console.log('use effect')
    fetch('http://128.199.168.137:3637/api/words/random-question', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibmFtZSI6IlRyYWlDaHVvaUNvbmciLCJpYXQiOjE1OTExOTA0NTgsImV4cCI6MTU5MTI3Njg1OH0.HIR6VsiDfsofHBgIpzlFC-lRPc10gAji63ySNgIk_J8',
      },
    })
      .then(res => res.json())
      .then(res => {
        if(res.data){
          setData(res.data)
          setHaveData(true)
        }
      })
  },[]);

  useEffect(() => {
    console.log('use effect1')
    fetch('https://random-english.herokuapp.com/api/words/random-question', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibmFtZSI6IlRyYWlDaHVvaUNvbmciLCJpYXQiOjE1OTExOTA0NTgsImV4cCI6MTU5MTI3Njg1OH0.HIR6VsiDfsofHBgIpzlFC-lRPc10gAji63ySNgIk_J8',
      },
    })
      .then(res => res.json())
      .then(res => {
        if(res.data){
          setData(res.data)
          setHaveData(true)
        }
      })
  },[download]);

  // useEffect(() => {
  //   console.log('next')
  //   fetchData();
  // },[haveData]);

  // wrongAnswer.splice(random, 0, rightAnswer);
  const handleNext =()=>{
    console.log('next')
    setHaveData(false);
    setDoneAnswer(false);
    setDownload(!download);
  }

  const handleResponse = (resp) => {
    console.log(resp.json())
    // const respJSON = JSON.parse(resp);
    // console.log(respJSON)
    // const status = respJSON.status;
    // if (status == 1) {
    //   const data = respJSON.data;
    //   return data;
    // }
    // return null;
  }

  

  const handleDoneAnswer = () => {
    setDoneAnswer(true);
  }

  const createAnswer = () => {
    const random = Math.floor(Math.random() * Math.floor(4))
    if(data.wrongAnswers.length ===3){
      data.wrongAnswers.splice(random, 0 ,data.answer);
    }
    return (<div id='answer' key='answer'>
      {
        data.wrongAnswers && data.wrongAnswers.map((item, index) => {
          if (item === data.answer) {
            return <FormControlLabel key={item} onClick={handleDoneAnswer} className='rightAnswer' value={item} control={<Radio />} label={item} />
          } else {
            return <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
          }
        })
      }
    </div>
    )
  }

  return (
    <div className="rowBox container-fluid" style={{ "maxWidth": "100%", 'width': '100%', 'display': 'flex', 'alignItems': 'center', justifyContent: 'center', 'height': '100vh', "backgroundColor": "#0c4c74", }}  >
      <ReactCSSTransitionGroup className="container"
        transitionName='question-appear'
        transitionAppear={true}
        transitionEnter={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {haveData && <ReactCSSTransitionGroup className="container"
          transitionName='question-appear'
          transitionAppear={true}
          transitionEnter={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div key="questionPanel" className='panel' style={{ width: '50%' }}>
            <div className="panel-body" style={{ width: '100%', padding: '20px' }}>
              <h1 id="question" className="text-blue-700" >Nghĩa của từ: <b>{data.question}</b></h1>
              <div id="concept" style={{ marginTop: '10px' }}>
                <FormControl component="fieldset">
                  <FormLabel >Đáp án:</FormLabel>
                  {
                    createAnswer()
                  }
                </FormControl>
              </div>
            </div>
          </div>
          {doneAnswer && <div key="explainPanel" style={{ width: '50%', display: 'flex' }}>
            <div style={{ width: '85%', padding: '20px', color: 'white' }}>
              <b style={{ "fontSize": '1.4rem' }}>Ví dụ:</b>
                {<div className="explain" id="ViExplain" dangerouslySetInnerHTML={{'__html':data.examples[0].vie}}></div>}
              {<div className="explain" id="EnExplain" dangerouslySetInnerHTML={{'__html': data.examples[0].eng}}></div>}
            </div>
            <div style={{ width: '15%', display: 'flex', alignItems: 'center' }}>
              <button onClick={handleNext}><i className="fa fa-arrow-left" style={{ color: 'white', fontSize: '2rem' }}></i></button>
            </div>
          </div>}
        </ReactCSSTransitionGroup>}
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default RandomCard;

