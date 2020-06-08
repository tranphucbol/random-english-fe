import React from "react";

const Modal = ({
  opened,
  hideModal,
  title,
  textSubmit,
  textCancel,
  children,
  onClickSubmit,
  style,
  className,
  height,
  hideSubmit,
}) => {
  return (
    <div
      style={style}
      className={`${className} flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-75 modal-animated ${
        opened ? "fadeIn" : "fadeOut"
      } faster`}
    >
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start">
          <div className="flex items-center w-full p-3">
            <div className="text-gray-700 font-bold text-xl">
              {title ? title : "Default"}
            </div>
            <svg
              onClick={() => hideModal()}
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
          <hr />
          <div
            className="bg-gray-200 w-full p-3 overflow-y-auto"
            style={{ maxHeight: height ? height : "auto" }}
          >
            {children
              ? children
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </div>
          <hr />
          <div className="ml-auto p-3">
            {!hideSubmit && (
              <button
                onClick={() => onClickSubmit()}
                className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
              >
                {textSubmit ? textSubmit : "Submit"}
              </button>
            )}

            <button
              onClick={() => hideModal()}
              className="text-lg bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              {textCancel ? textCancel : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
