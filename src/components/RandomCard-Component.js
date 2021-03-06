import React, { useState, useEffect } from 'react';
import '../css/tailwind.css'
import Radio from '@material-ui/core/Radio';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "../css/randomCard.css"
import '../../node_modules/font-awesome/css/font-awesome.min.css';


const RandomCard = (props) => {

  const [doneAnswer, setDoneAnswer] = useState(false);
  const [haveData, setHaveData] = useState(false);
  const [data, setData] = useState({});
  const [download, setDownload] = useState(false);
  console.log('run again')


  useEffect(() => {
    fetch('http://128.199.168.137:3637/api/words/random', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
    fetch('http://128.199.168.137:3637/api/words/random', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
    <div className="rowBox container-fluid" style={{ "maxWidth": "100%", 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}  >
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

