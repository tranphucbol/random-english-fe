import React, { useState, useEffect } from 'react';
import '../../css/tailwind.css'
import "../../css/randomCard.css"
import QuestionBox from './QuestionBox'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


const Test = (props) => {
    const [words, setWords] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = useState(0);
    const openModal = () => {
        setIsOpen(true);
    }
    const handleAgain = () => {
    }

    const handleQuit = () => {
    }


    const closeModal = () => {
        setIsOpen(false);
    }
    useEffect(() => {
        fetch('http://128.199.168.137:3637/api/categories/get-all-words', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibmFtZSI6IlRyYWlDaHVvaUNvbmciLCJpYXQiOjE1OTE2MDQ0MjAsImV4cCI6MTU5MTY5MDgyMH0.bbD1bpGMmEIHNmqMHZ-Ug_10CcUggRs-40HMKRfL4xE",
            },
            body: JSON.stringify({
                "categoryId": 1
            })
        })
            .then(res => res.json())
            .then(resdata => {
                if (resdata && resdata.data) {
                    let randomWordForTest = [];
                    for (let i = 0; i < 10; i++) {
                        const random = Math.floor(Math.random() * Math.floor(resdata.data.words.length));
                        randomWordForTest.push(resdata.data.words[random]);
                        resdata.data.words.splice(random, 1);
                    }
                    setWords(randomWordForTest);
                }
            })
    }, [])

    const handleFinish = (curValue) => {
        setValue(curValue.filter(item => item == true).length);
        openModal();
    }
    return (words.length > 0 &&
        <>
            <QuestionBox id='questionbox' word={words} handleFinish={handleFinish}></QuestionBox>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div style={{ textAlign: "center", fontSize: '20pt' }}><b> Chúc mừng bạn đã hoàn thành bài test</b></div>
                <div style={{ textAlign: "center", fontSize: '40pt', color: "#337ab7", margin: '30px 0' }}><b>{value}/10 </b></div>
                <button
                    onClick={handleAgain}
                    className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3"
                >
                    Làm lại
                </button>
                <button
                    onClick={handleQuit}
                    className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3"
                >
                    Thoát
                </button>
            </Modal>
        </>)
}

export default Test;

