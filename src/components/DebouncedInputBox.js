import React, { useState, useCallback } from "react";

const InputBox = () => {
  const [inputText, setInputText] = useState("");

  const debounce = useCallback((fun, delay) => {
    console.log("hey 2 ");

    let timeout;
    return function (...args) {
      console.log("hey 3 ");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fun.call(this, args);
      }, delay);
    };
  }, []);
  const debouncedFun = useCallback(debounce(callbck, 2000), [debounce]);
  function callbck(args) {
    setInputText("Message Updated after delay");
    console.log(args, "args printed");
  }

  const changeHandler = (e) => {
    setInputText(e.target.value);
    if (e.target.value.length >= 3) {
      debouncedFun();
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Start Typing ... !"
        value={inputText}
        onChange={(e) => changeHandler(e)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          border: "1px solid black",
          height: "20px",
          width: "200px",
        }}
      />
    </>
  );
};

export default InputBox;
