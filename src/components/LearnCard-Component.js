import React, { useState, useEffect } from "react";
import "../css/tailwind.css";
import { useCookies } from "react-cookie";

const LearnCard = (props) => {
  const [words, setWords] = useState([]);
  const [random, setRandom] = useState(0);
  const [show, isShow] = useState(false);
  const [cookies] = useCookies(["authentication"]);
  const token = cookies["authentication"];

  useEffect(() => {
    fetch("http://128.199.168.137:3637/api/categories/get-all-words", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        categoryId: props.match.params.id,
      }),
    })
      .then((res) => res.json())
      .then((resdata) => {
        console.log(resdata);
        if (resdata && resdata.data) {
          setWords(resdata.data.words);
          setRandom(
            Math.floor(Math.random() * Math.floor(resdata.data.words.length))
          );
        }
      });
  }, [props.match.params.id]);

  const handleLearned = (id) => {
    fetch("http://128.199.168.137:3637/api/words/learn/" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    isShow(true);
  };

  const handleForget = (id) => {
    fetch("http://128.199.168.137:3637/api/words/forget/" + id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    isShow(true);
  };

  const handleNext = () => {
    setRandom(Math.floor(Math.random() * Math.floor(words.length)));
    isShow(false);
  };

  return (
    words.length > 0 && (
      <div
        className="rowBox container-fluid flex justify-center items-center"
        style={{ maxWidth: "100%", width: "100%" }}
      >
        <div className="flex w-full" style={{ maxHeight: "327px" }}>
          <div className=" h-auto w-1/3 mx-5">
            <img
              src={words[random].image}
              alt=""
              style={{
                borderRadius: "10px",
                height: "inherit",
                float: "right",
                height: "100%",
              }}
            />
          </div>
          <div key="questionPanel" className="panel h-full w-2/3">
            <div
              className="panel-body"
              style={{ width: "100%", padding: "20px" }}
            >
              <div className="row" style={{ fontSize: "12pt" }}>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div id="vieKey">{words[random].vie}</div>
                  <div id="concept">
                    <b style={{ fontSize: "14pt" }}>Ngữ cảnh:</b>
                    <p id="conceptText">{words[random].concept} </p>
                  </div>
                  <div id="engKey">
                    <span id="0">Eng: {show && words[random].eng} </span>{" "}
                  </div>
                  <div id="examples">
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: words[random].examples[0].vie,
                        }}
                      ></div>
                    }
                    <div style={{ height: "23px" }}>
                      {show && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: words[random].examples[0].eng,
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="panel-footer flex justify-center"
              style={{ paddingBottom: "20px" }}
            >
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-3 rounded btnInLearn"
                onClick={() => {
                  handleLearned(words[random].id);
                }}
              >
                Thuộc
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  mx-3 rounded btnInLearn"
                onClick={() => {
                  handleForget(words[random].id);
                }}
              >
                Quên
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-3 rounded btnInLearn"
                onClick={() => {
                  handleNext();
                }}
              >
                Tiếp
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LearnCard;
