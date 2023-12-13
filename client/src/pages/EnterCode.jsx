// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import checkEmail from "../util/checkEmail.js";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import { convertMessageId } from "../util/convertMessageId";
import axios from "axios";
import "./send.css";

const EnterCode = () => {
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState("idle");
  const navigate = useNavigate();

  const verifyCode = async (email) => {
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
        <div className="flex flex-col justify-center items-center">
          <h1 className="pb-4 font-semibold">
            ENTER THE CODE SENT TO YOUR EMAIL
          </h1>
          <input
            type="email"
            placeholder="ENTER YOUR CODE"
            className="border-gray-400 w-min rounded-md border-2 text-center px-3 py-2.5 font-semibold mb-4"
            onInput={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-between w-full">
            <ReactiveButton
              buttonState={buttonStatus}
              idleText="CHECK CODE"
              loadingText="CHECKING"
              successText="SUCCESS"
              errorText="TRY AGAIN"
              onClick={() => verifyCode(email)}
              style={{
                borderRadius: "5px",
                "font-weight": "semibold",
                "background-color": "rgba(77, 124, 15, 0.5)",
              }}
            />
            <button>RESEND</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterCode;
