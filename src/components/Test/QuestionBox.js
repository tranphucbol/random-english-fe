import React, { useState } from "react"
import '../../css/tailwind.css'
import Radio from '@material-ui/core/Radio';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const QuestionBox = ({ word, handleFinish }) => {
    const [choosed, setChoosed ] = useState(false);
    const [index, setIndex] = useState(0);
    const [result, setResult] = useState(new Array(10).fill(null));

    const handleRightAnswer = () => {
        if(result[index] == null){
            let curResult = result.slice(0);
            curResult[index] = true;
            setResult(curResult);
        }
        setChoosed(true)
    }

    const handleWrongAnswer = () => {
        if(result[index] == null){
            let curResult = result.slice(0);
            curResult[index] = false;
            setResult(curResult);
        }
        setChoosed(true)
    }

    const handleNext = () => {
        console.log(result)
        setIndex(curIndex => curIndex + 1);
        setChoosed(false)
    }

    const createAnswer = () => {
        const random = Math.floor(Math.random() * Math.floor(4))
        if (word[index].answers.length === 3) {
            word[index].answers.splice(random, 0, word[index].eng);
        }
        return (<div id='answer' key='answer'>
            {
                word[index].answers && word[index].answers.map((item) => {
                    if (item === word[index].eng) {
                        return <FormControlLabel key={item}  className='rightAnswer' value={item} control={<Radio checked={choosed === true} onClick={() => { handleRightAnswer() }} />} label={item} />
                    } else {
                        return <FormControlLabel key={item} value={item} control={<Radio  onClick={() => { handleWrongAnswer() }} />} label={item} />
                    }
                })
            }
        </div>
        )
    }

    return (
        <div className="rowBox container-fluid flex items-center justify-center" style={{ "maxWidth": "100%", 'width': '100%' }}  >
            <div key="questionPanel" className='panel' style={{ width: '50%' }}>
                <div className="panel-body" style={{ width: '100%', padding: '20px' }}>
                    <h1 id="question" className="text-blue-700" >Nghĩa của từ: <b>{word[index].vie}</b></h1>
                    <div id="concept" style={{ marginTop: '10px' }}>
                        <FormControl component="fieldset">
                            <FormLabel >Đáp án:</FormLabel>
                            {
                                createAnswer()
                            }
                        </FormControl>
                    </div>
                </div>
                <div className='panel-footer flex justify-end'>
                    {index != 9?<button
                        onClick={() => { handleNext() }}
                        className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-3 mr-4"
                    >
                        Tiếp theo
                    </button>
                    :<button
                    onClick={() => { handleFinish(result) }}
                    className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-3 mr-4"
                >
                    kết thúc
                </button>}
                </div>
            </div>
        </div>
    )

}

export default QuestionBox;