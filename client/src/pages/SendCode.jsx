// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import checkEmail from "../util/checkEmail.js";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import { convertMessageId } from "../util/convertMessageId";
import axios from "axios";
import "./send.css";

const SendCode = () => {
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState("idle");
  const navigate = useNavigate();

  const sendEmailCode = async (email) => {
    setButtonStatus("loading");
    console.log(email);

    if (checkEmail(email) === false) {
      alert("Please enter a valid email address");
      setButtonStatus("error");
      return;
    } else {
      try {
        axios
          .post("http://localhost:8000/api/send-code", {
            email: email,
          })
          .then(function (response) {
            console.log(response);
            setButtonStatus("success");
            if (response.data.success === true) {
              alert(
                "SUCCESS! MESSAGE ID: " + convertMessageId(response.data.id)
              );
              console.log("here");
              return navigate("/check-code");
            }
          })
          .catch(function (err) {
            alert(err);
            setButtonStatus("error");
          });
      } catch (err) {
        console.log(err);
        setButtonStatus("error");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="pb-8 font-semibold">
          Enter your email to send you a verification code
        </p>
        <input
          type="email"
          placeholder="ENTER YOUR EMAIL"
          className="border-gray-400 w-min rounded-md border-2 text-center px-3 py-2.5 font-semibold mb-3"
          onInput={(e) => setEmail(e.target.value)}
        />
        <ReactiveButton
          buttonState={buttonStatus}
          idleText="SEND CODE"
          loadingText="SENDING"
          successText="SENT"
          errorText="TRY AGAIN"
          onClick={() => sendEmailCode(email)}
          className="rounded-md bg-sky-600"
          style={{
            borderRadius: "5px",
            "font-weight": "semibold",
          }}
        />
      </div>
    </>
  );
};

export default SendCode;
