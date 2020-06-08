import React, { useState, useEffect } from 'react';
import '../../css/tailwind.css'
import "../../css/randomCard.css"
import QuestionBox from './QuestionBox'
import Modal from 'react-modal';
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";



const Test = (props) => {
    const [words, setWords] = useState([]);
    const [cookies] = useCookies(["authentication"]);
    const token = cookies["authentication"];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [value, setValue] = useState(0);
    const openModal = () => {
        setIsOpen(true);
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
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "categoryId": props.match.params.id
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
        return ;
    }, [props.match.params.id, token])

    const handleFinish = (curValue) => {
        setValue(curValue.filter(item => item === true).length);
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
                <div className="flex justify-center" ><button style={{width:"35%"}}
                    className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3"
                >
                    <Link to={`/test/category/1`} >Kiểm tra lại</Link>
                </button>
                <button style={{width:"35%"}}
                    className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-3 mx-3"
                >
                    <Link to={`/my-categories/`} >Thoát</Link>
                </button></div>
                
            </Modal>
        </>)
}

export default Test;

